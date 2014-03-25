/**
 * @class CodeDataService
 * @classdesc code builder
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/23/14 2:20 PM
 */
var serviceName = 'CodeDataService',
    AbstractDataService = require('node-commons' ).services.AbstractDataService,
    path = require('path' );

var CodeDataService = function(options) {
    'use strict';

    var service = this,
        log = options.log,
        templateFolder = options.templateFolder,
        walker = options.fileWalker;

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

        var templateFilesCallback = function(err, files) {
            if (err) return responseCallback( err );

            var obj = {
                "distributionFile":targetFile,
                "fileList":files
            };

            responseCallback(null, obj);
        };

        walker.readFiles( path.join( templateFolder, config.template ), templateFilesCallback );
    };

    // TODO create a template file reader delegate to read and process all files

    // constructor validations
    if (!log) throw new Error("data service must be constructed with a log");
    if (!walker) throw new Error("data service must be constructed with a file walker");
};

module.exports = CodeDataService;