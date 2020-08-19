# hello-world-go

This hello world app (written in Golang) demonstrates the following features:

- building an application (`make build`)
- running an application locally (`make run` then open `http://localhost:8080/` in your browser)
- testing an application (`make test`)
- storing properties associated with an application artifact (`make create_table && make create_tags`)

**note:** some actions expect an `aws.env` file to communicate with AWS infrastructure for the purposes of the demo. See `Makefile` for more information.

This repo also demostrates best practices of `Good Software Development` by following these principals:

- all build steps are wrapped in a common interface `Make`
- build steps executed as basic shell/API calls in some cases, but in most cases execution is via docker images
- a single commit results in one artifact (which is immutable)

# More Info

AWS DynamoDB was used to keep the demo as simple and self-contained as possible, with the view than it would be replaced by an actual artifact store for a real impelmentation.
