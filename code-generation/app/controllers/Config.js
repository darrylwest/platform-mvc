/**
 * Config - start up configurations
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/22/14 8:19 AM
 */
var VERSION = '00.90.001-18101';

var Config = function(options) {
    "use strict";

    if (!options) options = {};

    this.version = VERSION;

    // set the command line arg/defaults
    this.environment = options.env;

    this.appkey = '81c0cb50-7023-438d-b001-be4748001b55';

    // log settings
    this.consoleLogLevel = options.consoleLogLevel || 'info';
    this.fileLogLevel = options.fileLogLevel || 'info';
    this.logfile = options.logfile;

    this.apptitle = 'MVC Code Generation';
    this.copyright = 'raincitysoftware, 2014';

    this.baseURI = '/CodeGenerationService';

    this.port = 14060;

    // db and aws keys, if supplied
    this.keys = options.keys;
    this.database = options.database;

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
    config.filename = '/tmp/ama-debug.log';

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
