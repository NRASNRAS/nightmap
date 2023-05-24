import Head from 'next/head';
import '../styles/global.css'

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>NightMap</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,600,1,-25"/>
                <meta name='description' content='Night Map!!!'/>
            </Head>
            <Component {...pageProps} />
        </>
    );
}
