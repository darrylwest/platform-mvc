#Platform-MVC


*A standard MVC platform generation service for client and server implementations targeting various languages...*
- - -
## Overview
The objective of this project is to define code generation tools that create Model View Controller projects for client or server independent of language.  Standard MVC platforms have evolved from Java, Ruby, groovy with embedded jetty, and javascript for both client/browser and node/server applications.

The service is intended to run on a remote machine and accept requests for project generation with a supplied configuration.  Project generation is completed and returned to the requestor as a tar or zip distribution.

## Code Generation

### Node Services
The node service generator creates a standard JSON request/response service that is intended to pair up to a client application.  Node service do not create any HTML--only JSON.  
### Browser Applications
MVC client/browser applications are single page HTML5 applications that can run from any web container.  Client applications follow the standard MVC package layout and contain many class files.  This is the standard development configuration.  

For production, the class files compile to a single application.js file that can be cached and run off-line.  An application.css file is also created for production.

### Service Domains
### Generated Distribution 

## Implementation
### Application Folder Structure
MVC applications are a collection of source files that implement specific logic with respect to their own domain.  For simplicity, our MVC framework keeps files in predictable, well named folders no more than one layer deep.  The folder names are consistent and only vary based on application type, e.g., client/browser or server.


- components - components are combined to create views
- contollers - process & view controllers plus factories
- dao - connection-less data access objects -- just the logic for aquiring and updating data
- delegates - worker logic; kind of like utils but with more specificity. workers include parsers, calculators, etc.
- events - stateless event objects
- models - stageful value objects, e.g., data models
- services - connection logic to the outside world either client to server or server to client
- views - formal views, if any exist.  services don't have views.  clients have views but they may be dynamically created, so this folder is often empty

### Other Folders
#### Libraries
#### Configuration
Each project may optionally contain a configuration folder, usually named 'config'.  Configurations stored in the config folder enables easy configuration across multiple customer installations. 
#### Test
Each project has a full set of unit tests.  Most projects have a folder called 'test' that contain data fixtures, mochs, and tests.  For client/browsers this folder is called 'mocha' and include the mocha/chai test libraries.

## Code Generation
A simple client application is used to initiate code generation for the specified configuration.


- - -
<small>*darryl west, Rain City Software, march, 2014*</small>




