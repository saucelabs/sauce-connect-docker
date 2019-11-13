#!/bin/bash

CHART=sauce-connect
helm ls -aq $CHART
helm delete --purge $CHART
