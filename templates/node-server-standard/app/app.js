/**
 * app startup
 *
 * @author: <%= config.authorName %>
 * @created: <%= config.dateCreated %>
 */

var applicationFactory = require('./controllers/ApplicationFactory' ).createInstance(),
    express = require('express' ),
    app = express();

applicationFactory.startWebApplication( app );