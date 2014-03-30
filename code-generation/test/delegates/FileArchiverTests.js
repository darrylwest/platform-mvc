/**
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/30/14
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    fs = require('fs'),
    Dataset = require('../fixtures/CodeGeneratorDataset'),
    MockLogManager = require('node-commons' ).mocks.MockLogManager,
    Config = require('../../app/controllers/Config' ),
    FileArchiver = require('../../app/delegates/FileArchiver');

describe('FileArchiver', function() {
    'use strict';

    var logManager = new MockLogManager(),
        createOptions;

    createOptions = function() {
        var opts = Config.test();

        opts.log = logManager.createLogger('FileArchiver');


        return opts;
    };

    describe('#instance', function() {
        var archiver = new FileArchiver( createOptions()),
            methods = [
                'createArchive',
                'errorHandler'
            ];

        it('should create an instance of FileArchiver', function() {
            should.exist( archiver );
            archiver.should.be.instanceof( FileArchiver );
        });

        it('should have all known methods by size and name', function() {
            dash.methods( archiver ).length.should.equal( methods.length );

            methods.forEach(function(method) {
                archiver[ method ].should.be.a('function');
            });
        });
    });

    describe('createArchive', function() {
        var file = [ '/tmp/archive-', Date.now(), '-test.tar.gz' ].join(''),
            archiver = new FileArchiver( createOptions() );

        after(function() {
            // console.log('remove file: ', file);
            fs.unlink( file );
        });

        it('should create an archive for the given file', function(done) {
            var statsCallback,
                closeCallback,
                archive;

            statsCallback = function(err, stats) {
                should.not.exist( err );
                should.exist( stats );

                // console.log( stats );
                stats.size.should.be.above( 130 );

                done();
            };

            closeCallback = function() {
                fs.stat( file, statsCallback );
            };

            archive = archiver.createArchive( file, closeCallback );

            should.exist( archive );
            archive.append('this is a test', { name:'test-string.txt' });
            archive.finalize();

        });
    });
});
