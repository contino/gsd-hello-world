FROM golang:latest

LABEL maintainer="james noonan (james.noonan@contino.io)"

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o main .

EXPOSE 8080

This will go horribly wrong!

CMD ["./main"]
