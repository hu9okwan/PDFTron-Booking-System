import React from "react";
import styles from '../styles/Dashboard.module.css'
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

// import { Button } from "react-bootstrap"
import { NavbarBS } from "../components/NavbarBS";

const height = "300px";
const width = "300px";

export default function AdminDashboard() {
    return (
        <>
            <NavbarBS isLoggedin={true} />
            <div className={styles.body}>
                <div className={styles.flexContainer}>
                    <a href="/allbookings">
                        <Button colorScheme="blue" size="lg" className={styles.buttons} height={height} width={width} >
                            View All Bookings
                        </Button>
                    </a>

                    <a href="/usersettings">
                    <Button colorScheme="blue" size="lg" className={styles.buttons} height={height} width={width} >
                        User Settings
                    </Button>
                    </a>

                    <a href="/edit">
                    <Button colorScheme="blue" size="lg" className={styles.buttons} height={height} width={width} >
                        Edit Map
                    </Button>
                    </a>

                    <a href="#">
                    <Button colorScheme="blue" size="lg" className={styles.buttons} height={height} width={width} >
                        Upload Floorplan
                    </Button>
                    </a>
                </div>
            </div>
        </>
    );
}
