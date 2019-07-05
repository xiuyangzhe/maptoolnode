"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.Call = function () { };
    return Test;
}());
exports.default = Test;
var Map_1 = require("ol/Map");
var View_1 = require("ol/View");
var Tile_1 = require("ol/layer/Tile");
var XYZ_1 = require("ol/source/XYZ");
var mapdiv = document.getElementById('mapdiv');
var map = new Map_1.default({
    target: 'mapdiv',
    layers: [
        new Tile_1.default({
            source: new XYZ_1.default({
                url: '/mapdata/{z}/{x}/{y}.png'
            })
        })
    ],
    view: new View_1.default({
        center: [120, 30],
        zoom: 1
    })
});
//# sourceMappingURL=index.js.map