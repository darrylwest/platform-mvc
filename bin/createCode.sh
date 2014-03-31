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
    "dateFormat":"DD-MMM-YYYY hh:mm a",
    "authorName":"kerry.coder@coders.com",
    "copyright":"(c) YYYY RainCitySoftware.com",
    "databaseName":"TodoList",
}'

curl -d "config=$config" "$HOST/code/create"

