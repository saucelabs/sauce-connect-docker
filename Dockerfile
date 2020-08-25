FROM ubuntu:18.04


ARG SERVICE_NAME
ARG SERVICE_VERSION
ARG SERVICE_HOST
ARG SERVICE_PORT
ENV SERVICE_NAME=saucelabs/sauce-connect
ENV SERVICE_VERSION=4.6.2
ENV SERVICE_HOST=0.0.0.0
ENV SERVICE_PORT=22
ENV SERVICE_HOME=/srv/saucelabs/sauce-connect

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
	ca-certificates \
	wget

WORKDIR $SERVICE_HOME

ENV SC_PKG="sc-${SERVICE_VERSION}-linux.tar.gz"
RUN wget https://saucelabs.com/downloads/${SC_PKG} && \
	tar xvf ${SC_PKG} && rm -f ${SC_PKG}
RUN ln -s ${SERVICE_HOME}/sc-${SERVICE_VERSION}-linux/bin/sc /sc

COPY service.env ./
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
