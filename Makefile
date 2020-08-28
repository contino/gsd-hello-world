DOCKER_TAG				?= go-hello-world
FULL_TAG				?= ${DOCKER_TAG}:${HASH}
DYNAMODB_TABLE			?= ${DOCKER_TAG}
PORT					?= "8080"
GO_TEST_DOCKER_COMPOSE  ?= docker-compose run --rm gobase go test -v -cover
AWS_CLI_DOCKER_COMPOSE  ?= docker-compose run --rm awscli
HASH := $(shell git rev-parse HEAD)
VERACODE_ID?= "someveracodeid"

ENVFILE ?= aws.template

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

.PHONY: test
test: envfile
	${GO_TEST_DOCKER_COMPOSE}

.PHONY: create_table
create_table: envfile
	echo "from create_table"
	echo "FOO=${FOO}"
	echo "BAR=${BAR}"
	${AWS_CLI_DOCKER_COMPOSE} dynamodb create-table \
		--table-name ${DYNAMODB_TABLE} \
		 --attribute-definitions \
			AttributeName=GIT_COMMIT,AttributeType=S \
			AttributeName=VERACODE_ID,AttributeType=S \
    	--key-schema \
			AttributeName=GIT_COMMIT,KeyType=HASH \
			AttributeName=VERACODE_ID,KeyType=RANGE \
		--provisioned-throughput \
        	ReadCapacityUnits=10,WriteCapacityUnits=5

create_tags: envfile
	${AWS_CLI_DOCKER_COMPOSE} dynamodb put-item \
		--table-name ${DYNAMODB_TABLE}  \
		--item \
			'{"GIT_COMMIT": {"S": "${HASH}"}, "VERACODE_ID":{"S": ${VERACODE_ID}}}'

.PHONY: clean
clean:
	docker kill ${DOCKER_TAG}
	docker rm ${DOCKER_TAG}




	
