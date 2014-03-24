/**
 * @class CodeDataService
 * @classdesc code builder
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/23/14 2:20 PM
 */
var serviceName = 'CodeDataService',
    AbstractDataService = require('node-commons' ).services.AbstractDataService,
    path = require('path' ),
    fs = require('fs');

var CodeDataService = function(options) {
    'use strict';

    var service = this,
        log = options.log,
        templateFolder = options.templateFolder;
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

        var templateFilesCallback = function(err, files) {
            if (err) return responseCallback( err );

            var obj = {
                "distributionFile":targetFile,
                "fileList":files
            };

            responseCallback(null, obj);
        };

        service.readTemplateFiles( config.template, templateFilesCallback );
    };

    // TODO create a template file reader delegate to read and process all files

    /**
     * @desc verify the specified template by searching the templates folder(s).  if found, return true
     *
     * @param template
     * @callback list of files in the specified template
     */
    this.readTemplateFiles = function(template, callback) {
        if (!template) return callback( new Error('not a valid template') );

        var fileList = [],
            folderList = [],
            folder = path.join( templateFolder, template );

        log.info('find template files from: ', folder);

        return callback(null, fileList);
    };

    // constructor validations
    if (!log) throw new Error("data service must be constructed with a log");
};

module.exports = CodeDataService;