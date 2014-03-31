/**
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/30/14
 */
var dash = require('lodash');

var MockFileArchiver = function() {
    'use strict';

    var mock = this;

    var Archive = function(closeHandler) {
        var archive = this;

        var files = [];

        this.pipe = function() {
            return archive;
        };

        archive.on = function(fn) {

        };

        this.append = function(type, obj) {
            files.push( obj.name );
        };

        this.finalize = function() {
            dash.defer( closeHandler );
        };
    };

    this.createArchive = function(filepath, closeHandler, errorHandler) {
        var archive = new Archive(closeHandler);

        return archive;
    };
};

module.exports = MockFileArchiver;