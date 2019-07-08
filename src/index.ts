export default class Test {
    private num: number;
    private name: string;

    public Call():void{}
}

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';

const mapdiv = document.getElementById('mapdiv');
const map = new Map({
    target: 'mapdiv',
    layers: [
        new TileLayer({
            source: new XYZ({
                url: '/mapdata/{z}/{x}/{y}.png'
            })
        })
    ],
    view: new View({
        center: fromLonLat([120, 30]),
        zoom: 10,
        minZom:6
    })
});

