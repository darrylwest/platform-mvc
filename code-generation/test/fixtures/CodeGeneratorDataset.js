/**
 * @class CodeGeneratorDataset
 * @classdesc dataset with various config settings for known template sets
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/30/14
 */
var casual = require('casual');

/* jshint -W106 */ // ignore required for casual underscores

/**
 * @constructor
 */
var CodeGeneratorDataset = function() {
    'use strict';

    this.createValidCodeConfig = function() {
        var config = {};

        config.template = 'node-server-standard';
        config.projectName = casual.title.replace(/ /g, '-').toLowerCase;
        config.serviceName = casual.title.replace(/ /g, '') + 'Service';
        config.dateCreated = 'now';
        config.dateFormat = 'YYYY-MM-DD HH:mm';
        config.author = casual.email;
        config.copyright = '(c) YYYY ' + casual.company_name;

        return config;
    };

};

module.exports = CodeGeneratorDataset;