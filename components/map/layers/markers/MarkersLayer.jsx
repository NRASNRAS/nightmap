import React, { useEffect, useState } from "react";
import { LayerGroup, Marker, Tooltip, useMap } from "react-leaflet";
import { Icon, Point } from "leaflet";
import styles from './MarkersLayer.module.scss';
import getMarkers from "../../api/MarkersApi";

export default function MarkersLayer({settings}) {
    const [dataMarkers, setDataMarkers] = useState(null);
    const [showTooltips, setShowTooltips] = useState(false);
    const map = useMap();

    const icon = new Icon({
        iconUrl: '/leaflet/marker_pin.png',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        className: styles.pixelImg
    });

    const iconStar = new Icon({
        iconUrl: '/leaflet/marker_star.png',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        className: styles.pixelImg
    });

    function getIcon(name) {
        if (name === "star") {
            return iconStar;
        } else {
            return icon;
        }
    }

    useEffect(() => {
        setDataMarkers(null);
        
        const loadMarkers = () => {
            getMarkers(settings.projection)
                .then(json => {
                    if (json) {
                        setDataMarkers(json.features);
                    } else {
                        setTimeout(loadMarkers, 1000);
                    }
                })
                .catch(err => console.error('Could not load data', err))
        }

        loadMarkers();
    }, [settings.projection]);

    useEffect(() => {
        map.on('zoom', () => {
            const zoom = map.getZoom();
            if (zoom >= 1) {
                setShowTooltips(true);
            } else {
                setShowTooltips(false);
            }
        })
    }, [map]);

    return dataMarkers ? (
        <LayerGroup>
            {dataMarkers && dataMarkers.map((marker) => (
                <Marker
                    position={marker.geometry.coordinates}
                    icon={getIcon(marker.properties.icon)}
                    key={marker.properties.title}
                >
                    {showTooltips && (
                        <Tooltip interactive={true}
                            className={styles.tooltip}
                            permanent={true}
                            direction="right"
                            offset={new Point(4, null)}
                        >
                            {marker.properties.title}
                        </Tooltip>
                    )}
                </Marker>
            ))}
        </LayerGroup>
    ) : <></>
}
