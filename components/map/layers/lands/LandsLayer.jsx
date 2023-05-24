import React, { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import styles from './LandsLayer.module.scss';
import { Point } from "leaflet";
import getLands from '../../api/LandsApi';

export default function LandsLayer({settings}) {
    const [dataClaims, setDataClaims] = useState(null);

    useEffect(() => {
        setDataClaims(null);
        
        const loadClaims = () => {
            getLands(settings.projection)
                .then(json => {
                    if (json) {
                        setDataClaims(json);
                    } else {
                        setTimeout(loadClaims, 1000);
                    }
                })
                .catch(err => console.error('Could not load data', err))
        }

        loadClaims();
    }, [settings.projection]);

    return dataClaims ? (
        <GeoJSON
            key="claims-fill"
            data={dataClaims}
            style={(feature) => ({
                "color": feature.properties.color,
                "weight": 2,
                "opacity": 0.5,
                "fillOpacity": 0.5
            })}
            onEachFeature={(feature, layer) => {
                const tooltip = new L.Tooltip({
                    content: feature.properties.title,
                    sticky: true,
                    direction: 'bottom',
                    offset: new Point(null, 15),
                    className: styles.tooltip
                })
                
                layer.bindTooltip(tooltip);
            }}
        >
        </GeoJSON>
    ) : (<></>)
}
