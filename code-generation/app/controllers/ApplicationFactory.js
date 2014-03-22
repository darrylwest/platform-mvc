/**
 * ApplicationFactory - builds, or delegates building of all application components
 *
 * @author: darryl.west@roundpeg.com
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
    DataModelCache = require( 'node-commons' ).delegates.DataModelCache,
    Config = require('../../app/controllers/Config' ),
    ConfigurationWebService = require( services + '/ConfigurationWebService' ),
    ConfigurationDataService = require( services + '/ConfigurationDataService' ),
    ConfigurationDao = require( dao + '/ConfigurationDao' ),
    dash = require('lodash');

var ApplicationFactory = function(options) {
    'use strict';

    var factory = this,
        log,
        dataSourceFactory = options.dataSourceFactory,
        configurationDataService = options.configurationDataService,
        configurationDao = options.configurationDao,
        webServiceList = [
            'IndexPageService',
            'WebStatusService',
            'ConfigurationService'
        ];

    AbstractApplicationFactory.extend( this, options );

    /**
     * Return the service; create it if it doesn't exist
     *
     * @returns the configuration web service
     */
    this.createConfigurationWebService = function() {
        var service = factory.findService( ConfigurationWebService.SERVICE_NAME );

        if (!service) {
            log.info("create configuration web service");

            var opts = {};
            opts.log = factory.createLogger( ConfigurationWebService.SERVICE_NAME );
            opts.dataService = factory.createConfigurationDataService();

            service = new ConfigurationWebService( opts );
        }

        return service;
    };

    this.createConfigurationDataService = function() {
        if (!configurationDataService) {
            log.info("create configuration web service");

            var opts = {};
            opts.log = factory.createLogger( 'ConfigurationDataService' );
            opts.dataSourceFactory = factory.createDataSourceFactory();
            opts.dao = factory.createConfigurationDao();

            configurationDataService = new ConfigurationDataService( opts );
        }

        return configurationDataService;
    };

    this.createConfigurationDao = function() {
        if (!configurationDao) {
            log.info("create configuration dao and cache");

            var createCache = function() {
                var opts = {};
                opts.log = factory.createLogger( 'ConfigurationCache' );
                opts.capacity = 10;

                return new DataModelCache( opts );
            };

            var opts = {};
            opts.log = factory.createLogger( 'ConfigurationDao' );
            opts.cache = createCache();

            configurationDao = new ConfigurationDao( opts );
        }

        return configurationDao;
    };

    // TODO create the services: builder, templates

    /**
     * create the common data source factory; data sources include mysql, redis, S3, etc.
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