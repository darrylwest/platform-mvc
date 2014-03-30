/**
 * @class CodeDataServiceTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/23/14 2:19 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    Dataset = require('../fixtures/CodeGeneratorDataset'),
    MockLogManager = require('node-commons' ).mocks.MockLogManager,
    MockDataSourceFactory = require('node-commons' ).mocks.MockDataSourceFactory,
    Config = require('../../app/controllers/Config' ),
    FileWalker = require('../../app/delegates/FileWalker'),
    CodeGenerator = require('../../app/delegates/CodeGenerator'),
    CodeDataService = require('../../app/services/CodeDataService');

describe('CodeDataService', function() {
    'use strict';

    var logManager = new MockLogManager(),
        dataset = new Dataset(),
        createOptions;

    createOptions = function() {
        var opts = Config.test();

        opts.log = logManager.createLogger('CodeDataService');
        opts.fileWalker = new FileWalker( opts );
        opts.codeGenerator = new CodeGenerator( opts );

        return opts;
    };

    describe('#instance', function() {
        var service = new CodeDataService( createOptions() ),
            methods = [
                'generateCode',
                'parseConfig',
                // inherited
                'getPooledConnection',
                'parseInt'
            ];

        it('should be an instance of CodeDataService', function() {
            should.exist( service );
            service.should.be.instanceof( CodeDataService );
        });

        it('should have all known methods by size and name', function() {
            // console.log( dash.methods( service ));
            dash.methods( service ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                service[ method ].should.be.a( 'function' );
            });
        });
    });

    describe('parseConfig', function() {
        var service = new CodeDataService( createOptions()),
            keys = [
                'projectName',
                'serviceName',
                'dateFormat',
                'dateCreated',
                'authorName',
                'copyright',
                'targetFile'
            ];

        it('should parse the valid config file with correct settings', function() {
            var original = dataset.createValidCodeConfig(),
                json = JSON.stringify( original ),
                config = service.parseConfig( json );

            keys.forEach(function(key) {
                config[ key ].should.equal( original[ key ] );
            });

        });

        it('should parse a partial config file and supply default settings', function() {
            var original = dataset.createPartialCodeConfig(),
                json = JSON.stringify( original ),
                config = service.parseConfig( json );

            keys.forEach(function(key) {
                // config[ key ].should.equal( original[ key ] );
            });
        });

        it('should error if config file is not valid');
    });
});
