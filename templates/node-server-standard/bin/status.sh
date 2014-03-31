#!/bin/sh
# dpw@alameda.local
# 2014.03.22
#

PORT=<%= config.port %>
ENV=production
SERVICE=<%= config.serviceName %>

curl http://localhost:$PORT/$SERVICE/status

