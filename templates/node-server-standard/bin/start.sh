#!/bin/sh
# the startup script
#

ENV=production

PORT=<%= config.port %>
SERVICE=<%= config.serviceName %>
CONFIG="`pwd`/config.json"
LOGNAME="<%= config.logName %>"

(
    cd app/
    nohup node app.js --env $ENV --configfile $CONFIG --logfile "${HOME}/logs/${LOGNAME}.log" > "../${LOGNAME}-nohup.log" &
)

sleep 2

curl "http://localhost:${PORT}/${SERVICE}/status"

