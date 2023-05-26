export function fixCoords(x, z, projection) {
    let wtm;
    if (projection === "surface") {
        wtm = [2.82842712474619,0.0,-2.8284271247461903,-2.4494897427831783,1.9999999999999998,-2.449489742783178,-4.8074067159589095E-17,0.9999999999999999,-4.8074067159589095E-17];
    } else {
        wtm = [4.0,0.0,-2.4492935982947064E-16,-2.4492935982947064E-16,0.0,-4.0,0.0,1.0,0.0];
    }

    let latitude = wtm[3] * x + 64 * wtm[4] + wtm[5] * z;
    let longitude = wtm[0] * x + 64 * wtm[1] + wtm[2] * z;

    latitude = -((128 - latitude) / (1 << 5))
    longitude = longitude / (1 << 5)

    if (projection === "flat") {
        return [Math.round(longitude), Math.round(latitude)]
    } else {
        return [longitude, latitude]
    }
}

export function fixCoordsReverse(x, z, projection) {
    let wtm;
    if (projection === "surface") {
        wtm = [2.82842712474619,0.0,-2.8284271247461903,-2.4494897427831783,1.9999999999999998,-2.449489742783178,-4.8074067159589095E-17,0.9999999999999999,-4.8074067159589095E-17];
    } else {
        wtm = [4.0,0.0,-2.4492935982947064E-16,-2.4492935982947064E-16,0.0,-4.0,0.0,1.0,0.0];
    }

    let latitude = wtm[3] * x + 64 * wtm[4] + wtm[5] * z;
    let longitude = wtm[0] * x + 64 * wtm[1] + wtm[2] * z;

    latitude = -((128 - latitude) / (1 << 5))
    longitude = longitude / (1 << 5)

    if (projection === "flat") {
        return [Math.round(latitude), Math.round(longitude)]
    } else {
        return [latitude, longitude]
    }
}

export function extractName(raw) {
    const indexStart = raw.indexOf('<b>') + 3;
    const indexEnd = raw.indexOf('/b>') - 1;
  
    let text = raw.substring(indexStart, indexEnd);
  
    text = text.replace(/(?<!^)(?=[A-Z])/g, ' ');
    
    text = text.replace('_', ' ');
  
    return text;
}
  
export function fixName(raw) {
    raw = raw.replace(/\\\//g, '/');
    raw = decodeURIComponent(raw);
    return raw;
}