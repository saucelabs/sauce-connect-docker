#!/bin/bash

source service.env

sudo mkdir -p $YOSPER_VOLUME/services/$SERVICE_NAME

$YOSPER_HOME/scripts/docker_build.sh
