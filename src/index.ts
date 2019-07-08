import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';
import {defaults as defaultControls} from 'ol/control';
import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate';
import MapTool from './utils/maptool';

const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
    // comment the following two lines to have the mouse position
    // be placed within the map.
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp;',
});

const projectionSelect = document.getElementById('projection');
projectionSelect.addEventListener('change', function(event) {
    mousePositionControl.setProjection(event.target);
});

const precisionInput = document.getElementById('precision');
precisionInput.addEventListener('change', function(event) {
    const format = createStringXY(event.target);
    mousePositionControl.setCoordinateFormat(format);
});


const mapdiv = document.getElementById('mapdiv');
const map = new Map({
    controls: defaultControls().extend([mousePositionControl]),
    target: 'mapdiv',
    layers: [
        new TileLayer({
            source: new XYZ({
                url: '/mapdata/{z}/{x}/{y}.png',
            }),
        }),
    ],
    view: new View({
        center: fromLonLat([120, 30]),
        zoom: 10,
        minZom: 7,
    }),
});
