DOCKER_TAG				?= go-hello-world
FULL_TAG				?= ${DOCKER_TAG}:${HASH}
DYNAMODB_TABLE			?= ${DOCKER_TAG}-v2
PORT					?= "8080"
GO_TEST_DOCKER_COMPOSE  ?= docker-compose run --rm gobase go test -v -cover
AWS_CLI_DOCKER_COMPOSE  ?= docker-compose run --rm awscli
HASH := $(shell git rev-parse HEAD)
PIPELINE_BASE?= contino/gsd-hello-world 


ENVFILE ?= aws.template

.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

envfile:
	echo "from envfile"
	echo "FOO=${FOO}"
	echo "BAR=${BAR}"	
	cp $(ENVFILE) aws.env

.PHONY : build
build:
	docker build -t ${FULL_TAG} .

.PHONY: run
run:
	docker run -d -p ${PORT}:${PORT} --name ${DOCKER_TAG} ${FULL_TAG}

.PHONY: down
down:
	docker rm -f ${DOCKER_TAG}

.PHONY: test
test: envfile
	${GO_TEST_DOCKER_COMPOSE}

.PHONY: verify
verify:
	git clone git@github.com:contino/gsd-verification-rules.git || true 
	cd gsd-verification-rules && git pull && make verify 

.PHONY: security
security: envfile
	mkdir -p output
	docker-compose run --rm security zap-baseline.py -t http://gohelloworld:${PORT} > output/security-report.txt || true
	docker-compose down

.PHONY: create_table
create_table: envfile
	echo "from create_table"
	echo "FOO=${FOO}"
	echo "BAR=${BAR}"
	${AWS_CLI_DOCKER_COMPOSE} dynamodb create-table \
	--table-name ${DYNAMODB_TABLE} \
	--attribute-definitions AttributeName=GIT_COMMIT,AttributeType=S AttributeName=PIPELINE_ID,AttributeType=S \
	--key-schema AttributeName=GIT_COMMIT,KeyType=HASH AttributeName=PIPELINE_ID,KeyType=RANGE \
	--provisioned-throughput ReadCapacityUnits=10,WriteCapacityUnits=5

create_tags: envfile
	${AWS_CLI_DOCKER_COMPOSE} dynamodb put-item \
		--table-name ${DYNAMODB_TABLE}  \
		--item '{ "GIT_COMMIT": {"S": "${HASH}"}, "PIPELINE_BASE":{"S": "${PIPELINE_BASE}"}, "PIPELINE_ID":{"S": "${PIPELINE_ID}"} }'

.PHONY: clean
clean:
	docker kill ${DOCKER_TAG}
	docker rm ${DOCKER_TAG}




	
