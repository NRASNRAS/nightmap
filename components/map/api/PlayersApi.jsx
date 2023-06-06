import { fixCoordsReverse } from './ApiHelper';

export default async function getPlayers(projection) {
    let data;
    let out = []

    try {
        data = await fetch("https://dynmap.nightrealm.net/up/world/earth/")
            .then(response => response.json());
    } catch (e) {
        return null;
    }

    for (let player of data['players']) {
        // remove shifted/invisible players
        if (player.world !== "earth") {
            continue;
        }

        let coord = fixCoordsReverse(player.x, player.z, projection);
        out.push({
            x: player.x,
            y: player.y,
            z: player.z,
            latitude: coord[0],
            longitude: coord[1],
            name: player.account
        });
    }

    return out;
}
