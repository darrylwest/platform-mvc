/**
 * @class ConfigurationDao
 * @classdesc extends AbstractBaseDao to enable list, query, insert, update, etc
 *
 * @author: <%= config.authorName %>
 * @created: <%= config.dateCreated %>
 */
var AbstractBaseDao = require( "node-commons" ).dao.AbstractBaseDao;

/**
 * @param options - must supply a log
 * @constructor
 */
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
