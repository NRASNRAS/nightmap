import React, { useEffect, useState } from "react";
import { LayerGroup, Marker, Tooltip } from "react-leaflet";
import { Icon, LatLng, Point } from "leaflet";
import styles from './PlayersLayer.module.scss';
import getPlayers from "../../api/PlayersApi";
import { fixCoordsReverse } from '../../api/ApiHelper';

export default function PlayersLayer({settings}) {
    const [dataMarkers, setDataMarkers] = useState([]);
    const [dataHeads, setDataHeads] = useState([]);

    function latLngFromPlayerCoords(x, y, z) {
        let latlng = fixCoordsReverse(x, z, settings.projection, y);
        return new LatLng(latlng[0], latlng[1]);
    }

    async function getHead(player) {
        const response = await fetch(`/api/tile/playerhead/${player}`);
        const data = await response.blob();
        return URL.createObjectURL(data);
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            getPlayers()
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
                    position={latLngFromPlayerCoords(marker.x, marker.y, marker.z)}
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
