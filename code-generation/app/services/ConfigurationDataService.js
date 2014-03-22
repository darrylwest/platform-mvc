/**
 * ConfigurationDataService - query, save, find data services to support web API
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/22/14 11:54 AM
 */
var serviceName = 'ConfigurationDataService',
    Configuration = require('../models/Configuration'),
    AbstractDataService = require('node-commons' ).services.AbstractDataService;

var ConfigurationDataService = function(options) {
    "use strict";

    var service = this,
        log = options.log,
        dao = options.dao,
        dataSourceFactory = options.dataSourceFactory;

    AbstractDataService.extend( this, options );

    this.query = function(params, responseCallback) {

    };

    /**
     * save the configuration object.  this will update or insert based on the configuration id.  if the configuration
     * is found for the given id, the an update is done.  else, it's an insert.  The updated/inserted configuration
     * model is then returned.
     *
     * @param params - the components of a configuration object.  required fields are id and attributes.  the remaining
     * fields are completed through update or insert.  version is incremented and lastUpdated set to now on updates.
     *
     * Note: this also updates the cache, so a simple way to refresh the cache is to invoke a do-nothing update...
     *
     * @param responseCallback - the new model
     */
    this.save = function(params, responseCallback) {
        log.info("save the configuration object from params: ", params);
        var configuration = null,
            requiresInsert = false,
            attrs = null;

        if (!params.id) {
            var err = new Error("configuration must have an id, typically development, staging or production");
            log.error( err.message );
            return responseCallback( err, null );
        }

        if (!params.attributes) {
            throw new Error("configuration must have attributes");
        } else {
            attrs = JSON.parse( params.attributes );
            log.info("parsed attributes: ", attrs);
        }

        // if this was a more robust domain, it would include a model delegate that would be used to validate
        // the inputs.  configurations don't fall into that category...

        service.getPooledConnection(function(err, connection) {
            if (err) return responseCallback( err, null );

            var foundCallback = function(err, model) {
                if (err) throw err;

                var closeConnection = function(err, model) {
                    connection.release();

                    responseCallback(err, model);
                };

                if (model) {
                    log.info("found the existing model: ", model);
                    configuration = model;
                } else {
                    log.info("model not found, insert from params: ", params);
                    requiresInsert = true;
                    configuration = new Configuration( params );
                }

                configuration.attributes = attrs;

                if (requiresInsert) {
                    dao.insert( connection, configuration, closeConnection );
                } else {
                    dao.update( connection, configuration, closeConnection );
                }
            };

            configuration = dao.findById( connection, params.id, foundCallback );
        });
    };

    /**
     * find the configuration set for the given id, usually development, staging or production
     * @param params
     * @param responseCallback
     */
    this.find = function(id, responseCallback) {
        log.info("find configuration for id: ", id);

        service.getPooledConnection(function(err, connection) {
            if (err) return responseCallback( err, null );

            var closeConnection = function(err, model) {
                connection.release();

                responseCallback(err, model);
            };

            dao.findById( connection, id, closeConnection );
        });

    };

    if (!log) throw new Error("data service must be constructed with a log");
    if (!dao) throw new Error("data service must be constructed with a dao");
    if (!dataSourceFactory) throw new Error("data service must be constructed with a dataSourceFactory");
};

ConfigurationDataService.SERVICE_NAME = serviceName;

module.exports = ConfigurationDataService;
