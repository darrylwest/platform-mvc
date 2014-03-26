/**
 * @class FileWalker
 * @classdesc given a start folder, walk the entire tree and return all regular files
 *
 * TODO: replace with evented findit module
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/24/14 3:48 PM
 */
var dash = require('lodash' ),
    path = require('path' ),
    findit = require('findit' ),
    fs = require('fs');

var FileWalker = function(options) {
    'use strict';

    var walker = this,
        log = options.log;

    /**
     * @desc read all files under the start folder
     *
     * @param start - the top-level folder
     * @param readCompleteCallback (err, files)
     */
    this.readFiles = function(start, readCompleteCallback) {
        log.info('read files in folder: ', start);

        var files = [],
            dirExistsCallback;

        dirExistsCallback = function(err, stats) {
            if (err) return readCompleteCallback( err );

            var finder = walker.createFinder( start );

            finder.on('file', function(file, stat) {
                files.push( file );
            });

            finder.on('end', function() {
                readCompleteCallback( null, files );
            });

        };

        fs.lstat( start, dirExistsCallback );
    };

    /**
     * @desc create a finder object
     * @param dir - the start folder (can be a symbolic link but it must be a folder)
     * @param opts - optional
     * @returns the find (findit) object
     */
    this.createFinder = function(dir, opts) {
        if (!opts) opts = walker.createFindOptions();

        return findit( dir, opts );
    };

    /**
     * @desc create the finder options
     * @returns the default finder options
     */
    this.createFindOptions = function() {
        var opts = {
            followSymlinks:true
        };

        return opts;
    };

    // constructor validations
    if (!log) throw new Error("delegate must be constructed with a log");
};

module.exports = FileWalker;