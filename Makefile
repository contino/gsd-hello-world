DOCKER_TAG				?= "go-hello-world"
PORT					?= "8080"
GO_TEST_DOCKER_COMPOSE  ?= docker-compose run --rm gobase go test -v -cover
AWS_CLI_DOCKER_COMPOSE  ?= docker-compose run --rm awscli
HASH := $(shell git rev-parse HEAD)
VERACODE_ID?= "someveracodeid"

.PHONY : build
build:
	docker build -t ${DOCKER_TAG} .

.PHONY: run
run:
	docker run -d -p ${PORT}:${PORT} --name ${DOCKER_TAG} ${DOCKER_TAG}

.PHONY: test
test:
	${GO_TEST_DOCKER_COMPOSE}

.PHONY: create_table
create_table:
	${AWS_CLI_DOCKER_COMPOSE} dynamodb create-table \
		--table-name ${DOCKER_TAG} \
		 --attribute-definitions \
			AttributeName=GIT_COMMIT,AttributeType=S \
			AttributeName=VERACODE_ID,AttributeType=S \
    	--key-schema \
			AttributeName=GIT_COMMIT,KeyType=HASH \
			AttributeName=VERACODE_ID,KeyType=RANGE \
		--provisioned-throughput \
        	ReadCapacityUnits=10,WriteCapacityUnits=5

create_tags:
	${AWS_CLI_DOCKER_COMPOSE} dynamodb put-item \
		--table-name ${DOCKER_TAG}  \
		--item \
			'{"GIT_COMMIT": {"S": "${HASH}"}, "VERACODE_ID":{"S": ${VERACODE_ID}}}'
.PHONY: clean
clean:
	docker kill ${DOCKER_TAG}
	docker rm ${DOCKER_TAG}