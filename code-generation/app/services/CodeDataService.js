/**
 * @class CodeDataService
 * @classdesc code builder
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/23/14 2:20 PM
 */
var serviceName = 'CodeDataService',
    AbstractDataService = require('node-commons' ).services.AbstractDataService,
    moment = require('moment'),
    path = require('path' );

var CodeDataService = function(options) {
    'use strict';

    var service = this,
        log = options.log,
        templateFolder = options.templateFolder,
        walker = options.fileWalker,
        codeGenerator = options.codeGenerator;

    AbstractDataService.extend( this, options );

    /**
     * @desc generate the code based on configuration/params
     *
     * @param params - a known code generation configuration
     * @param responseCallback
     */
    this.generateCode = function(params, responseCallback) {
        log.info('create the code from params: ', params);

        var config = service.parseConfig( params.config );

        var generationCompleteCallback = function(err, results) {
            // TODO write the archive?

            responseCallback(err, results);
        };

        var templateFilesCallback = function(err, files) {
            if (err) return responseCallback( err );

            codeGenerator.generateCode(config, files, generationCompleteCallback);
        };

        walker.findFiles( path.join( templateFolder, config.template ), templateFilesCallback );
    };

    /**
     * parse the config json string and set the defaults
     *
     * @param json
     * @returns the processed config object
     */
    this.parseConfig = function(json) {
        log.info('parse and prepare the config settings');

        var config = JSON.parse( json );

        // set the defaults
        if (!config.projectName) {
            config.projectName = 'test-project';
            log.warn('set the project name: ', config.projectName);
        }

        if (!config.targetFile) {
            config.targetFile = config.projectName + '.tar.gz';
            log.info('set the default target output file: ', config.targetFile);
        }

        if (!config.dateFormat) {
            config.dateFormat = 'DD-MMM-YYYY hh:mm a';
            log.info('set the default date format: ', config.dateFormat);
        }

        if (config.dateCreated === 'now') {
            config.dateCreated = new moment().format( config.dateFormat );
            log.info('set and format date created: ', config.dateCreated);
        }

        return config;
    };

    // constructor validations
    if (!log) throw new Error("data service must be constructed with a log");
    if (!codeGenerator) throw new Error('data service must be constructed with a code generator');
    if (!walker) throw new Error("data service must be constructed with a file walker");
};

module.exports = CodeDataService;
