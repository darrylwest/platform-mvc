/**
 * @class Config
 * @classdesc start up configurations for various environments
 *
 * @author: <%= config.authorName %>
 * @created: <%= config.dateCreated %>
 */
var VERSION = '<%= config.initialVersion %>';

var externalConfig;

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

    this.appkey = '<%= config.appkey %>';

    // log settings
    this.consoleLogLevel = options.consoleLogLevel || 'info';
    this.fileLogLevel = options.fileLogLevel || 'info';
    this.logfile = options.logfile;

    this.apptitle = '<%= config.appTitle %>';
    this.copyright = '<%= config.copyright %>';

    this.baseURI = '/<%= config.serviceName %>';

    this.port = <%= config.port %>;

    // db and aws keys, if supplied
    this.keys = externalConfig.keys;
    this.database = externalConfig.database;

    if (process.env.HOME) {
        this.reportsFilePath = process.env.HOME + '/reports';
    } else {
        this.reportsFilePath = '/tmp';
    }
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

