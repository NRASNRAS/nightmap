/*
Parts of this method have been taken from https://github.com/JLyne/LiveAtlas/
And it's licensed under Apache License 2.0
*/
function leafletToDynmap(x, y, zoom) {
    const izoom = Math.abs(7 - zoom);

    let zoomoutlevel = Math.max(0, izoom - 2);

    const scale = 1 << zoomoutlevel;

    x = scale * x;
    y = -(scale * y);

    let zoomPrefix = 'zzzzzzzzzzzzzzzzzzzzzz'.substr(0, zoomoutlevel) + (zoomoutlevel === 0 ? '' : '_');
    
    // Return dynmap url for that tile
    return `${x >> 5}_${y >> 5}/${zoomPrefix}${x}_${y}.png`;
}

export default function getTileUrl(projection, x, y, z) {
    if (projection === "surface") {
        projection = "t";
    }

    return `https://dynmap.nightrealm.net/tiles/earth/${projection}/${leafletToDynmap(x, y, z)}`;
}
