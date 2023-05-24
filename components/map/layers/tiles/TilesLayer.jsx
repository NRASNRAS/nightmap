import React, { useEffect, useRef } from "react";
import DynmapLayer from "./DynmapTileLayer";

export default function TilesLayer({settings}) {
    return (
        <DynmapLayer
            projection={settings.projection}
            tileSize={128}
            maxNativeZoom={5}
        />
    )
}
