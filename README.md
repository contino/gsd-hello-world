# hello-world-go

**Github Actions**

[![Build Status](https://github.com/contino/gsd-hello-world/workflows/CI/badge.svg)](https://github.com/contino/gsd-hello-world/actions)


**Sonar**

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=barrrrrrrrr&metric=alert_status)](https://sonarcloud.io/dashboard?id=barrrrrrrrr)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=barrrrrrrrr&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=barrrrrrrrr)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=barrrrrrrrr&metric=security_rating)](https://sonarcloud.io/dashboard?id=barrrrrrrrr)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=barrrrrrrrr&metric=bugs)](https://sonarcloud.io/dashboard?id=barrrrrrrrr)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=barrrrrrrrr&metric=code_smells)](https://sonarcloud.io/dashboard?id=barrrrrrrrr)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=barrrrrrrrr&metric=coverage)](https://sonarcloud.io/dashboard?id=barrrrrrrrr)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=barrrrrrrrr&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=barrrrrrrrr)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=barrrrrrrrr&metric=ncloc)](https://sonarcloud.io/dashboard?id=barrrrrrrrr)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=barrrrrrrrr&metric=sqale_index)](https://sonarcloud.io/dashboard?id=barrrrrrrrr)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=barrrrrrrrr&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=barrrrrrrrr)


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

## Requirements

You will require the following environment variables in your shell (or in the case of a build server like Github Actions, in your Settings/Secrets section).

`SONAR_TOKEN` is used to allow sonar scanning.

`GH_PACKAGES` is used to upload to Github Packages.

`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_DEFAULT_REGION` are used for access to AWS to manage data in DynamoDB.

## Artifact Sotrage

**AWS DynamoDB** was used to keep the demo as simple and self-contained as possible, with the view than it would be replaced by an actual artifact store for a real impelmentation. For this reason the demo requires AWS credentials for some actions.

This demo wraps it's DynamoDB calls with `make` via `make create_table` and `make create_tags` targets to prove implementation is viable.

Other Artifact storage implementations you may choose when you implement this app in your own eco-system:

- Azure DevOps
- AWS CodeArtifact
- Artifactory
- Nexus
