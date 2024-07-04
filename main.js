import { Point } from 'ol/geom';
import './style.css';
import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { Projection, fromLonLat, transform, addCoordinateTransforms } from 'ol/proj';
import OSM from 'ol/source/OSM';
import proj4 from 'proj4';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {register} from 'ol/proj/proj4.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import {get as getProjection, transformExtent} from 'ol/proj.js';
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text,
} from 'ol/style.js';


proj4.defs('EPSG:9377','+proj=tmerc +lat_0=4.0 +lon_0=-73.0 +k=0.9992 +x_0=5000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
register(proj4);
const origen_nacional = getProjection('EPSG:9377')

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    Projection: "EPSG:4326",
    center: fromLonLat([-73, 4]),
    zoom: 5
  })
});

var marcador = new Feature({
  geometry: new Point(fromLonLat([-74.06, 4.62]))
  
})

var fuenteVectorial = new VectorSource({
  features: [marcador]
  
})

var capaVecotrial = new VectorLayer({
  source: fuenteVectorial
})

map.addLayer(capaVecotrial);

function clicSobreMapa(evento){


  var coordenadas = transform([evento.coordinate[0], evento.coordinate[1]],'EPSG:3857', 'EPSG:9377')
 console.log(coordenadas)   
 //console.log(transform([coordenadas], 'EPSG:4326', 'EPSG:9377'))   
    
}

map.on("click", clicSobreMapa);

//prueba geojson
var mapa_municipios = new VectorLayer({
  source: new VectorSource({
    url: 'anexos/Municipios_agosto_2023.geojson',
    format: new GeoJSON({
      dataProjection: 'EPSG:9377',
      featureProjection: 'EPSG:9377'
    })
  }),
  style: new Style({
    stroke: new Stroke({
      color: 'black',
    }),
  })
})
map.addLayer(mapa_municipios)