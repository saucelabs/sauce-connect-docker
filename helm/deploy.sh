#!/bin/bash

CHART="sauce-connect"
CREDS="--set sauce_username=$SAUCE_USERNAME \
       --set sauce_access_key=$SAUCE_ACCESS_KEY"

LOG_FILE=helm-install.log
LOG="tee -a ${LOG_FILE}"
rm -f $LOG_FILE

helm lint $CREDS $CHART | $LOG && sleep 3; \
helm install $CREDS $CHART --dry-run --debug $CHART | $LOG && sleep 3; \
helm install --generate-name $CREDS $CHART | $LOG
