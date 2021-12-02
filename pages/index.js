import styles from '../styles/Home.module.css'
import Login from '../components/Login'
import { NavbarBS } from '../components/NavbarBS';
import 'bootstrap/dist/css/bootstrap.css'

// ok i think something here is wack
// ur wack

export default function Home() {
    return (
        <>
            <div className={styles.loginContainer}>
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
