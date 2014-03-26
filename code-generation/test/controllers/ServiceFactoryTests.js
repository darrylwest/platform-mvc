/**
 * @class ServiceFactoryTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/23/14 9:52 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogManager = require('node-commons' ).mocks.MockLogManager,
    MockDataSourceFactory = require('node-commons' ).mocks.MockDataSourceFactory,
    Config = require('../../app/controllers/Config' ),
    ServiceFactory = require('../../app/controllers/ServiceFactory' ),
    ConfigurationWebService = require( '../../app/services/ConfigurationWebService' ),
    ConfigurationDataService = require( '../../app/services/ConfigurationDataService' ),
    ConfigurationDao = require( '../../app/dao/ConfigurationDao' );

describe('ServiceFactory', function() {
    'use strict';

    var logManager = new MockLogManager(),
        createOptions;

    createOptions = function() {
        var opts = Config.test();

        opts.log = logManager.createLogger('ServiceFactory');
        opts.logManager = logManager;
        opts.dataSourceFactory = new MockDataSourceFactory();

        return opts;
    };

    describe('#instance', function() {
        var factory = new ServiceFactory( createOptions() ),
            methods = [
                'createCodeWebService',
                'createCodeDataService',
                'createConfigurationWebService',
                'createConfigurationDataService',
                'createConfigurationDao',
                'createFileWalker',
                'createCodeGenerator'
            ];

        it('should create an instance of ServiceFactory', function() {
            should.exist( factory );

            factory.should.be.instanceof( ServiceFactory );
        });

        it('should have all expected methods by size', function() {
            dash.methods( factory ).length.should.equal( methods.length );
        });

        it('should execute all known methods', function() {
            var obj;
            methods.forEach(function(method) {
                obj = factory[ method ]();

                should.exist( obj );
            });
        });
    });

    describe('#Configuration', function() {
        it('should create configuration dao', function() {
            var serviceFactory = new ServiceFactory( createOptions() ),
                dao = serviceFactory.createConfigurationDao();

            should.exist( dao );
            dao.should.be.instanceof( ConfigurationDao );
        });

        it('should create configuration data service', function() {
            var serviceFactory = new ServiceFactory( createOptions() ),
                dataService = serviceFactory.createConfigurationDataService();

            should.exist( dataService );
            dataService.should.be.instanceof( ConfigurationDataService );
        });

        it('should create configuration web service', function() {
            var serviceFactory = new ServiceFactory( createOptions() ),
                webService = serviceFactory.createConfigurationWebService();

            should.exist( webService );
            webService.should.be.instanceof( ConfigurationWebService );
        });
    });
});
