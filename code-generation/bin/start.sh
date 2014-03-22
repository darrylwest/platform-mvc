#!/bin/sh
# the startup script
#

PORT=14060
ENV=production
SERVICE=CodeGenerationService

# config?

(
    cd app/
    nohup node app.js --env $ENV --logfile ~/logs/mvc-code-generator.log > ../code-gen-nohup.log &
)

sleep 2

curl http://localhost:$PORT/$SERVICE/status

