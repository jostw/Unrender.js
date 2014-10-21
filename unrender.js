/**
 * Unrender.js
 *
 * https://github.com/jostw/Unrender.js
 *
 * Copyright (c) 2014 jos
 * Licensed under the MIT license.
 */

"use strict";

(function() {
    var Unrender = function(name) {
        this.name = name || "unrender";
    };

    Unrender.prototype.get = function(selector) {
        var query = document.querySelectorAll(selector +" [data-"+ this.name +"]"),

            i = 0,
            length = query.length,

            model = {};

        for( ; i < length; i++) {
            var item = query[i],

                key = item.attributes.getNamedItem("data-"+ this.name).value,
                value = item.tagName === "INPUT" ? item.value : item.innerHTML;

            model = this.put(model, key, value);
        }

        return model;
    };


    Unrender.prototype.put = function(model, key, value) {
        var keys = key.split(".");

        if(keys.length > 1) {
            var _key = keys.splice(0, 1);

            model[_key] = this.put(model[_key] || {}, keys.join("."), value);
        }
        else {
            model[key] = value;
        }

        return model;
    };

    window.Unrender = Unrender;
})();
