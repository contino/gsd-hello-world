DOCKER_TAG				?= "go-hello-world"
PORT					?= "8080"
GO_TEST_DOCKER_COMPOSE  ?= docker-compose run --rm gotest go test -v -cover

.PHONY : build
build:
	docker build -t ${DOCKER_TAG} .

.PHONY: run
run:
	docker run -d -p ${PORT}:${PORT} --name ${DOCKER_TAG} ${DOCKER_TAG}

.PHONY: test
test:
	${GO_TEST_DOCKER_COMPOSE}

.PHONY: clean
clean:
	docker kill ${DOCKER_TAG}
	docker rm ${DOCKER_TAG}