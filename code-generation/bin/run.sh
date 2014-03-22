#!/bin/sh
# dpw@alameda.local
# 2014.03.22
#

PORT=14060
ENV=development

cd app/

node app.js --env $ENV --logfile ~/logs/mvc-code-generator.log

