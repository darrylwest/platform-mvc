/**
 *
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/22/14 7:06 AM
 */

var app = '../../app',
    services = app + '/services',
    delegates = app + '/delegates',
    AbstractApplicationFactory = require( 'node-commons' ).controllers.AbstractApplicationFactory,
    BootStrap = require( 'node-commons' ).controllers.CommonBootStrap,
    Config = require('../../app/controllers/Config' ),
    dash = require('lodash');

var ApplicationFactory = function(options) {
    'use strict';

    var factory = this;


};

/**
 * static startup method that creates bootstrap to read the command line args and create config for the specified env
 */
ApplicationFactory.createInstance = function() {
    'use strict';

    var bootStrap = new BootStrap( Config.VERSION );

    // this is how to add a new command line switch/option
    // bootStrap.getParser().option('-c, --configfile [configfile]', 'set the configfile', 'vendor-config.json');

    var options = bootStrap.parseCommandLine( process.argv );

    // create the config file based on the specific env
    var config = Config[ options.env ]( options );

    var applicationFactory = new ApplicationFactory( config );

    return applicationFactory;
};

module.exports = ApplicationFactory;