#!/bin/bash

SC_BIN=${SERVICE_HOME}/sc-${SERVICE_VERSION}-linux/bin/sc

if [ "$1" != '--' ]; then
  $SC_BIN "$@"
else
  shift
  exec "$@"
fi
