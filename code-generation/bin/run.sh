#!/bin/sh
# dpw@alameda.local
# 2014.03.22
#

PORT=14060
ENV=development
CONFIG="`pwd`/config.json"

cd app/

node app.js --env $ENV --configfile $CONFIG --logfile ~/logs/mvc-code-generator.log

