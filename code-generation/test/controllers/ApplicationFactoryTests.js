/**
 *
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/22/14 7:07 AM
 */
var should = require('chai').should(),
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
        var factory = new ApplicationFactory( createOptions() );

        it('should create an instance of ApplicationFactory', function() {
            should.exist( factory );

            factory.should.be.instanceof( ApplicationFactory );
        });
    });
});