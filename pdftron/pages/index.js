import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Login from '../components/Login'
import Logout from '../components/Logout'
import { NavbarBS } from '../components/NavbarBS';


export default function Home() {
    return (
        <>
        <Head>
            <title>PDFTron Reservation System</title>
            <meta name="description" content="Generated by create next app"
                  key="title"/>
            <link rel="icon" href="/pdftron-icons/PDFtron.ico"/>
        </Head>
        <NavbarBS isLoggedIn={false} />
        <div className={styles.loginBody}>
        {/* <nav>
            <a href="https://www.pdftron.com">
                <img src="pdftron-icons/pdftron-logo-blue.png"
    alt="PDFTron Icon"/>
            </a>
        </nav> */}
        <main className={styles.loginContainer}>
            <div className={styles.leftHalf}>
                <img src="office.jpeg" alt="office icon"
    height="400"
    width="800"/>
            </div>
            <div className={styles.rightHalf}>
                <h1 className={styles.loginH1}>Offices and Tables</h1>
                <h2>Book your workspace today!</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc tempus
                    massa nibh. Nam gravida urna venenatis, sollicitudin nulla
                    et,
                    rhoncus nisi. Integer dignissim euismod urna. In interdum
                    ac felis
                    sed aliquet. Nunc elementum dolor egestas, luctus risus
                    vitae,
                    pulvinar mauris. Vestibulum eget scelerisque neque. In
                    condimentum
                    urna consectetur ante commodo tincidunt.
                </p>
                <Login />
                {/*<Logout />*/}
            </div>
        </main>
        </div>
        </>
    )
}


