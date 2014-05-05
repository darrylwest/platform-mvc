#!/bin/sh
# dpw@alameda.local
# 2014.03.22
#

PORT=<%= config.port %>
ENV=development
CONFIG="`pwd`/config.json"
LOGNAME="<%= config.logName %>"

cd app/

node app.js --env $ENV --configfile $CONFIG --logfile "${HOME}/logs/${LOGNAME}-dev.log"

