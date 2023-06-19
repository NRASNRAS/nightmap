import { useEffect, useState } from 'react';
import styles from './SidebarComponent.module.scss';

export default function SidebarComponent({sidebarSettings, setSidebarSettings}) {
    const baseDataUrl = "https://raw.githubusercontent.com/NRASNRAS/nightmap-data/main";
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(baseDataUrl + sidebarSettings.dataUrl);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (e) {
                setData(null);
            }
        }

        fetchData();
    }, [sidebarSettings])

    return (
        <div className={`${styles.sidebar} ${sidebarSettings.displayed ? styles.shown : ""}`}>
            <p className={styles.header} dangerouslySetInnerHTML={{__html: sidebarSettings.shortDescription}}/>

            {data && (
                <div className={styles.description}>
                    <img src={baseDataUrl + data.image} alt=""/>
                    <p>
                        {data.description}
                    </p>

                    {data.discord && (
                        <a href={data.discord} target="_blank" rel="noopener noreferrer">Join the Discord</a>
                    )}
                </div>
            )}

            <button onClick={() => {
                setSidebarSettings({
                    displayed: false,
                    shortDescription: "",
                    dataUrl: ""
                });
                setData(null);
            }} className={styles.button}>×</button>
        </div>
    )
}
