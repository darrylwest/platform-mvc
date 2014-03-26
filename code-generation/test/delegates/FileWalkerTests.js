/**
 * @class FileWalkerTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/24/14 3:49 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    path = require('path' ),
    MockLogManager = require('node-commons' ).mocks.MockLogManager,
    Config = require('../../app/controllers/Config' ),
    FileWalker = require('../../app/delegates/FileWalker');

describe('FileWalker', function() {
    'use strict';

    var createOptions = function() {
        var opts = Config.test();

        opts.log = new MockLogManager().createLogger('FileWalker');

        return opts;
    };

    describe('#instance', function() {
        var walker = new FileWalker( createOptions() ),
            methods = [
                'readFiles',
                'createFinder',
                'createFindOptions'
            ];

        it('should create an instance of FileWalker', function() {
            should.exist( walker );
            walker.should.be.instanceof( FileWalker );
        });

        it('should have all expected methods by size', function() {
            dash.methods( walker ).length.should.equal( methods.length );
        });
    });

    describe('readFiles', function() {
        var options = createOptions(),
            walker = new FileWalker( options );

        it('should read all files under a known start folder', function(done) {
            var callback = function(err, files) {
                should.not.exist( err );
                should.exist( files );

                files.length.should.be.above( 30 );

                done();
            };

            walker.readFiles( path.join( options.templateFolder, 'node-server-standard'), callback );
        });
    });
});