/**
 * @class ApplicationFactory
 * @classdesc builds, or delegates building of all application components
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/22/14 7:06 AM
 */

var app = '../../app',
    services = app + '/services',
    delegates = app + '/delegates',
    dao = app + '/dao',
    express = require('express' ),
    mysql = require( 'mysql' ),
    redis = require( 'redis' ),
    aws = require( 'aws-sdk' ),
    AbstractApplicationFactory = require( 'node-commons' ).controllers.AbstractApplicationFactory,
    BootStrap = require( 'node-commons' ).controllers.CommonBootStrap,
    DataSourceFactory = require( 'node-commons' ).controllers.DataSourceFactory,
    Config = require('../../app/controllers/Config' ),
    ServiceFactory = require('./ServiceFactory' ),
    dash = require('lodash');

/**
 * @param options - can be an empty object, but usually it contains a Config object
 * @constructor
 */
var ApplicationFactory = function(options) {
    'use strict';

    var factory = this,
        log,
        dataSourceFactory = options.dataSourceFactory,
        serviceFactory = options.serviceFactory,
        webServiceList = [
            'IndexPageService',
            'WebStatusService',
            'ConfigurationWebService'
        ];

    AbstractApplicationFactory.extend( this, options );


    /**
     * @desc creates the service factory
     * @returns serviceFactory
     */
    this.createServiceFactory = function() {
        if (!serviceFactory) {
            log.info('create the service factory');

            var opts = dash.clone( options );

            opts.logManager = factory.createLogManager();
            opts.log = factory.createLogger('ServiceFactory');
            opts.dataSourceFactory = factory.createDataSourceFactory();

            serviceFactory = new ServiceFactory( opts );
        }

        return serviceFactory;
    };

    /**
     * @desc create the common data source factory; data sources include mysql, redis, S3, etc.
     */
    this.createDataSourceFactory = function() {
        if (!dataSourceFactory) {
            log.info('create data source factory');

            var opts = dash.clone( options );
            opts.log = factory.createLogger( 'DataSourceFactory' );

            opts.redis = redis;
            opts.mysql = mysql;
            opts.aws = aws;
            // opts.mailer = mailer;

            dataSourceFactory = new DataSourceFactory( opts );
        }

        return dataSourceFactory;
    };

    /**
     * @desc create all the web services defined in the web service list.  The service list is a collection/array of
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
        if (!serviceFactory) {
            serviceFactory = factory.createServiceFactory();
        }

        webServiceList.forEach(function(name) {
            var service = factory.findService( name );
            if (!service) {
                var closure = 'create' + name;
                log.info('invoking: ', closure);
                if (factory.hasOwnProperty( closure )) {
                    service = factory[ closure ].call();
                } else {
                    service = serviceFactory[ closure ].call();
                }

                factory.addService( service );
            }
        });

        log.info('service count: ', factory.getServiceCount());

        return factory.getServices();
    };

    /**
     * @desc create and start the web application with this sequence:
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