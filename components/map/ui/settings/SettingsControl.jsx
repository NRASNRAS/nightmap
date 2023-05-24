import { useMemo, useState } from "react";
import Control from "../Control";
import { useMap } from "react-leaflet";
import styles from './SettingsControl.module.scss';

export default function SettingsControl({position, settings, setSettings}) {
    const map = useMap();
    const [showSettings, setShowSettings] = useState(true);

    const handleSensitivityChange = (event) => {
        let newValue = event.target.value / 100;
        setSettings({ ...settings, zoomSensitivity: newValue });
        map.options.smoothSensitivity = newValue;
        localStorage.setItem('zoomSensitivity', newValue);    
    }

    const handleProjectionChange = (event) => {
        if (settings.projection === "surface") {
            setSettings({...settings, "projection": "flat"});
        } else {
            setSettings({...settings, "projection": "surface"});
        }
        map.setZoom(map.getZoom() - 0.1);
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
        <Control position={position}>
            <div className="leaflet-control">
                {control}
            </div>
        </Control>
    )
}
