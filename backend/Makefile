SHELL := /bin/bash

.PHONY: build up stop remove clean down start

build:
	@docker build -t translatorapp .

up:
	@docker run --name translatorapp -d -p 9000\:9000 translatorapp

stop:
	@docker stop translatorapp

remove:
	@docker rm translatorapp

clean:
	@docker rmi translatorapp

down:
	@docker stop translatorapp
	@docker rm translatorapp
	@docker rmi translatorapp

start:
	@docker build -t translatorapp .
	@docker run --name translatorapp -d -p 9000\:9000 translatorapp