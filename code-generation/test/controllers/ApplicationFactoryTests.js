/**
 * @class ApplicationFactoryTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/22/14 7:07 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogManager = require('node-commons' ).mocks.MockLogManager,
    MockDataSourceFactory = require('node-commons' ).mocks.MockDataSourceFactory,
    Config = require('../../app/controllers/Config' ),
    ApplicationFactory = require('../../app/controllers/ApplicationFactory' ),
    ServiceFactory = require('../../app/controllers/ServiceFactory' );

describe('ApplicationFactory', function() {
    'use strict';

    var createOptions = function() {
        var opts = Config.test();

        opts.logManager = new MockLogManager();

        return opts;
    };

    describe('#instance', function() {
        var factory = new ApplicationFactory( createOptions() ),
            methods = [
                'createServiceFactory',
                'createDataSourceFactory',
                'createWebServices',
                'startWebApplication',
                // inherited methods
                'addService',
                'assignRoutes',
                'createIndexPageService',
                'createLogManager',
                'createLogger',
                'createMiddlewareDelegate',
                'createRoutePath',
                'createValidator',
                'createWebServices',
                'createWebStatusService',
                'findService',
                'getConfiguration',
                'getServiceCount',
                'getServices'
            ];

        it('should create an instance of ApplicationFactory', function() {
            should.exist( factory );

            factory.should.be.instanceof( ApplicationFactory );
        });

        it('should have all expected methods by size', function() {
            dash.methods( factory ).length.should.equal( methods.length );
        });

        it('should execute all known methods', function() {
            var obj;

            methods.forEach(function(method) {
                if (method === 'createRoutePath') {
                    obj = factory.createRoutePath('this', 'that');
                    should.exist( obj );
                } else if (method.indexOf('create') === 0) {
                    obj = factory[ method ]();
                    should.exist( obj );
                } else if (method.indexOf('get') === 0) {
                    factory[ method ]();
                }
            });
        });
    });

    describe('createServiceFactory', function() {

        it('should create a service factory', function() {
            var factory,
                serviceFactory,
                opts = createOptions();

            opts.dataSourceFactory = new MockDataSourceFactory();
            factory = new ApplicationFactory( opts );

            serviceFactory = factory.createServiceFactory();
            should.exist( serviceFactory );
            serviceFactory.should.be.instanceof( ServiceFactory );
        });
    });
});