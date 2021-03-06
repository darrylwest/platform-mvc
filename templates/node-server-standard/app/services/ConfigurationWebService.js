/**
 * @class ConfigurationWebService
 * @classdesc standard API for find, query, and save of configurations
 *
 * @author: <%= config.authorName %>
 * @created: <%= config.dateCreated %>
 */
var serviceName = 'ConfigurationWebService',
    ServiceRoute = require('node-commons' ).models.ServiceRoute,
    AbstractWebService = require('node-commons' ).services.AbstractWebService;

/**
 * @param options - options must supply a log and data service
 * @constructor
 */
var ConfigurationWebService = function(options) {
    "use strict";

    var service = this,
        log = options.log,
        dataService = options.dataService;

    AbstractWebService.extend( this, options );

    /**
     * @desc query the list of configurations
     *
     * @param request
     * @param response
     */
    this.query = function(request, response) {
        log.info('query for a list of configurations');

        var responseCallback = function(err, list) {
            var payload = service.createListPayload( err, 'configurations', list );

            log.debug( "payload: ", payload );

            response.send( payload );
        };

        try {
            dataService.query( request.query, responseCallback );
        } catch (err) {
            log.error( 'fatal error in query: ', err );
            responseCallback( err, null );
        }
    };

    /**
     * @desc save the configuration
     *
     * @param request
     * @param response
     */
    this.save = function(request, response) {
        log.info("save request from ip: ", request.ip, ", ip list: ", request.ips);
        log.info("save the configuration: body: ", request.query);

        var responseCallback = function(err, model) {
            var payload = service.createModelPayload( err, 'configuration', model );

            log.debug( "payload: ", payload );

            response.send( payload );
        };

        try {
            dataService.save( request.body, responseCallback );
        } catch (err) {
            log.error( "fatal error in query: ", err );
            responseCallback( err, null );
        }
    };

    /**
     * @desc Find the configuration for the given id; the id may be one of the following: development, staging, production
     *
     * @param request - the configuration id - development, staging, production
     * @param response - the configuration model
     */
    this.find = function(request, response) {
        var id = request.params.id || request.query.id;

        log.info("find the configuration from ip: ", request.ip, ", ip list: ", request.ips);
        log.info("find the configuration for the given id: ", id);

        var responseCallback = function(err, model) {
            log.info( "configuration model: ", model );
            if (!model) {
                if (!err) {
                    var msg = 'no configuration found for id: ' + id;
                    err = new Error( msg );
                }
            }

            var payload = service.createModelPayload( err, 'configuration', model );

            log.debug( "payload: ", payload );

            response.send( payload );
        };

        try {
            dataService.find( id, responseCallback );
        } catch(err) {
            log.error('find error: ', err);
            responseCallback( err, null );
        }
    };

    this.serviceName = options.serviceName || serviceName;
    this.routes = [
        ServiceRoute.create( 'get', '/configuration/query', service.query ),
        ServiceRoute.create( 'post', '/configuration/save', service.save ),
        ServiceRoute.create( 'get', '/configuration/find/:id', service.find ),
        ServiceRoute.create( 'get', '/configuration/find', service.find )
    ];

    // constructor validations
    if (!log) throw new Error("web service must be constructed with a log");
    if (!dataService) throw new Error("web service must be constructed with a data service");
};

ConfigurationWebService.SERVICE_NAME = serviceName;

module.exports = ConfigurationWebService;
