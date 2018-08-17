FROM ubuntu:16.04

YOSPER_DOCKER_ENV

#ENV SC_EXTRA_INFO='{"node_id": "prod-udon23"}'
ENV SC_LOG_FILE="-"

RUN apt-get update && apt-get install -y \
	ca-certificates

WORKDIR $SRV_HOME

COPY service.env ./
COPY src/sc ./

EXPOSE $SERVICE_PORT
CMD $SRV_HOME/sc --logfile=${SC_LOG_FILE} -i ${HOSTNAME} --extra-info=${SC_EXTRA_INFO}

