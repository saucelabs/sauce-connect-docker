#!/bin/bash

source service.env

docker run --network host -v $PWD:/tmp -e SAUCE_USERNAME=${SAUCE_USERNAME} -e SAUCE_ACCESS_KEY=${SAUCE_ACCESS_KEY} -it ${SERVICE_NAME}:${SERVICE_VERSION} $@