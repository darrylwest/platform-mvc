/**
 * Configuration - data model to contain a configuration setting
 *
 * @author: darryl.west@roundpeg.com
 * @created: 3/22/14 11:57 AM
 */
var AbstractBaseModel = require("node-commons" ).models.AbstractBaseModel;

var Configuration = function(params) {
    'use strict';
    if (!params) params = {};

    AbstractBaseModel.extend( this, params );

    this.attributes = params.attributes;
};

module.exports = Configuration;