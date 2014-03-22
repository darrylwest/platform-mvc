/**
 *
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/22/14 11:59 AM
 */
var AbstractBaseDao = require( "node-commons" ).dao.AbstractBaseDao;

var ConfigurationDao = function(options) {
    "use strict";

    var dao = this,
        log = options.log,
        cache = options.cache,
        table = 'Configuration';

    AbstractBaseDao.extend( this, options, table );

    this.initStatements = function() {
        log.info("initialize custom query statements");
    };

    // constructor validations
    if (!log) throw new Error("data access object must be constructed with a log");

    // initialize select, insert, update
    dao.initStatements();

};

module.exports = ConfigurationDao;