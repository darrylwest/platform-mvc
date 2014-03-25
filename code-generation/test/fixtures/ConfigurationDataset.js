/**
 * @class ConfigurationDataset
 * @classdesc dataset to support configuration tests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 3/22/14 11:56 AM
 */
var TestDataset = require("node-commons").fixtures.TestDataset,
    Configuration = require("../../app/models/Configuration" );

var ConfigurationDataset = function() {
    "use strict";

    var dataset = this;

    TestDataset.extend( this );

    this.createModelParams = function() {
        var obj = dataset.createBaseModelParams();

        obj.attributes = JSON.stringify( dataset.createAttributes() );

        return obj;
    };

    this.createAttributes = function() {
        var attrs = {
            configVersion:'1.0',
            name:'Basic Configuration'
        };

        return attrs;
    };

    this.createModel = function() {
        var params = dataset.createModelParams();

        var configuration = new Configuration( params );
        configuration.attributes = JSON.parse( configuration.attributes );

        return configuration;
    };

};

module.exports = ConfigurationDataset;
