/**
 * @class CodeGenerator
 * @classdesc
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/26/14
 */
var dash = require('lodash'),
    uuid = require('node-uuid');

/**
 * @param options
 * @constructor
 */
var CodeGenerator = function(options) {
    'use strict';

    var delegate = this,
        log = options.log,
        fileWalker = options.fileWalker,
        id = uuid.v4();

    this.getId = function() {
        return id;
    };

    this.createInstance = function() {
        log.info('clone and return a new generator instance');
        var generator = new CodeGenerator( options );

        return generator;
    };

    this.generateCode = function(config, templateFiles, completeCallback) {

        config.fileList = templateFiles;

        completeCallback(null, config);
    };

    // constructor validations
    if (!log) throw new Error("delegate must be constructed with a log");
};

module.exports = CodeGenerator;
