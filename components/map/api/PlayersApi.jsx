export default async function getPlayers() {
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

        out.push({
            x: player.x,
            y: player.y,
            z: player.z,
            name: player.account
        });
    }

    return out;
}
