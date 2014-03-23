/**
 * @class Configuration
 * @classdesc data model to contain a configuration setting
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: <%= config.dateCreated %>
 */
var AbstractBaseModel = require("node-commons" ).models.AbstractBaseModel;

var Configuration = function(params) {
    'use strict';
    if (!params) params = {};

    AbstractBaseModel.extend( this, params );

    this.attributes = params.attributes;
};

module.exports = Configuration;