import React, { useEffect, useState } from "react";
import { LayersControl, MapContainer } from "react-leaflet";
import L from 'leaflet';

import './plugins/SmoothWheelZoom';

import LandsLayer from "./layers/lands/LandsLayer";
import TilesLayer from "./layers/tiles/TilesLayer";
import MarkersLayer from "./layers/markers/MarkersLayer";
import PlayersLayer from "./layers/players/PlayersLayer";

import SettingsControl from "./ui/settings/SettingsControl";

import 'leaflet/dist/leaflet.css';
import styles from './NightMap.module.scss';

export default function NightMap() {
    let [inBrowser, setInBrowser] = useState(false);
    let [settings, setSettings] = useState({
        projection: 'flat',
        zoomSensitivity: localStorage.getItem("zoomSensitivity") || 1.75
    });

    useEffect(() => {
        setInBrowser(true);
    }, []);

    if (!inBrowser) {
        return null;
    }      

    return (
        <div id="map-root">
            <MapContainer 
                className={styles.leafletMap}
                center={L.latLng(0, 0)}
                zoom={0}
                crs={L.CRS.Simple}
                zoomControl={false}
                preferCanvas={true}
                attributionControl={true}
                worldCopyJump={false}
                maxZoom={7}
                scrollWheelZoom={false}
                smoothWheelZoom={true}
                smoothSensitivity={settings.zoomSensitivity}
            >
                <TilesLayer settings={settings}/>

                <SettingsControl settings={settings} setSettings={setSettings}/>
                <LayersControl>
                    <LayersControl.Overlay checked name="Claims">
                        <LandsLayer settings={settings}/>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Markers">
                        <MarkersLayer settings={settings}/>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Players">
                        <PlayersLayer settings={settings}/>
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>
        </div>
    )
}
