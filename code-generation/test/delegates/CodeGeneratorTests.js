/**
 * @class CodeGeneratorTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/26/14
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogManager = require('node-commons' ).mocks.MockLogManager,
    MockDataSourceFactory = require('node-commons' ).mocks.MockDataSourceFactory,
    Config = require('../../app/controllers/Config' ),
    FileWalker = require('../../app/delegates/FileWalker'),
    CodeGenerator = require('../../app/delegates/CodeGenerator');

describe('CodeGenerator', function() {
    'use strict';

    var logManager = new MockLogManager(),
        createOptions;

    createOptions = function() {
        var opts = Config.test();

        opts.log = logManager.createLogger('CodeGenerator');
        opts.fileWalker = new FileWalker( opts );

        return opts;
    };

    describe('#instance', function() {
        var generator = new CodeGenerator( createOptions()),
            methods = [
                'generateCode'
            ];

        it('should create an instance of CodeGenerator', function() {
            should.exist( generator );
            generator.should.be.instanceof( CodeGenerator );
        });

        it('should have all expected methods by size', function() {
            dash.methods( generator ).length.should.equal( methods.length );
        });
    });
});
