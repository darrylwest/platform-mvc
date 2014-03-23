#!/bin/sh
# dpw@alameda.local
# 2014.03.23
#

HOST="http://localhost:14060/CodeGenerationService"

config='{
    "template":"node-service-standard",
    "projectName":"My Fun Project",
    "serviceName":"FunService",
    "dateCreated":"2014-03-01",
    "author":"kerry.coder@coders.com"
}'

curl -d "config=$config" "$HOST/code/create"

