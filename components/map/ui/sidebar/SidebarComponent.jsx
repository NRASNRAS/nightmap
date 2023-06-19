import styles from './SidebarComponent.module.scss';

export default function SidebarComponent({sidebarSettings, setSidebarSettings}) {
    return (
        <div className={`${styles.sidebar} ${sidebarSettings.displayed ? styles.shown : ""}`}>
            <p className={styles.header} dangerouslySetInnerHTML={{__html: sidebarSettings.shortDescription}}/>

            <button onClick={() => {
                setSidebarSettings({
                    displayed: false,
                    shortDescription: "",
                    dataUrl: ""
                })
            }} className={styles.button}>×</button>
        </div>
    )
}
