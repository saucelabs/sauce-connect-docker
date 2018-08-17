#!/bin/bash

source service.env

docker run -p 8022:$SERVICE_PORT -it $SERVICE_NAME:$SERVICE_VERSION $*
