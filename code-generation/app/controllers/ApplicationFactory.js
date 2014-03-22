/**
 * ApplicationFactory - builds, or delegates building of all application components
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/22/14 7:06 AM
 */

var app = '../../app',
    services = app + '/services',
    delegates = app + '/delegates',
    express = require('express' ),
    AbstractApplicationFactory = require( 'node-commons' ).controllers.AbstractApplicationFactory,
    BootStrap = require( 'node-commons' ).controllers.CommonBootStrap,
    Config = require('../../app/controllers/Config' ),
    dash = require('lodash');

var ApplicationFactory = function(options) {
    'use strict';

    var factory = this,
        log,
        webServiceList = [
            'IndexPageService',
            'WebStatusService'
        ];

    AbstractApplicationFactory.extend( this, options );

    // TODO create the services: builder, templates

    /**
     * create all the web services defined in the web service list.  The service list is a collection/array of
     * strings that identify the service.  The name is combined with the word 'create' to create a closure
     * that creates the service.
     *
     * Notes:
     *   - This method should be invoked prior to setting routes.
     *   - This implementation is here rather than in the abstract class to eliminate the circular
     *     references between abstract and concrete classes...
     *
     * @returns an array of all web services
     */
    this.createWebServices = function() {
        webServiceList.forEach(function(name) {
            var service = factory.findService( name );
            if (!service) {
                var closure = 'create' + name;
                log.info('invoking: ', closure);
                service = factory[ closure ].call();

                factory.addService( service );
            }
        });

        log.info('service count: ', factory.getServiceCount());

        return factory.getServices();
    };

    /**
     * create and start the web application with this sequence:
     *   *) create all the services
     *   *) create and assign any middleware
     *   *) assign the service routes
     *   *) listen on the designated port
     *
     * @param app - an express like instance
     */
    this.startWebApplication = function(app) {
        var config = factory.getConfiguration();
        log.info('application starting with Version: ', config.version, ', for env: ', config.environment);

        factory.createWebServices();

        // use this to get the ip list
        app.enable('trust proxy');
        app.disable('x-powered-by');

        var middlewareDelegate = factory.createMiddlewareDelegate();

        app.use( middlewareDelegate.allowCrossDomain );
        app.use( middlewareDelegate.shutdown );

        // this is replaced for the next connect version
        // app.use( express.bodyParser() );

        app.use( express.urlencoded() );
        app.use( express.json() );

        factory.assignRoutes( app );

        app.listen( config.port );
        log.info('listening on port: ', config.port, ', logging to: ', config.logfile);
    };

    this.getWebServiceList = function() { return webServiceList; };

    // create the logger for this and the abstract instances
    log = factory.createLogger('ApplicationFactory');
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