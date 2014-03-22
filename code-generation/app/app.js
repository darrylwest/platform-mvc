/**
 * app startup
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/22/14 10:07 AM
 */

var applicationFactory = require('./controllers/ApplicationFactory' ).createInstance(),
    express = require('express' ),
    app = express();

console.log('start the service...');
// applicationFactory.startWebApplication( app );