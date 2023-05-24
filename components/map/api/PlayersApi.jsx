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
        // remove vanished nimaari
        if (player.account === "Nimaari" && player.x === 0.0 && player.z === 0.0 && player.y === 64.0) {
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
