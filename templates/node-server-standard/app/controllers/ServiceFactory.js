/**
 * @class ServiceFactory
 * @classdesc create all services and their dependencies
 *
 * @author: <%= config.authorName %>
 * @created: <%= config.dateCreated %>
 */
var services = '../../app/services',
    delegates = '../../app/delegates',
    dao = '../../app/dao',
    DataModelCache = require( 'node-commons' ).delegates.DataModelCache,
    ConfigurationWebService = require( services + '/ConfigurationWebService' ),
    ConfigurationDataService = require( services + '/ConfigurationDataService' ),
    ConfigurationDao = require( dao + '/ConfigurationDao' ),
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
        configurationDao = options.configurationDao;

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
