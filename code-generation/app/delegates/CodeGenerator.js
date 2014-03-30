/**
 * @class CodeGenerator
 * @classdesc CodeGenerator uses a formal closure pattern to enable use of multiple method
 * that have access to private variables.  The code generator provides a 'createInstance'
 * method to create a separate and distinct instance that has access to the generation
 * configuration (config) and the callback.  The instance also has the ability to read and
 * process multiple files and generate results that are hidden from other generation processes.
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/26/14
 */
var dash = require('lodash'),
    uuid = require('node-uuid'),
    fs = require('fs'),
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
        config = options.config,
        generationCompleteCallback = options.generationCompleteCallback;

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
        var readCompleteCallback = function(err, data) {
            var text,
                builder;

            if (err) return processCompleteCallback( err );

            log.info( file );

            try {
                builder = dash.template( data.toString() );
                text = builder( { config:config } );

                // TODO now convert <!% and %!> to <% and %>
                if (text.indexOf('<!%') > 0) {
                    text = text.replace( /<!%/g, '<%');
                    text = text.replace( /%!>/g, '%>');

                    log.info( text );
                }

                log.debug( text );
            } catch (e) {
                err = e;
                log.error( e );
            }

            processCompleteCallback( err, text );
        };

        fs.readFile(file, readCompleteCallback);
    };

    /**
     * access each template file with config settings
     *
     * @param config - the code settings
     * @param templateFiles - list of all the template files
     * @param completeCallback - where to send the results
     */
    this.generateCode = function(conf, templateFiles, completeCallback) {
        config = conf;
        config.fileList = templateFiles;

        // set the instance varible to enable callback from any point
        generationCompleteCallback = completeCallback;

        // TODO this should be a public method that writes the output archive file
        var loopCompleteCallback = function(err) {
            generationCompleteCallback( err, config );
        };

        async.eachLimit( templateFiles, 6, delegate.processFile, loopCompleteCallback );
    };

    // constructor validations
    if (!log) throw new Error("delegate must be constructed with a log");
};

module.exports = CodeGenerator;
