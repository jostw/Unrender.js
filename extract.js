/**
 * Extract.js
 *
 * https://github.com/jostw/extract.js
 *
 * Copyright (c) 2014 jos
 * Licensed under the MIT license.
 */

"use strict";

(function() {
    var Extract = function(name) {
        this.name = name || "extract";
    };

    Extract.prototype.init = function(selector) {
        var query = document.querySelectorAll(selector +" [data-"+ this.name +"]"),

            i = 0,
            length = query.length,

            model = {};

        for( ; i < length; i++) {
            var item = query[i],

                key = item.attributes.getNamedItem("data-"+ this.name).value,
                value = item.tagName === "INPUT" ? item.value : item.innerHTML;

            model = this.extract(model, key, value);
        }

        return model;
    };


    Extract.prototype.extract = function(model, key, value) {
        var keys = key.split(".");

        if(keys.length > 1) {
            var _key = keys.splice(0, 1);

            model[_key] = this.extract(model[_key] || {}, keys.join("."), value);
        }
        else {
            model[key] = value;
        }

        return model;
    };

    window.Extract = Extract;
})();
