/**
 * @class CodeWebServiceTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/23/14 2:05 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogManager = require('node-commons' ).mocks.MockLogManager,
    MockDataSourceFactory = require('node-commons' ).mocks.MockDataSourceFactory,
    CodeDataService = require('../../app/services/CodeDataService' ),
    Config = require('../../app/controllers/Config' ),
    FileWalker = require('../../app/delegates/FileWalker'),
    MockFileArchiver = require('../mocks/MockFileArchiver'),
    CodeGenerator = require('../../app/delegates/CodeGenerator'),
    CodeWebService = require('../../app/services/CodeWebService');

describe('CodeWebService', function() {
    'use strict';

    var logManager = new MockLogManager(),
        createDataService,
        createOptions;

    createDataService = function() {
        var opts = Config.test();

        opts.log = logManager.createLogger('CodeDataService');
        opts.fileWalker = new FileWalker( opts );
        opts.fileArchiver = new MockFileArchiver( opts );

        opts.codeGenerator = new CodeGenerator( opts );

        return new CodeDataService( opts );
    };

    createOptions = function() {
        var opts = Config.test();

        opts.log = logManager.createLogger('CodeWebService');
        opts.dataService = createDataService();

        return opts;
    };

    describe('#instance', function() {
        var service = new CodeWebService( createOptions() ),
            methods = [
                'generateCode',
                // inherited
                'createFailedResponse',
                'createListPayload',
                'createModelPayload',
                'createSuccessResponse',
                'findIPAddress'
            ];

        it('should create an instance of CodeWebService', function() {
            should.exist( service );
            service.should.be.instanceof( CodeWebService );
        });

        it('should have all known methods by size', function() {
            // console.log( dash.methods( service ));
            dash.methods( service ).length.should.equal( methods.length );
        });
    });
});
