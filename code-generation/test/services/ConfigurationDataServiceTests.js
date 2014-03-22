/**
 * ConfigurationDataServiceTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/22/14 11:55 AM
 */
var should = require('chai').should(),
    MockDataSourceFactory = require('node-commons' ).mocks.MockDataSourceFactory,
    MockLogManager = require('node-commons' ).mocks.MockLogManager,
    MockMySql = require('node-commons' ).mocks.MockMySql,
    Config = require('../../app/controllers/Config' ),
    DataModelCache = require('node-commons' ).delegates.DataModelCache,
    Dataset = require( "../fixtures/ConfigurationDataset" ),
    ApplicationFactory = require('../../app/controllers/ApplicationFactory' ),
    ConfigurationDao = require('../../app/dao/ConfigurationDao' ),
    ConfigurationDataService = require('../../app/services/ConfigurationDataService');

describe( 'ConfigurationDataService', function() {
    'use strict';

    var logManager = new MockLogManager();
    var dataset = new Dataset();
    var mysql = null;
    var cache;

    var createCache = function() {
        var opts = {};
        opts.log = logManager.createLogger( 'DataModelCache' );
        cache = new DataModelCache( opts );

        return cache;
    };

    var createConfigurationDao = function() {
        var opts = {};

        opts.log = logManager.createLogger( 'ConfigurationDao' );
        opts.cache = createCache();

        return new ConfigurationDao( opts );
    };

    var createDataService = function() {
        mysql = new MockMySql();
        var opts = Config.test();


        opts.dataSourceFactory = new MockDataSourceFactory( { mysql:mysql });
        opts.configurationDao = createConfigurationDao();

        var applicationFactory = new ApplicationFactory( opts );

        var service = applicationFactory.createConfigurationDataService();

        return service;
    };

    describe( '#instance', function() {
        it('should create an instance of ConfigurationDataService', function() {
            var service = createDataService();

            should.exist( service );
            service.should.be.instanceof( ConfigurationDataService );
        });
    });

    describe( 'getPooledConnection', function() {
        it("should return a connection from the pool", function(done) {
            var service = createDataService();

            var callback = function(err, connection) {
                should.not.exist( err );
                should.exist( connection );

                done();
            };

            service.getPooledConnection( callback );
        });
    });

    describe( 'find', function() {
        it("should find a known configuration", function(done) {
            var service = createDataService();
            var configuration = dataset.createModel();

            cache.update( configuration );

            var callback = function(err, model) {
                // console.log( logManager.getBuffer() );

                should.not.exist( err );
                should.exist( model );

                model.id.should.equal( configuration.id );

                done();
            };

            var id = configuration.id;
            service.find( id, callback );
        });

        it("should try to find a configuration", function(done) {
            var service = createDataService();

            var callback = function(err, model) {
                // console.log( logManager.getBuffer() );

                should.not.exist( err );

                done();
            };

            var params = { id:"12345" };
            service.find( params, callback );
        });
    });

    describe( 'save', function() {
        it("should insert a new configuration model", function(done) {
            var service = createDataService();
            var params = dataset.createModelParams();

            var count = cache.size();

            var callback = function(err, model) {
                // console.log( logManager.getBuffer() );

                // should.not.exist( err );
                // should.exist( model );

                // model.id.should.equal( params.id );

                done();
            };

            service.save( params, callback );
        });
    });
});
