/**
 * @class ServiceFactory
 * @classdesc create all services and their dependencies
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/23/14 9:45 AM
 */
var services = '../../app/services',
    delegates = '../../app/delegates',
    dao = '../../app/dao',
    DataModelCache = require( 'node-commons' ).delegates.DataModelCache,
    ConfigurationWebService = require( services + '/ConfigurationWebService' ),
    ConfigurationDataService = require( services + '/ConfigurationDataService' ),
    ConfigurationDao = require( dao + '/ConfigurationDao' ),
    CodeWebService = require( services + '/CodeWebService' ),
    CodeDataService = require( services + '/CodeDataService' ),
    FileWalker = require( delegates + '/FileWalker' ),
    CodeGenerator = require( delegates + '/CodeGenerator'),
    dash = require('lodash');

/**
 * @param options must contain a log and dataSourceFactory
 * @constructor
 */
var ServiceFactory = function(options) {
    'use strict';

    var factory = this,
        log = options.log,
        logManager = options.logManager,
        dataSourceFactory = options.dataSourceFactory,
        configurationDataService = options.configurationDataService,
        configurationDao = options.configurationDao,
        codeDataService = options.codeDataService,
        codeGenerator = options.codeGenerator,
        walker = options.fileWalker;

    this.createFileWalker = function() {
        if (!walker) {
            log.info('create file walker');

            var opts = {};
            opts.log = logManager.createLogger('FileWalker');

            walker = new FileWalker( opts );
        }

        return walker;
    };

    this.createCodeGenerator = function() {
        if (!codeGenerator) {
            log.info('create code generator');

            var opts = {};
            opts.log = logManager.createLogger('CodeGenerator');

            codeGenerator = new CodeGenerator( opts );
        }

        return codeGenerator;
    };

    /**
     * @desc create the code web service
     * @returns the web service
     */
    this.createCodeWebService = function() {
        log.info('create the code web service');

        var opts = {};

        opts.log = logManager.createLogger('CodeWebService');
        opts.dataService = factory.createCodeDataService();

        return new CodeWebService( opts );
    };

    this.createCodeDataService = function() {
        if (!codeDataService) {
            log.info('create the code data service');

            var opts = dash.clone( options );
            opts.log = logManager.createLogger('CodeDataService');
            opts.fileWalker = factory.createFileWalker();
            opts.codeGenerator = factory.createCodeGenerator();

            codeDataService = new CodeDataService( opts );
        }

        return codeDataService;
    };

    /**
     * @desc Return the service; create it if it doesn't exist
     *
     * @returns the singleton configuration web service
     */
    this.createConfigurationWebService = function() {

        log.info("create configuration web service");

        var opts = {};
        opts.log = logManager.createLogger( ConfigurationWebService.SERVICE_NAME );
        opts.dataService = factory.createConfigurationDataService();

        return new ConfigurationWebService( opts );

    };

    /**
     * Return the service; create it if it doesn't exist
     *
     * @returns the singleton configuration data service object
     */
    this.createConfigurationDataService = function() {
        if (!configurationDataService) {
            log.info("create configuration web service");

            var opts = {};
            opts.log = logManager.createLogger( 'ConfigurationDataService' );
            opts.dataSourceFactory = dataSourceFactory;
            opts.dao = factory.createConfigurationDao();

            configurationDataService = new ConfigurationDataService( opts );
        }

        return configurationDataService;
    };

    /**
     * @desc Return the dao; create it if it doesn't exist
     *
     * @returns the singleton dao
     */
    this.createConfigurationDao = function() {
        if (!configurationDao) {
            log.info("create configuration dao and cache");

            var createCache = function() {
                var opts = {};
                opts.log = logManager.createLogger( 'ConfigurationCache' );
                opts.capacity = 10;

                return new DataModelCache( opts );
            };

            var opts = {};
            opts.log = logManager.createLogger( 'ConfigurationDao' );
            opts.cache = createCache();

            configurationDao = new ConfigurationDao( opts );
        }

        return configurationDao;
    };

    // constructor validations
    if (!log) throw new Error('service factory must be constructed with a log');
    if (!logManager) throw new Error('service factory must be constructed with a log manager');
    if (!dataSourceFactory) throw new Error('service factory must be constructed with a dataSourceFactory');
};

module.exports = ServiceFactory;