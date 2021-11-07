import styles from '../styles/Home.module.css'
import Login from '../components/Login'
import Logout from '../components/Logout'
import { NavbarBS } from '../components/NavbarBS';

import 'bootstrap/dist/css/bootstrap.css'

export default function Home() {
    return (
        <>
            <NavbarBS isLoggedIn={false} />
            <div className={styles.loginContainer}>
                <header className={styles.navbar}>
                    <nav >
                        <ul>
                            <li>
                                <a href="https://www.pdftron.com">
                                    {/*<img src="pdftron-icons/pdftron-logo-blue.png" alt="PDFTron Icon"/>*/}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main className={styles.mainContainer}>
                    <section className={styles.section}>
                        <h1>Booking Portal</h1>
                        <h2>Book your workspace today!</h2>
                        <p>Welcome to PDFTron's Internal Table/Room Booking system!
                            Begin by logging in with your valid @PDFTron email address.
                            Contact your system administrator for assistance if required</p>
                        {/* <section className={styles.section}> */}
                        <div className={styles.googleLogin}>
                            <Login />
                        </div>
                    </section>
                    <section className={styles.bottomHalf}>
                        {/* <Logout /> */}
                        <div>
                            <img src="office.jpeg" alt="office icon" />
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}
