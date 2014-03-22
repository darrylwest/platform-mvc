/**
 *
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/22/14 11:42 AM
 */
var should = require('chai').should(),
    MockLogManager = require('node-commons' ).mocks.MockLogManager,
    MockExpress = require('node-commons').mocks.MockExpress,
    DataSourceFactory = require('node-commons' ).controllers.DataSourceFactory,
    Config = require('../../app/controllers/Config' ),
    ApplicationFactory = require('../../app/controllers/ApplicationFactory' ),
    ConfigurationWebService = require('../../app/services/ConfigurationWebService');

describe( 'ConfigurationWebService', function() {
    'use strict';

    var logManager = new MockLogManager();

    var createMockDataSourceFactory = function() {
        var opts = Config.test();
        opts.log = logManager.createLogger('DataSourceFactory');

        return new DataSourceFactory( opts );
    };

    var createWebService = function() {
        var opts = Config.test();
        opts.dataSourceFactory = createMockDataSourceFactory();

        var factory = new ApplicationFactory( opts );
        factory.createLogManager();

        return factory.createConfigurationWebService();
    };

    describe( '#instance', function() {
        it("should be and instance of ConfigurationWebService", function() {
            var service = createWebService();
            should.exist( service );

            service.find.should.be.a( 'function' );
        });

        it("should have the correct service identifier name", function() {
            should.exist( ConfigurationWebService.SERVICE_NAME );

            ConfigurationWebService.SERVICE_NAME.should.equal( 'ConfigurationWebService' );
        });
    });
});

