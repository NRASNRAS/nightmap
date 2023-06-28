import Head from 'next/head';
import '../styles/global.css'

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>NightMap</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,600,1,-25"/>

                <link rel="icon" href="https://dynmap.nightrealm.net/live-atlas/favicons/favicon.svg"/>

                <meta name='description' content='NightMap — A better alternative to dynmap for NightRealm'/>
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nightmap.eservs.site/" />
                <meta property="og:title" content="NightMap" />
                <meta property="og:description" content="NightMap — A better alternative to dynmap for NightRealm" />
                <meta name="theme-color" content="#202020"/>

                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
