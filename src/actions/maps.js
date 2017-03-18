import { createAction } from 'redux-actions';
import GoogleMapsAPI from 'googlemaps'

export const MAPS_ACTIONS = {
    MAP_IMAGE_URL: "MAP_IMAGE_URL"
};

export const mapImageURL = createAction(MAPS_ACTIONS.MAP_IMAGE_URL);

var publicConfig = {
  key: 'AIzaSyDkZRRbfK1cnSBe8NNPiyR4H9Idb134W-w',
  stagger_time:       1000, // for elevationPath 
  encode_polylines:   false,
  secure:             true, // use https 
  //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests 
};
var gmAPI = new GoogleMapsAPI(publicConfig);

const STOCKHOLM_LOCATION = "59.329321, 18.068581";
var ZOOM = 12;

export function loadMapImageURL(val, zoom) {
    if (val) {
        return (dispatch) => {
            if (zoom) {
                ZOOM = zoom;
            }
            /*
            var geocodeParams = {
                "address":    "Armégatan 5, 17171 Solna, Sweden"
            };

            gmAPI.geocode(geocodeParams, function(err, result){
                    console.log(err, result);
            });*/
            var params = {
                
                center: val,
                zoom: ZOOM,
                size: '620x200',
                maptype: 'roadmap',
                markers: [
                    {
                        location: val,
                        label   : 'A',
                        color   : 'red',
                        shadow  : true
                    }
                ],
                style: [
                    {
                        feature: 'road',
                        element: 'all',
                        rules: {
                            hue: '0x00ff00'
                        }
                    }
                ]
            };
            dispatch(mapImageURL(gmAPI.staticMap(params)));
        }
    } else {
        return (dispatch) => {
            var params = {
                center: STOCKHOLM_LOCATION,
                zoom: 12,
                size: '640x200',
                maptype: 'roadmap',
                markers: [
                    {
                        location: STOCKHOLM_LOCATION,
                        label   : 'A',
                        color   : 'red',
                        shadow  : true
                    }
                ],
                style: [
                    {
                        feature: 'road',
                        element: 'all',
                        rules: {
                            hue: '0x00ff00'
                        }
                    }
                ]
            };
            dispatch(mapImageURL(gmAPI.staticMap(params)));
        }
    }
}

export function loadMapMultiMarkers(center, markers, zoom) {
    return (dispatch) => {
        let index = 0
        for (let marker in markers) {
            markers.push( {
                location: markers,
                label: index++,
                color: 'red',
                shadow: true
            })
        }
        var params = {
            center: center,
            zoom: zoom,
            size: '640x200',
            maptype: 'roadmap',
            markers: markers,
            style: [
                {
                    feature: 'road',
                    element: 'all',
                    rules: {
                        hue: '0x00ff00'
                    }
                }
            ]
        };
        dispatch(mapImageURL(gmAPI.staticMap(params)));
    }
}
