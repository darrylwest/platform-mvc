/**
 * @class ServiceFactoryTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/23/14 9:52 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogManager = require('node-commons' ).mocks.MockLogManager,
    MockDataSourceFactory = require('node-commons' ).mocks.MockDataSourceFactory,
    Config = require('../../app/controllers/Config' ),
    ServiceFactory = require('../../app/controllers/ServiceFactory' );

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
                'createConfigurationWebService',
                'createConfigurationDataService',
                'createConfigurationDao'
            ];

        it('should create an instance of ServiceFactory', function() {
            should.exist( factory );

            factory.should.be.instanceof( ServiceFactory );
        });

        it('should have all expected methods by size', function() {
            dash.methods( factory ).length.should.equal( methods.length );
        });
    });

    describe('#Configuration', function() {
        it('should create configuration dao');
        it('should create configuration data service');
        it('should create configuration web service');
    });
});