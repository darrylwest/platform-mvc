#Platform-MVC

*A multi-language Model-View-Controller platform code-generation service...*
- - -
## Overview
The objective of this project is to define code generation tools that create Model View Controller projects for client or server independent of language.  Standard MVC platforms have evolved from Java, Python, Ruby, groovy with embedded jetty, and javascript for both client/browser and node/server applications.

The full application runs in multiple parts including the code generation service, command line interface, and a browser application.  The generation service runs on a remote machine and accepts requests for project generation with a supplied configuration.  Project generation is completed and returned to the requestor as a tar or zip distribution.  Alternatively, the generation project can be run locally and accessed from the command line to create projects locally.

## Code Generation
Code generation is based on template files and configuration settings.  The user sets expected configuration values and submits to the CodeGenerationService.  Values are applied to all template files an a specified template file-set.  

If the generation request includes an output filename the files are combined into a single zipped tar ball and copied to a public repository.  The user can then pull the tar file and apply to a local file system.

If the request includes a local folder name, then all generated files are copied to the specified folder.

## Platform Types

### Node Services
The node service code generator creates a standard JSON request/response service that is intended to pair up to a client application.  Typically node services do not create any HTML--only JSON.

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

## Code Generation Examples
### Server Application
### Client/Browser Application


- - -
<small>*darryl west | Rain City Software | march, 2014*</small>




