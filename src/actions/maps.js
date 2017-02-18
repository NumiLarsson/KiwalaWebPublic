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
  proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests 
};
var gmAPI = new GoogleMapsAPI(publicConfig);

export function loadMapImageURL(val) {
    return (dispatch) => {
        var params = {
            center: '444 W Main St Lock Haven PA',
            zoom: 15,
            size: '500x400',
            maptype: 'roadmap',
            markers: [
                {
                    location: '300 W Main St Lock Haven, PA',
                    label   : 'A',
                    color   : 'green',
                    shadow  : true
                },
                {
                    location: '444 W Main St Lock Haven, PA',
                    icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe%7C996600'
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
            ],
            path: [
                {
                    color: '0x0000ff',
                    weight: '5',
                    points: [
                        '41.139817,-77.454439',
                        '41.138621,-77.451596'
                    ]
                }
            ]
        };
        dispatch(mapImageURL(gmAPI.staticMap(params)));
    }
}
