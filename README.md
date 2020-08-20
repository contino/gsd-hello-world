# hello-world-go

[![Build Status](https://github.com/contino/gsd-hello-world/workflows/CI/badge.svg)](https://github.com/contino/gsd-hello-world/actions)

## Principals

This repo demostrates best practices of `Good Software Development` by following these principals:

- All build steps are wrapped in a common interface `Make`
- Build steps executed as basic shell/API calls in some cases, but in most cases execution is via docker images
- A single commit results in one artifact (which is immutable)

## What this repo does

This hello world app (written in Golang) demonstrates the following features:

- Building an application (`make build`)
- Running an application locally (`make run` then open `http://localhost:8080/` in your browser)
- Testing an application (`make test`)
- Storing properties associated with an application artifact (`make create_table` && `make create_tags`)

**note:** some actions expect an `aws.env` file to communicate with AWS infrastructure for the purposes of the demo. See `Makefile` for more information.

## Pipeline

Github actions is used to demonstrate a best practice pipeline: [Hello World Pipeline](https://github.com/contino/gsd-hello-world/actions).

This includes the creation of artifacts ("packages") for each commit: [Hello World Packages](https://github.com/contino/gsd-hello-world/packages).

# More Info

## Artifact Sotrage

**AWS DynamoDB** was used to keep the demo as simple and self-contained as possible, with the view than it would be replaced by an actual artifact store for a real impelmentation. For this reason the demo requires AWS credentials for some actions.

This demo wraps it's DynamoDB calls with `make` via `make create_table` and `make create_tags` targets to prove implementation is viable.

Other Artifact storage implementations you may choose when you implement this app in your own eco-system:

- Azure DevOps
- AWS CodeArtifact
- Artifactory
- Nexus
