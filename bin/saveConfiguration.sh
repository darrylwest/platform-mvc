#!/bin/sh
# dpw@alameda.local
# 2014.03.22
#

HOST="http://localhost:14060/CodeGenerationService"

id='node-service-standard'
attributes='{
    "description":"Create a standard node REST service with access to MySQL, redis, AWS, etc.  Optionally include established application and test services and add custom services",
    "serviceName":{
        "prompt":"Node Service Name",
        "validation":"inLength(1,40)",
        "value":""
    },
    "servicePort":{
        "prompt":"Port Number",
        "validation":"isNumberBetween(1024,99999)",
        "value":""
    },
    "application-includes":{
        "controllers":[
            "ApplicationFactory",
            "Config"
        ],
        "dao":[
            "ConfigurationDao"
        ],
        "delegates":[
        ],
        "services":[
            "ConfigurationWebService","ConfigurationDataService"
        ]
    },
    "test-includes":{
        "controllers":[
            "ApplicationFactoryTests",
            "ConfigTests"
        ],
        "dao":[
            "ConfigurationDaoTests"
        ],
        "delegates":[
        ],
        "fixtures":[
            "ConfigurationDataset"
        ],
        "mocks":[
        ],
        "services":[
            "ConfigurationWebServiceTests","ConfigurationDataServiceTests"
        ]
    }
}'

params="id=$id&attributes=$attributes"

curl -d "$params" "$HOST/configuration/save"

