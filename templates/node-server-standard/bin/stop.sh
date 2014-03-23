#!/bin/sh
#
# the service stop script
#

PORT=<%= config.port %>

curl -X POST -d x http://localhost:$PORT/shutdown

