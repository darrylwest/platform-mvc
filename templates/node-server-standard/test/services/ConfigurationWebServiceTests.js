/**
 * @class ConfigurationWebServiceTests
 * @classdesc configuration tests for web services API
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/22/14 11:42 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
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
        var service = createWebService(),
            methods = [
                'query',
                'save',
                'find',
                // inherited
                'createFailedResponse',
                'createListPayload',
                'createModelPayload',
                'createSuccessResponse',
                'findIPAddress'
            ];

        it("should be and instance of ConfigurationWebService", function() {
            should.exist( service );

            service.find.should.be.a( 'function' );
        });

        it('should have all known methods by size', function() {
            // console.log( dash.methods( service ));
            dash.methods( service ).length.should.equal( methods.length );
        });

        it("should have the correct service identifier name", function() {
            should.exist( ConfigurationWebService.SERVICE_NAME );

            ConfigurationWebService.SERVICE_NAME.should.equal( 'ConfigurationWebService' );
        });
    });
});

