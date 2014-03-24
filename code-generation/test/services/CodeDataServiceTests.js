/**
 * @class CodeDataServiceTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/23/14 2:19 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogManager = require('node-commons' ).mocks.MockLogManager,
    MockDataSourceFactory = require('node-commons' ).mocks.MockDataSourceFactory,
    Config = require('../../app/controllers/Config' ),
    CodeDataService = require('../../app/services/CodeDataService');

describe('CodeDataService', function() {
    'use strict';

    var logManager = new MockLogManager(),
        createOptions;

    createOptions = function() {
        var opts = Config.test();

        opts.log = logManager.createLogger('CodeDataService');

        return opts;
    };

    describe('#instance', function() {
        var service = new CodeDataService( createOptions() ),
            methods = [
                'generateCode',
                // inherited
                'getPooledConnection',
                'parseInt'
            ];

        it('should be an instance of CodeDataService', function() {
            should.exist( service );
            service.should.be.instanceof( CodeDataService );
        });
    });
});