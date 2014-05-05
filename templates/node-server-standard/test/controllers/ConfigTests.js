/**
 * @class ConfigTests
 *
 * @author: <%= config.authorName %>
 * @created: <%= config.dateCreated %>
 */
var should = require('chai').should(),
    Config = require('../../app/controllers/Config');

describe( 'Config', function() {
    'use strict';

    var port = <%= config.port %>;

    describe( '#instance', function() {
        it( 'should be instance of Config', function() {
            var opts = {
                env:'test',
                logfile:'nada',
                keys:'my keys',
                database:'my database'
            };
            var config = new Config( opts );

            should.exist( config );
            config.should.be.instanceof( Config );

            // test for the standard properties
            var props = [
                'version',
                'environment',
                'apptitle',
                'consoleLogLevel',
                'fileLogLevel',
                'logfile',
                'baseURI',
                'port',
                'keys',
                'database'
            ];

            props.forEach(function( prop ) {
                config.should.have.property( prop );
                should.exist( config[ prop ] );
            });

        });
    });

    describe( 'statics', function() {
        it( 'should have static constructor methods', function() {
            var statics = [ 'development', 'test', 'production' ];
            statics.forEach(function( env ) {
                Config[ env ].should.be.a('function');
            });
        });
    });

    describe( 'development', function() {
        it( 'should be configured for development', function() {
            var opts = { logfile:'mylogfile.log' };

            var config = Config.development( opts );

            should.exist( config );
            config.environment.should.equal( 'development' );

            config.port.should.equal( port );
        });
    });

    describe( 'test', function() {
        it( 'should be configured for test', function() {
            var opts = { logfile:'mylogfile.log' };

            var config = Config.test( opts );

            should.exist( config );
            config.environment.should.equal( 'test' );
            config.port.should.equal( port );
        });
    });

    describe( 'production', function() {
        it( 'should be configured for production', function() {
            var opts = { logfile:'mylogfile.log' };

            var config = Config.production( opts );

            should.exist( config );
            config.environment.should.equal( 'production' );
            config.port.should.equal( port );
        });
    });
});

