import { fixCoords, fixName, extractName } from './ApiHelper';

export default async function getLands(projection) {
    let data;
    let out = {"type": "FeatureCollection","features": []}

    try {
        data = await fetch("https://dynmap.nightrealm.net/tiles/_markers_/marker_earth.json")
            .then(response => response.json());
    } catch (e) {
        return null;
    }

    for (let areaName in data['sets']['me.angeschossen.lands']['areas']) {
        let coords = [];
        let area = data['sets']['me.angeschossen.lands']['areas'][areaName];
        let name = extractName(area['desc']);

        if (name == "Spawn") continue;

        for (let i = 0; i < area['x'].length; i++) {
            let coord = fixCoords(area['x'][i], area['z'][i], projection);
            coords.push(coord);
        }

        out['features'].push({
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [coords]
            },
            "properties": {
                "title": fixName(name),
                "color": area['fillcolor'],
                "desc": area['desc'],
                "id": area['label']
            }
        })
    }

    return out;
}
