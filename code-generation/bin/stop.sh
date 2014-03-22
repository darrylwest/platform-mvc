#!/bin/sh
#
# the service stop script
#

PORT=14060

curl -X POST -d x http://localhost:$PORT/shutdown

