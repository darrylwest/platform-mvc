/**
 * @class CodeGeneratorDataset
 * @classdesc dataset with various config settings for known template sets
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/30/14
 */
var casual = require('casual'),
    moment = require('moment'),
    uuid = require('node-uuid');

/* jshint -W106 */ // ignore required for casual underscores

/**
 * @constructor
 */
var CodeGeneratorDataset = function() {
    'use strict';

    var dataset = this;

    this.getKnownTemplate = function() {
        return 'node-server-standard';
    };

    this.createValidCodeConfig = function() {
        var config = dataset.createPartialCodeConfig();

        config.serviceName = casual.title.replace(/ /g, '') + 'Service';

        config.dateFormat = 'YYYY-MM-DD HH:mm';
        config.dateCreated = new moment().format( config.dateFormat );

        config.authorName = casual.email;
        config.copyright = '(c) YYYY ' + casual.company_name;

        config.targetFile = 'my-output-file.tar.gz';

        config.initialVersion = '09.01.000';
        config.projectDescription = casual.sentence;

        config.appkey = uuid.v4();
        config.port = 12345;

        return config;
    };

    this.createPartialCodeConfig = function() {
        var config = {};

        config.template = dataset.getKnownTemplate();
        config.projectName = casual.title.replace(/ /g, '-').toLowerCase();

        return config;
    };
};

module.exports = CodeGeneratorDataset;