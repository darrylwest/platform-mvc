/**
 * @class FileWalker
 * @classdesc given a start folder, walk the entire tree and return all regular files
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/24/14 3:48 PM
 */
var dash = require('lodash' ),
    path = require('path' ),
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
            dirs = [],
            currentDir = start,
            readDirCallback,
            readNextDir;

        readNextDir = function(results, completeCallback) {
            results.files.forEach(function(file) {
                files.push( file );
            });

            if (results.dirs.length > 0) {
                results.dirs.forEach(function(dir) {
                    dirs.push( dir );
                });
            }

            if (dirs.length > 0) {
                currentDir = dirs.pop();
                fs.readdir( currentDir, readDirCallback );
            } else {
                return completeCallback( null, files );
            }
        };

        readDirCallback = function(err, files) {
            if (err) return readCompleteCallback( err );

            var fileList = [],
                dirList = [];

            files.forEach(function(name) {
                var fullPath = path.join( currentDir, name );
                if (fs.statSync( fullPath ).isDirectory()) {
                    dirList.push( fullPath );
                } else {
                    fileList.push( fullPath );
                }
            });

            readNextDir( { dirs:dirList, files:fileList }, readCompleteCallback );
        };

        fs.readdir( currentDir, readDirCallback );
    };

    // constructor validations
    if (!log) throw new Error("delegate must be constructed with a log");
};

module.exports = FileWalker;