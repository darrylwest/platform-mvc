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
    path = require('path'),
    async = require('async');

/**
 * @param options - log, file walker
 * @constructor
 */
var CodeGenerator = function(options) {
    'use strict';

    var delegate = this,
        log = options.log,
        targetFolder = options.targetFolder,
        archiver = options.fileArchiver,
        tar,
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
    this.processFile = function(templateFile, processCompleteCallback) {
        var readCompleteCallback = function(err, data) {
            var text,
                builder,
                filename,
                filemode = 33188; // 0644

            if (err) return processCompleteCallback( err );

            log.info( templateFile );

            try {
                builder = dash.template( data.toString() );
                text = builder( { config:config } );

                // TODO now convert <!% and %!> to <% and %>
                if (text.indexOf('<!%') > 0) {
                    text = text.replace( /<!%/g, '<%');
                    text = text.replace( /%!>/g, '%>');
                }

                log.debug( text );

                // pull the file name from template file
                filename = templateFile.split( config.template )[1].substr(1);

                if (!config.fileList) {
                    config.fileList = [];
                }

                config.fileList.push( filename );

                if (tar) {
                    if (filename.indexOf('bin') === 0) {
                        filemode = 33261;
                    }

                    tar.append( text, {
                        name:config.projectName + '/' + filename,
                        mode:filemode
                    } );
                }
            } catch (e) {
                err = e;
                log.error( e );
            }

            processCompleteCallback( err, text );
        };

        fs.readFile(templateFile, readCompleteCallback);
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
        if (!config.fileList) {
            config.fileList = [];
        }

        if (archiver && conf.targetFile) {
            config.tarfile = path.join( targetFolder, conf.targetFile );
            tar = archiver.createArchive( config.tarfile, function() {
                log.info('archive closed, file: ', config.tarfile );
                generationCompleteCallback( null, config );
            });
        }

        // set the instance varible to enable callback from any point
        generationCompleteCallback = completeCallback;

        // TODO this should be a public method that writes the output archive file
        var loopCompleteCallback = function(err) {
            if (tar) {
                tar.finalize();
                process.nextTick(function() {
                    tar = null;
                });
            } else {
                generationCompleteCallback( err, config );
            }
        };

        async.eachLimit( templateFiles, 6, delegate.processFile, loopCompleteCallback );
    };

    // constructor validations
    if (!log) throw new Error("delegate must be constructed with a log");
    if (!archiver) throw new Error("delegate must be constructed with a file archiver");
    if (!targetFolder) throw new Error('delegate must be constructed with a target folder');
};

module.exports = CodeGenerator;
