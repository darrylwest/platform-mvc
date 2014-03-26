/**
 * @class CodeGenerator
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/26/14
 */
var dash = require('lodash' );

var CodeGenerator = function(options) {
    'use strict';

    var generator = this,
        log = options.log,
        fileWalker = options.fileWalker;

    this.generateCode = function(config, templateFiles, completeCallback) {

        var obj = {
            "distributionFile":config.targetOutputFile,
            "fileList":templateFiles
        };

        completeCallback(null, obj);
    };

    // constructor validations
    if (!log) throw new Error("delegate must be constructed with a log");
};

module.exports = CodeGenerator;
