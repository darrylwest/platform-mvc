#Platform-MVC


*A standard MVC platform for client and server implementations written in various languages...*
- - -
## Overview
The objective of this project is to define a platform for development server and client applications using Model View Controller.  The platform is language independent and was originally developed in Java, then in groovy and now, javascript for both client/browser and node/server applications.

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
To facilitate quick startup, code generators have been created for client and server applications.  Generation is configuration driven through simple prompts (ala yoeman) and through a stand-alone UI interface.  Scripts are written in javascript and have the capability to interigate database schemas to aid in generation.


- - -
<small>*darryl west, march, 2014*</small>




