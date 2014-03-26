/**
 * @class CodeGenerator
 * @classdesc
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/26/14
 */
var dash = require('lodash'),
    uuid = require('node-uuid'),
    async = require('async');

/**
 * @param options - log, file walker
 * @constructor
 */
var CodeGenerator = function(options) {
    'use strict';

    var delegate = this,
        log = options.log,
        fileWalker = options.fileWalker,
        id = uuid.v4(),
        generationCompleteCallback;

    /**
     * used for tracking code generations
     * @returns this instance id
     */
    this.getId = function() {
        return id;
    };

    /**
     * create a new instance of this object - this is the standard operating mode, first create
     * an instance then generate the code.
     *
     * @returns unique CodeGenerator instance
     */
    this.createInstance = function() {
        log.info('clone and return a new generator instance');
        var generator = new CodeGenerator( options );

        return generator;
    };

    /**
     * process the individual template file by reading it, compiling and applying config
     *
     * @param file - the full path to the template file
     * @param callback - the individual file process callback
     */
    this.processFile = function(file, processCompleteCallback) {

        var readCompleteCallback = function(err, results) {
            if (err) return processCompleteCallback( err );

            // TODO run it through the template process

            processCompleteCallback( err, results );
        };
    };

    /**
     * access each template file with config settings
     *
     * @param config - the code settings
     * @param templateFiles - list of all the template files
     * @param completeCallback - where to send the results
     */
    this.generateCode = function(config, templateFiles, completeCallback) {
        config.fileList = templateFiles;

        // set the instance varible to enable callback from any point
        generationCompleteCallback = completeCallback;

        completeCallback( null, config );

    };



    // constructor validations
    if (!log) throw new Error("delegate must be constructed with a log");
};

module.exports = CodeGenerator;
