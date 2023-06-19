import React, { useEffect, useState } from "react";
import { GeoJSON, useMap } from "react-leaflet";
import styles from './LandsLayer.module.scss';
import { Point } from "leaflet";
import getLands from '../../api/LandsApi';
import L from 'leaflet';

export default function LandsLayer({settings, setSidebarSettings}) {
    const [dataClaims, setDataClaims] = useState(null);
    const map = useMap();

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
                // Tooltip

                const tooltip = new L.Tooltip({
                    content: feature.properties.title,
                    sticky: true,
                    direction: 'bottom',
                    offset: new Point(null, 15),
                    className: styles.tooltip
                })
                
                layer.bindTooltip(tooltip);

                // Sidebar handling

                layer.on('click', (e) => {
                    setSidebarSettings({
                        "shortDescription": e.target.feature.properties.desc,
                        "displayed": true
                    })

                    let originalBounds = e.target.getBounds();

                    const { lat: northeastLat, lng: northeastLng } = originalBounds.getNorthEast();
                    const { lat: southwestLat, lng: southwestLng } = originalBounds.getSouthWest();
                
                    const adjustedNortheast = L.latLng(northeastLat, northeastLng-25);
                    const adjustedSouthwest = L.latLng(southwestLat, southwestLng);
                                    
                    const adjustedBounds = L.latLngBounds(adjustedNortheast, adjustedSouthwest);

                    map.flyToBounds(adjustedBounds);
                })
            }}
        >
        </GeoJSON>
    ) : (<></>)
}
