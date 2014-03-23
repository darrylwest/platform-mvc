/**
 * @class CodeWebService
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/23/14 1:59 PM
 */
var serviceName = 'CodeWebService',
    ServiceRoute = require('node-commons' ).models.ServiceRoute,
    AbstractWebService = require('node-commons' ).services.AbstractWebService;

/**
 * @param options log and dataService
 * @constructor
 */
var CodeWebService = function(options) {
    'use strict';

    var service = this,
        log = options.log,
        dataService = options.dataService;

    AbstractWebService.extend( this, options );

    this.create = function(request, response) {
        log.info('create: generate code from params');

        var responseCallback = function(err, list) {
            var payload = service.createListPayload( err, 'configurations', list );

            log.debug( "payload: ", payload );

            response.send( payload );
        };

        try {
            dataService.create( request.query, responseCallback );
        } catch(err) {
            log.error('create error: ', err);
            responseCallback( err, null );
        }
    };

    this.serviceName = options.serviceName || serviceName;
    this.routes = [
        ServiceRoute.create( 'get', '/code/create', service.create )
    ];

    // constructor validations
    if (!log) throw new Error("web service must be constructed with a log");
    if (!dataService) throw new Error("web service must be constructed with a data service");
};

module.exports = CodeWebService;