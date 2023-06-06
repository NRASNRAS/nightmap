import { createRef, useEffect, useState } from "react"

const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
}

export default function Control({position, order, children}) {
    const [container, setContainer] = useState(null);
    const pos = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.bottomright;
    const containerRef = createRef();

    useEffect(() => {
        const target = document.getElementsByClassName(pos);
        setContainer(target[0]);
    }, [pos]);

    useEffect(() => {
        if (container !== null) {
            container.insertBefore(containerRef.current, container.children[order]);
        }
    }, [container, containerRef])

    return (
        <div ref={containerRef}>
            {children}
        </div>
    )
}
