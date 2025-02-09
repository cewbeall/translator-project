SHELL := /bin/bash

.PHONY: build up stop remove clean down start

build:
	@docker build -t translator .

up:
	@docker run --name translator -d -p 9000\:9000 translator

stop:
	@docker stop translator

remove:
	@docker rm translator

clean:
	@docker rmi translator

down:
	@docker stop translator
	@docker rm translator
	@docker rmi translator

start:
	@docker build -t translator .
	@docker run --name translator -d -p 9000\:9000 translator