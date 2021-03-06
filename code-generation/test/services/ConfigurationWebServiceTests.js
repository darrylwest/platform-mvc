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
    MockDataSourceFactory = require('node-commons' ).mocks.MockDataSourceFactory,
    Config = require('../../app/controllers/Config' ),
    ServiceFactory = require('../../app/controllers/ServiceFactory' ),
    ConfigurationWebService = require('../../app/services/ConfigurationWebService');

describe( 'ConfigurationWebService', function() {
    'use strict';

    var logManager = new MockLogManager(),
        dataSourceFactory = new MockDataSourceFactory(),
        createWebService;

    createWebService = function() {
        var opts = Config.test();

        opts.log = logManager.createLogger('ServiceFactory');
        opts.logManager = logManager;
        opts.dataSourceFactory = dataSourceFactory;

        var factory = new ServiceFactory( opts );

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

