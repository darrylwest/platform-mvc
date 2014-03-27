/**
 * @class CodeGeneratorTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/26/14
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    Dataset = require('../fixtures/ConfigurationDataset'),
    MockLogManager = require('node-commons' ).mocks.MockLogManager,
    MockDataSourceFactory = require('node-commons' ).mocks.MockDataSourceFactory,
    Config = require('../../app/controllers/Config' ),
    FileWalker = require('../../app/delegates/FileWalker'),
    CodeGenerator = require('../../app/delegates/CodeGenerator');

describe('CodeGenerator', function() {
    'use strict';

    var logManager = new MockLogManager(),
        dataset = new Dataset(),
        createOptions;

    createOptions = function() {
        var opts = Config.test();

        opts.log = logManager.createLogger('CodeGenerator');
        opts.fileWalker = new FileWalker( opts );

        return opts;
    };

    describe('#instance', function() {
        var generator = new CodeGenerator( createOptions()),
            methods = [
                'createInstance',
                'getId',
                'processFile',
                'generateCode'
            ];

        it('should create an instance of CodeGenerator', function() {
            should.exist( generator );
            generator.should.be.instanceof( CodeGenerator );
        });

        it('should have all expected methods by size', function() {
            dash.methods( generator ).length.should.equal( methods.length );
        });
    });

    describe('createInstance', function() {
        var codeGenerator = new CodeGenerator( createOptions() );

        it('should create a clone of the instance', function() {
            var instance = codeGenerator.createInstance();

            should.exist( instance );
            instance.should.be.instanceof( CodeGenerator );

            // now set some instance variable and verify it doesn't affect the original
            instance.mytest = 'this is my test';
            should.not.exist( codeGenerator.mytest );

            codeGenerator.getId().should.not.equal( instance.getId() );
        });
    });

    describe('generateCode', function() {
        var delegate = new CodeGenerator( createOptions() );

        it('should simply return when file list is empty', function(done) {
            var config = dataset.createCodeConfig(),
                generator = delegate.createInstance(),
                files = [],
                callback;

            callback = function(err, results) {
                should.not.exist( err );
                should.exist( results );

                done();
            };

            generator.generateCode( config, files, callback );
        });
    });

    describe('processFile', function() {
        var options = createOptions(),
            delegate;

        // set the config...
        
        it('should process a known template file and return the results', function(done) {
            var callback = function(err, text) {
                should.not.exist( err );

                console.log( text );
                should.exist( text );

                done();
            };

            // TODO replace this with a known fixure file...
            var file = '/Users/dpw/roundpeg/platform-mvc/templates/node-server-standard/package.json';

            delegate.processFile( file, callback );
        });
    });
});
