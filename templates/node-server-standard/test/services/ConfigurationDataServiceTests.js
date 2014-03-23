/**
 * @class ConfigurationDataServiceTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/22/14 11:55 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockDataSourceFactory = require('node-commons' ).mocks.MockDataSourceFactory,
    MockLogManager = require('node-commons' ).mocks.MockLogManager,
    MockMySql = require('node-commons' ).mocks.MockMySql,
    Config = require('../../app/controllers/Config' ),
    DataModelCache = require('node-commons' ).delegates.DataModelCache,
    Dataset = require( "../fixtures/ConfigurationDataset" ),
    ServiceFactory = require('../../app/controllers/ServiceFactory' ),
    ConfigurationDao = require('../../app/dao/ConfigurationDao' ),
    ConfigurationDataService = require('../../app/services/ConfigurationDataService');

describe( 'ConfigurationDataService', function() {
    'use strict';

    var logManager = new MockLogManager(),
        dataset = new Dataset(),
        mysql = null,
        cache;

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


        opts.log = logManager.createLogger('ServiceManager');
        opts.logManager = logManager;
        opts.dataSourceFactory = new MockDataSourceFactory( { mysql:mysql });
        opts.configurationDao = createConfigurationDao();

        var factory = new ServiceFactory( opts );

        var service = factory.createConfigurationDataService();

        return service;
    };

    describe( '#instance', function() {
        var service = createDataService(),
            methods = [
                'query',
                'find',
                'save',
                // inherited
                'getPooledConnection',
                'parseInt'
            ];

        it('should create an instance of ConfigurationDataService', function() {
            should.exist( service );
            service.should.be.instanceof( ConfigurationDataService );
        });

        it('should have all known methods by size', function() {
            // console.log( dash.methods( service ));
            dash.methods( service ).length.should.equal( methods.length );
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

    describe('query', function() {
        it('should find a known set of configurations', function(done) {
            var service = createDataService(),
                configurations = dataset.createModelList(3, dataset.createModel);

            // override getPooledConnection to return a prepared connection with the results
            service.getPooledConnection = function(callback) {
                // console.log('create the mock connection');

                var connection = mysql.createConnection();
                connection.expectedResults.push( configurations );

                callback(null, connection);
            };

            var callback = function(err, list) {
                should.not.exist( err );
                should.exist( list );

                list.length.should.equal( 3 );

                done();
            };

            service.query({}, callback);
        });
    });

    describe( 'find', function() {
        it('should find a known configuration', function(done) {
            var service = createDataService(),
                configuration = dataset.createModel();

            cache.update( configuration );

            var callback = function(err, model) {
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
                should.not.exist( err );

                // model not found
                should.not.exist( model );

                done();
            };

            var params = { id:"12345" };
            service.find( params, callback );
        });
    });

    describe( 'save', function() {
        var params = dataset.createModelParams();

        it("should insert a new configuration model", function(done) {
            var service = createDataService(),
                count = cache.size();

            var callback = function(err, model) {
                should.not.exist( err );
                should.exist( model );

                model.id.should.equal( params.id );

                cache.size().should.equal( count + 1 );

                done();
            };

            service.save( params, callback );
        });

        it('should update an existing configuration model', function(done) {
            var service = createDataService(),
                count;

            cache.update( params );
            count = cache.size();

            var callback = function(err, model) {
                should.not.exist( err );
                should.exist( model );

                model.id.should.equal( params.id );

                cache.size().should.equal( count );

                done();
            };

            service.save( params, callback );
        });
    });
});
