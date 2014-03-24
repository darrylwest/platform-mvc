#!/bin/sh
# dpw@alameda.local
# 2014.03.23
#

HOST="http://localhost:14060/CodeGenerationService"

config='{
    "template":"node-server-standard",
    "projectName":"todo-list",
    "serviceName":"TodoListService",
    "dateCreated":"now",
    "author":"kerry.coder@coders.com"
}'

curl -d "config=$config" "$HOST/code/create"

