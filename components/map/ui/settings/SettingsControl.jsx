import { useMemo, useState } from "react";
import Control from "../Control";
import { useMap } from "react-leaflet";
import styles from './SettingsControl.module.scss';
import { fixCoordsReverse, latLngToCoords } from '../../api/ApiHelper';

export default function SettingsControl({position, order, settings, setSettings}) {
    const map = useMap();
    const [showSettings, setShowSettings] = useState(true);

    const handleSensitivityChange = (event) => {
        let newValue = event.target.value / 100;
        setSettings({ ...settings, zoomSensitivity: newValue });
        map.options.smoothSensitivity = newValue;
        localStorage.setItem('zoomSensitivity', newValue);    
    }

    const handleProjectionChange = (event) => {
        let newProjection;
        if (settings.projection === "surface") {
            newProjection = "flat";
        } else {
            newProjection = "surface";
        }
        setSettings({...settings, "projection": newProjection});

        let centerLatLng = map.getCenter();
        let coords = latLngToCoords(centerLatLng.lat, centerLatLng.lng, settings.projection);
        let newCenterLatLng = fixCoordsReverse(coords[0], coords[1], newProjection);
        map.setView(newCenterLatLng, map.getZoom() - 0.01);
    }

    const control = useMemo(() => (
        <div
            className={styles.control}
            onMouseEnter={() => {
                map.dragging.disable();
                setShowSettings(false)
            }}
            onMouseLeave={() => {
                map.dragging.enable();
                setShowSettings(true)
            }}
        >
            {showSettings ? (
                <div className={styles.icon}/>
            ) : (
                <section className={styles.settings}>
                    <p>Zoom sensitivity</p>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={settings.zoomSensitivity * 100}
                        onChange={handleSensitivityChange}
                    />

                    <br />

                    <button onClick={handleProjectionChange}>
                        Switch projection
                    </button>
                </section>
            )}
        </div>
    ), [showSettings, settings]);
    
    return (
        <Control position={position} order={order}>
            <div className="leaflet-control">
                {control}
            </div>
        </Control>
    )
}
