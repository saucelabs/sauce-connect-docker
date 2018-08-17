#!/bin/bash

${SRV_HOME}/sc-${SERVICE_VERSION}-linux/bin/sc --logfile=${SC_LOG_FILE} -i ${HOSTNAME} --extra-info=${SC_EXTRA_INFO}
