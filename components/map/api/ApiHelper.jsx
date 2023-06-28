export function fixCoords(x, z, projection, y) {
    let wtm;
    if (projection === "surface") {
        wtm = [2.82842712474619,0.0,-2.8284271247461903,-2.4494897427831783,1.9999999999999998,-2.449489742783178,-4.8074067159589095E-17,0.9999999999999999,-4.8074067159589095E-17];
    } else {
        wtm = [4.0,0.0,-2.4492935982947064E-16,-2.4492935982947064E-16,0.0,-4.0,0.0,1.0,0.0];
    }

    if (!y) {
        y = 64;
    }

    let latitude = wtm[3] * x + y * wtm[4] + wtm[5] * z;
    let longitude = wtm[0] * x + y * wtm[1] + wtm[2] * z;

    latitude = -((128 - latitude) / (1 << 5))
    longitude = longitude / (1 << 5)

    return [longitude, latitude]
}

export function fixCoordsReverse(x, z, projection, y) {
    let coords = fixCoords(x, z, projection, y);
    return [coords[1], coords[0]];
}

export function latLngToCoords(lat, lng, projection) {
    let mtw;
    if (projection === "surface") {
        mtw = [0.17677669529663687,-0.2041241452319315,0.408248290463863,0.0,-1.3877787807814457E-17,1.0000000000000002,-0.1767766952966369,-0.20412414523193148,0.40824829046386296];
    } else {
        mtw = [0.25,-1.5308084989341915E-17,0.0,0.0,0.0,1.0,-1.5308084989341915E-17,-0.25,0.0];
    }

    lat = 128 + lat * (1 << 5);
    lng = lng * (1 << 5);

    let x = mtw[0] * lng + mtw[1] * lat + mtw[2] * 64;
    let z = mtw[6] * lng + mtw[7] * lat + mtw[8] * 64;

    return [Math.round(x), Math.round(z)];
}

export function extractName(raw) {
    const indexStart = raw.indexOf('<b>') + 3;
    const indexEnd = raw.indexOf('/b>') - 1;
  
    let text = raw.substring(indexStart, indexEnd);
  
    text = text.replace(/(?=[A-Z])/g, ' ');
    
    text = text.replace('_', ' ');
  
    return text;
}
  
export function fixName(raw) {
    raw = raw.replace(/\\\//g, '/');
    raw = decodeURIComponent(raw);
    return raw;
}
