/**
 * @class Config
 * @classdesc start up configurations for various environments
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/22/14 8:19 AM
 */
var VERSION = '00.90.001-18103';

var externalConfig,
    path = require('path');

/**
 * @param options
 * @constructor
 */
var Config = function(options) {
    "use strict";

    if (!options) options = {};

    this.version = VERSION;

    if (options.configfile) {
        externalConfig = require( options.configfile );
    } else {
        externalConfig = require( '../../config.json' );
    }

    // set the command line arg/defaults
    this.environment = options.env;

    this.appkey = '81c0cb50-7023-438d-b001-be4748001b55';

    // log settings
    this.consoleLogLevel = options.consoleLogLevel || 'info';
    this.fileLogLevel = options.fileLogLevel || 'info';
    this.logfile = options.logfile;

    this.apptitle = 'MVC Code Generation';
    this.copyright = 'Rain City Software, 2014';

    this.baseURI = '/CodeGenerationService';

    this.port = 14060;

    // db and aws keys, if supplied
    this.keys = externalConfig.keys;
    this.database = externalConfig.database;

    this.templateFolder = path.join( __dirname, '/../../../templates' );
    this.targetFolder = path.join( __dirname, '/../../../build' );
};

Config.development = function(opts) {
    "use strict";
    if (!opts) opts = {};
    opts.env = 'development';
    var config = new Config( opts );

    // log settings
    config.consoleLogLevel = 'info';
    config.fileLogLevel = 'info';

    return config;
};

Config.test = function(opts) {
    "use strict";
    if (!opts) opts = {};
    opts.env = 'test';

    var config = new Config( opts );

    // log settings dumb'd down for tests
    config.consoleLogLevel = 'error';
    config.fileLogLevel = 'info';
    config.filename = '/tmp/mvc-debug.log';

    return config;
};

Config.production = function(opts) {
    "use strict";
    opts.env = 'production';
    var config = new Config( opts );

    // log settings
    config.consoleLogLevel = 'none';
    config.fileLogLevel = 'info';

    return config;
};

Config.VERSION = VERSION;

module.exports = Config;

