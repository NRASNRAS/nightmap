import Head from 'next/head';
import '../styles/global.css'

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>NightMap</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,600,1,-25"/>
                <meta name='description' content='Night Map!!!'/>
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
