/**
 * @class CodeDataService
 * @classdesc code builder
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/23/14 2:20 PM
 */
var serviceName = 'CodeDataService',
    AbstractDataService = require('node-commons' ).services.AbstractDataService;

var CodeDataService = function(options) {
    'use strict';

    var service = this,
        log = options.log;
        // TODO add builder delegates

    AbstractDataService.extend( this, options );

    /**
     * @desc generate the code based on configuration/params
     *
     * @param params - a known code generation configuration
     * @param responseCallback
     */
    this.create = function(params, responseCallback) {
        log.info('create the code from params: ', params);

        responseCallback(new Error('not implemented yet'));
    };

    // constructor validations
    if (!log) throw new Error("data service must be constructed with a log");
};

module.exports = CodeDataService;