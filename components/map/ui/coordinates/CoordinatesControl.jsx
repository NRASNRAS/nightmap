import { useEffect, useState } from "react";
import Control from "../Control";
import { useMap } from "react-leaflet";
import styles from './CoordinatesControl.module.scss';
import { latLngToCoords } from "../../api/ApiHelper";

export default function CoordinatesControl({position, order, settings}) {
    const map = useMap();

    const [coords, setCoords] = useState({x: 0, z: 0});

    useEffect(() => {
        const onMouseMove = (e) => {
            const {lat, lng} = e.latlng;
            const [x, z] = latLngToCoords(lat, lng, settings.projection);
            setCoords({x: x, z: z});
        };

        map.on('mousemove', onMouseMove);

        return () => {
            map.off('mousemove', onMouseMove);
        }
    }, [map, settings]);
    
    return (
        <Control position={position} order={order}>
            <div className={styles.control}>
                <p className={styles.text}>{coords.x}, {coords.z}</p>
            </div>
        </Control>
    )
}
