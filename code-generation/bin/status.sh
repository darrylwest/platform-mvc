#!/bin/sh
# dpw@alameda.local
# 2014.03.22
#

PORT=14060
ENV=production
SERVICE=CodeGenerationService

curl http://localhost:$PORT/$SERVICE/status

