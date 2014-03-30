/**
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/30/14
 */
var fs = require('fs'),
    archiver = require('archiver'),
    zlib = require('zlib');

var FileArchiver = function(options) {
    'use strict';

    var delegate = this,
        log = options.log;


    if (!log) throw new Error("data service must be constructed with a log");

    this.createArchive = function(filename) {
        log.info('create the tar gz archive for filename: ', filename);

        var archive = archiver('tar');

        return archive;
    };
};

module.exports = FileArchiver;
