/**
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/30/14
 */
var should = require('chai').should(),
    dash = require('lodash' ),
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
                'createArchive'
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
});
