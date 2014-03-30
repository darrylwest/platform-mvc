/**
 * @class FileArchiver
 * @classdesc write strings, files and streams to a tar/gz output file.
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

    /**
     * create a new tar.gz output file.
     *
     * @example
     *  var tar = archiver.createArchive('myfile.tar.gz', closeCallback);
     *
     *  tar.append('my string', { name:'string-text.txt' });
     *  tar.append( myFile, { name:'myfile' });
     *  tar.append( myStream, { name:'mystream.out' });
     *
     *  tar.finalize();
     *
     * @param filepath - a valid file name for this new archive (required)
     * @param closeHandler - callback when file closes (required)
     * @param errorHandler - optional error handler; if undefined then errors throw
     * @returns the archive
     */
    this.createArchive = function(filepath, closeHandler, errorHandler) {
        if (!filepath) throw new Error('createArchive requires a valid output file path');
        if (!closeHandler) throw new Error('createArchive requires a close callback function');
        
        log.info('create the tar gz archive for file: ', filepath);

        var archive = archiver('tar'),
            gzipper = zlib.createGzip(),
            output = fs.createWriteStream( filepath );

        archive.pipe( gzipper ).pipe( output );

        if (closeHandler) {
            output.on('close', closeHandler );
        }

        if (errorHandler && typeof errorHandler === 'function') {
            archive.on('error', errorHandler);
        } else {
            archive.on('err', delegate.errorHandler);
        }

        return archive;
    };

    /**
     * default error handler--throws error; you can override this with a better handler
     * or pass a third argument to createArchive
     *
     * @param err - error from archive
     */
    this.errorHandler = function(err) {
        log.error( err );
        throw err;
    };
};

module.exports = FileArchiver;
