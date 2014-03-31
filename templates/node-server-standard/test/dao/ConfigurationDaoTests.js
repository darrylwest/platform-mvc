/**
 * @class ConfigurationDaoTests
 * @classdef test configurations for various environments
 *
 * @author: <%= config.authorName %>
 * @created: <%= config.dateCreated %>
 */
var should = require('chai').should(),
    MockLogManager = require('node-commons' ).mocks.MockLogManager,
    DataSourceFactory = require('node-commons' ).controllers.DataSourceFactory,
    MockMySql = require('node-commons' ).mocks.MockMySql,
    DataModelCache = require('node-commons' ).delegates.DataModelCache,
    Dataset = require( "../fixtures/ConfigurationDataset" ),
    Config = require('../../app/controllers/Config' ),
    ConfigurationDao = require('../../app/dao/ConfigurationDao');

describe('ConfigurationDao', function() {
    'use strict';

    var dataset = new Dataset(),
        mysql = new MockMySql(),
        logManager = new MockLogManager(),
        cache = null,
        createCache,
        createOptions;

    createCache = function() {
        var opts = {};
        opts.log = logManager.createLogger( 'ConfigurationDao' );
        cache = new DataModelCache( opts );

        return cache;
    };

    createOptions = function() {
        var opts = {};

        opts.log = logManager.createLogger( 'ConfigurationDao' );
        opts.cache = createCache();

        return opts;
    };

    describe("#instance", function() {
        it("should be an instance of ConfigurationDao", function() {
            var dao = new ConfigurationDao( createOptions() );

            should.exist( dao );
            dao.should.be.instanceof( ConfigurationDao );
        });
    });

    describe("find", function() {
        it("should fetch a known cached model", function(done) {
            var dao = new ConfigurationDao( createOptions() );
            var pool = mysql.createPool();

            var configuration = dataset.createModel();
            cache.update( configuration );

            var callback = function(err, model) {
                should.not.exist( err );
                should.exist( model );

                model.id.should.equal( configuration.id );

                done();
            };

            pool.getConnection(function(err, connection) {
                // create an alternate response
                connection.expectedResults.push( dataset.createModel() );

                dao.findById( connection, configuration.id, callback );
            });
        });

        it("should fetch and cache a known non-cached model", function(done) {
            var dao = new ConfigurationDao( createOptions() );
            var pool = mysql.createPool();

            var configuration = dataset.createModel();
            var count = cache.size();
            count.should.equal( 0 );

            var callback = function(err, model) {
                // console.log( logManager.getBuffer() );

                should.not.exist( err );
                should.exist( model );

                model.id.should.equal( configuration.id );

                // console.log( 'cache size: ', cache.size() );
                cache.size().should.equal( count + 1 );

                done();
            };

            pool.getConnection(function(err, connection) {
                connection.expectedResults.push([ configuration ]);

                dao.findById( connection, configuration.id, callback );
            });
        });
    });

    describe("insert", function() {
        it("should insert a new model", function(done) {
            var dao = new ConfigurationDao( createOptions() );
            var pool = mysql.createPool();

            var configuration = dataset.createModel();
            var count = cache.size();

            var callback = function(err, model) {
                should.not.exist( err );
                // console.log( model );

                should.exist( model );

                model.id.should.equal( configuration.id );

                cache.size().should.equal( count + 1 );

                done();
            };

            pool.getConnection(function(err, connection) {
                connection.expectedResults.push( { rowsAffected:1 } );

                dao.insert( connection, configuration, callback );
            });
        });
    });

    describe("update", function() {
        it("should modify an existing model", function(done) {
            var dao = new ConfigurationDao( createOptions() );
            var pool = mysql.createPool();

            var configuration = dataset.createModel();

            cache.update( configuration );
            cache.size().should.equal( 1 );

            var callback = function(err, model) {
                should.not.exist( err );
                should.exist( model );

                cache.size().should.equal( 1 );

                done();
            };

            pool.getConnection(function(err, connection) {
                var model = Object.create( configuration );
                connection.expectedResults.push( { rowsAffected:1 } );

                dao.update( connection, configuration, callback );
            });
        });
    });
});
