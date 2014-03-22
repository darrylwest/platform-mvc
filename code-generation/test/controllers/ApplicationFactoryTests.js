/**
 * @class ApplicationFactoryTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/22/14 7:07 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    Config = require('../../app/controllers/Config' ),
    ApplicationFactory = require('../../app/controllers/ApplicationFactory' );

describe('ApplicationFactory', function() {
    'use strict';

    var createOptions = function() {
        var opts = Config.test();

        // logging...

        return opts;
    };

    describe('#instance', function() {
        var factory = new ApplicationFactory( createOptions() ),
            methods = [
                'createConfigurationWebService',
                'createConfigurationDataService',
                'createConfigurationDao',
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
    });
});