#!/bin/sh
# dpw@alameda.local
# 2014.03.22
#

HOST="http://localhost:14060/CodeGenerationService"

id='node-service'
attributes='{
    "serviceName":{
        "prompt":"Node Service Name",
        "validation":"string(1,40)",
        "value":""
    },
    "servicePort":{
        "prompt":"Port Number",
        "validation":"number(1024,99999)",
        "value":""
    }
}'

params="id=$id&attributes=$attributes"

curl -d "$params" "$HOST/configuration/save"

