import { fixCoordsReverse, fixName } from './ApiHelper'

export default async function getMarkers(projection) {
    let data;
    let out = {"type": "FeatureCollection","features": []}

    try {
        data = await fetch("https://dynmap.nightrealm.net/tiles/_markers_/marker_earth.json")
            .then(response => response.json());
    } catch (e) {
        return null;
    }

    for (let markerName in data['sets']['markers']['markers']) {
        let marker = data['sets']['markers']['markers'][markerName];
        let name = marker['label'];
        let coord = fixCoordsReverse(marker['x']+0.5, marker['z'], projection);

        out['features'].push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": coord
            },
            "properties": {
                "title": fixName(name),
                "icon": marker['icon']
            }
        })
    }

    return out;
}
