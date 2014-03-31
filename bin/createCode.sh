#!/bin/sh
# dpw@alameda.local
# 2014.03.23
#

HOST="http://localhost:14060/CodeGenerationService"

config='{
    "template":"node-server-standard",
    "projectName":"todo-list-service",
    "serviceName":"TodoListService",
    "appTitle":"Todo List Service",
    "dateCreated":"now",
    "dateFormat":"DD-MMM-YYYY hh:mm a",
    "authorName":"kerry.coder@coders.com",
    "copyright":"(c) 2014 RainCitySoftware.com",
    "databaseName":"todo_development",
    "projectDescription":"Standard MVC Todo List to compare to other MVC frameworks...",
    "logName":"todo-list.log",
    "initialVersion":"00.90.000-1000",
    "port":39102,
    "appkey":"80dca131-97e6-411d-82bb-9a17f5f74c52",
    "appItemKey":"todoList"
}'

curl -d "config=$config" "$HOST/code/create"

