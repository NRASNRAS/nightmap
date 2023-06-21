import React, { useEffect, useState } from "react";
import { LayersControl, MapContainer } from "react-leaflet";
import L from 'leaflet';

import './plugins/SmoothWheelZoom';

import LandsLayer from "./layers/lands/LandsLayer";
import TilesLayer from "./layers/tiles/TilesLayer";
import MarkersLayer from "./layers/markers/MarkersLayer";
import PlayersLayer from "./layers/players/PlayersLayer";

import SettingsControl from "./ui/settings/SettingsControl";
import CoordinatesControl from "./ui/coordinates/CoordinatesControl";

import 'leaflet/dist/leaflet.css';
import styles from './NightMap.module.scss';
import SidebarComponent from "./ui/sidebar/SidebarComponent";

export default function NightMap() {
    const [inBrowser, setInBrowser] = useState(false);

    const [sidebarSettings, setSidebarSettings] = useState({
        displayed: false,
        shortDescription: "",
        dataUrl: ""
    });

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
                attributionControl={false}
                worldCopyJump={false}
                maxZoom={7}
                scrollWheelZoom={false}
                smoothWheelZoom={true}
                smoothSensitivity={settings.zoomSensitivity}
            >
                <TilesLayer settings={settings}/>

                <LayersControl position="bottomright">
                    <LayersControl.Overlay checked name="Claims">
                        <LandsLayer settings={settings} setSidebarSettings={setSidebarSettings}/>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Markers">
                        <MarkersLayer settings={settings}/>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Players">
                        <PlayersLayer settings={settings}/>
                    </LayersControl.Overlay>
                </LayersControl>
                <CoordinatesControl settings={settings} order={0} setSettings={setSettings}/>
                <SettingsControl settings={settings} order={1} setSettings={setSettings}/>
            </MapContainer>

            <SidebarComponent sidebarSettings={sidebarSettings} setSidebarSettings={setSidebarSettings}/>
        </div>
    )
}
