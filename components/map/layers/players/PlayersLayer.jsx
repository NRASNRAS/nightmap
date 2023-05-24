import React, { useEffect, useState } from "react";
import { LayerGroup, Marker, Tooltip } from "react-leaflet";
import { Icon, Point } from "leaflet";
import styles from './PlayersLayer.module.scss';
import getPlayers from "../../api/PlayersApi";

export default function PlayersLayer({settings}) {
    const [dataMarkers, setDataMarkers] = useState([]);
    const [dataHeads, setDataHeads] = useState([]);

    async function getHead(player) {
        const response = await fetch(`/api/tile/playerhead/${player}`);
        const data = await response.blob();
        return URL.createObjectURL(data);
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            getPlayers(settings.projection)
                .then(json => json ? setDataMarkers(json) : null)
                .catch(err => console.error('Could not load data', err))
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [settings.projection]);

    useEffect(() => {
        async function fetchHeads() {
            const dataMarkersFiltered = dataMarkers.filter((marker) => {
                return !dataHeads.some((head) => head.name === marker.name);
            });

            const promises = dataMarkersFiltered.map(async (marker) => {
                const url = await getHead(marker.name);
                return [url, marker.name];
            });
            
            const results = await Promise.all(promises)
                .then((results) => {
                    return results.map((result) => {
                        return {
                            url: result[0],
                            name: result[1]
                        }
                    })
                });
            
            setDataHeads((prevIcons) => [...prevIcons, ...results]);
        }

        fetchHeads();
    }, [dataMarkers]);

    function getHeadUrl(name) {
        const head = dataHeads.find((head) => head.name === name);
        return head ? head.url : '/leaflet/loading_head.png';
    }

    return dataMarkers ? (
        <LayerGroup>
            {dataMarkers.map((marker) => (
                <Marker
                    position={[marker.latitude, marker.longitude]}
                    key={marker.name}
                    icon={new Icon({
                        iconUrl: getHeadUrl(marker.name),
                        iconSize: [32, 32],
                        iconAnchor: [16, 16],
                        className: styles.pixelImg
                    })}
                >
                    <Tooltip interactive={true}
                        className={styles.tooltip}
                        permanent={true}
                        direction="top"
                        offset={new Point(null, -12)}
                    >
                        {marker.name}
                    </Tooltip>
                </Marker>
            ))}
        </LayerGroup>
    ) : <></>
}
