3M_IMAGE_NAME			?= flemay/musketeers
REGISTRY_URL			:= ghcr.io
GITHUB_REPOSITORY		?= contino/gsd-hello-world
IMAGE_NAME				?= go-hello-world
FULL_TAG				?= ${REGISTRY_URL}/${GITHUB_REPOSITORY}/${IMAGE_NAME}:${HASH}
DYNAMODB_TABLE			?= ${IMAGE_NAME}-v2
PORT					?= 8080
DOCKER_COMPOSE			?= FULL_TAG=${FULL_TAG} docker-compose
GO_TEST_DOCKER_COMPOSE  ?= docker-compose run --rm gobase go test -v -cover
AWS_CLI_DOCKER_COMPOSE  ?= docker-compose run --rm awscli
HASH 					:= $(shell git rev-parse HEAD)
ENVFILE 				?= aws.template
PIPELINE_BASE			?= contino/gsd-hello-world 

.DEFAULT_GOAL := help

.PHONY: help
help: ## List of targets with descriptions
	@echo "\n--------------------- Run [TARGET] [ARGS] or "make help" for more information ---------------------\n"
	@for MAKEFILENAME in $(MAKEFILE_LIST); do \
		grep -E '[a-zA-Z_-]+:.*?## .*$$' $$MAKEFILENAME | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'; \
	done
	@echo "\n---------------------------------------------------------------------------------------------------\n"

.PHONY: list
list: pull-3m-image ## Get list of all make targets
	@echo "list"; \
	$(DOCKER_RUN_3M) $(MAKE) --no-print-directory _list

.PHONY: _list
_list:
	@echo "\n---------------------------------------\nList of available targets:\n---------------------------------------" 
	@$(MAKE) -pRrq -f $(firstword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'
	@echo "\n---------------------------------------\n"

.PHONY: envfile
envfile: ## Create envfile
	cp $(ENVFILE) aws.env

.PHONY: build
build: ## Build the application
	docker build -t ${FULL_TAG} .

.PHONY: push
push: dockerlogin ## Push the containerized application
	docker push ${FULL_TAG}

.PHONY: dockerlogin
dockerlogin: ## Login to docker registry
	docker login ${REGISTRY_URL}

.PHONY: run
run: ## Run the application
	$(DOCKER_COMPOSE) up -d gohelloworld
	$(DOCKER_COMPOSE) up healthcheck

.PHONY: down
down: ## Stop the application
	$(DOCKER_COMPOSE)  down

.PHONY: test
test: envfile  ## Test the application
	${GO_TEST_DOCKER_COMPOSE}

.PHONY: verify
verify:
	git clone git@github.com:contino/gsd-verification-rules.git || true 
	cd gsd-verification-rules && git pull && make verify 

.PHONY: security
security: run ## Run security checks against app
	rm -rf security-report
	mkdir -p security-report
	$(DOCKER_COMPOSE) -p security -f security-compose.yml up
	$(DOCKER_COMPOSE) -p security -f security-compose.yml down || true
	@$(MAKE) --no-print-directory down

.PHONY: create_table
create_table: envfile
	-${AWS_CLI_DOCKER_COMPOSE} dynamodb create-table \
	--table-name ${DYNAMODB_TABLE} \
	--attribute-definitions AttributeName=GIT_COMMIT,AttributeType=S \
	--key-schema AttributeName=GIT_COMMIT,KeyType=HASH \
	--provisioned-throughput ReadCapacityUnits=10,WriteCapacityUnits=5 \
	--tags Key=Permanent,Value=True 

.PHONY: create_tags
create_tags: envfile
	${AWS_CLI_DOCKER_COMPOSE} dynamodb put-item \
		--table-name ${DYNAMODB_TABLE}  \
		--item '{ "GIT_COMMIT": {"S": "${HASH}"}, "PIPELINE_BASE":{"S": "${PIPELINE_BASE}"}, "PIPELINE_ID":{"S": "${PIPELINE_ID}"} }'

.PHONY: clean
clean: ## Cleanup and remove docker application
	docker kill ${IMAGE_NAME}
	docker rm ${IMAGE_NAME}

.PHONY: pull-3m-image
pull-3m-image: ## Pull 3M image for local executions
	docker pull ${3M_IMAGE_NAME}


	
