/**
 * app startup
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/22/14 10:07 AM
 */

var applicationFactory = require('./controllers/ApplicationFactory' ).createInstance(),
    express = require('express' ),
    app = express();

applicationFactory.startWebApplication( app );