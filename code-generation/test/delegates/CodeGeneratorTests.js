/**
 * @class CodeGeneratorTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/26/14
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    Dataset = require('../fixtures/CodeGeneratorDataset'),
    MockLogManager = require('node-commons' ).mocks.MockLogManager,
    MockDataSourceFactory = require('node-commons' ).mocks.MockDataSourceFactory,
    MockFileArchiver = require('../mocks/MockFileArchiver'),
    Config = require('../../app/controllers/Config' ),
    CodeGenerator = require('../../app/delegates/CodeGenerator');

describe('CodeGenerator', function() {
    'use strict';

    var logManager = new MockLogManager(),
        dataset = new Dataset(),
        createOptions;

    createOptions = function() {
        var opts = Config.test();

        opts.log = logManager.createLogger('CodeGenerator');
        opts.fileArchiver = new MockFileArchiver( opts );

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

        it('should have all expected methods by size and name', function() {
            dash.methods( generator ).length.should.equal( methods.length );

            methods.forEach(function(method) {
                generator[ method ].should.be.a( 'function' );
            });
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
            var config = dataset.createValidCodeConfig(),
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
            options.config = dataset.createValidCodeConfig();
            delegate = new CodeGenerator( options );

            var callback = function(err, text) {
                should.not.exist( err );

                // console.log( text );
                should.exist( text );

                var keys = [
                    options.config.projectName,
                    options.config.dateCreated,
                    options.config.authorName
                ];

                keys.forEach( function( key ) {
                    // console.log( key );
                    text.indexOf( key ).should.be.above( 1 );
                });

                // test the post process
                text.indexOf( '<%' ).should.be.above( 1 );
                text.indexOf( '%>' ).should.be.above( 1 );

                done();
            };

            var file = options.templateFolder + '/node-server-standard/Gruntfile.js';

            delegate.processFile( file, callback );
        });
    });
});
