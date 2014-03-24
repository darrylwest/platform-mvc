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
    this.generateCode = function(params, responseCallback) {
        log.info('create the code from params: ', params);

        var config = JSON.parse( params.config ),
            targetFile = config.targetFile || 'output.tar.gz';

        // verify the template
        if (service.readTemplateFolder( config.template )) {

        }

        responseCallback(null, { "file":targetFile });
    };

    /**
     * @desc verify the specified template by searching the templates folder(s).  if found, return true
     *
     * @param template
     * @returns {boolean}
     */
    this.verifyTemplate = function(template) {
        if (!template) return false;



    };

    // constructor validations
    if (!log) throw new Error("data service must be constructed with a log");
};

module.exports = CodeDataService;