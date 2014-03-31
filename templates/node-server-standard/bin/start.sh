#!/bin/sh
# the startup script
#

ENV=production

PORT=<%= config.port %>
SERVICE=<%= config.serviceName %>
CONFIG=`pwd`/config.json
LOGNAME="<%= config.logName %>"

# config?

(
    cd app/
    nohup node app.js --env $ENV --configfile $CONFIG --logfile ~/logs/$LOGNAME.log > ../code-gen-nohup.log &
)

sleep 2

curl http://localhost:$PORT/$SERVICE/status

