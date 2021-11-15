import React from "react";
import styles from '../styles/Table.module.css'
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import {NavbarBS} from "../components/NavbarBS";


let tables = [
    {
        table: "#2",
        user: "Diego Felix",
        startDate: "October 27, 2021",
        endDate: "October 27, 2021",
        bookingId: 0
    },
    {
        table: "#3",
        user: "Tyler Gordon",
        startDate: "October 25, 2021",
        endDate: "October 25, 2021",
        bookingId: 1
    },
];
import {
    getAllTableBookings,
    getMaxDays,
    updateMaxTableDays,
    deleteTableBooking
} from "../database/databaseCRUD"

// !!!!!!!!!!!!!!!!!!!!!!!!!! IMPORTANT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// getAllTableBookings(); <- this is a promise, resolve it to get values
// difference only that userId instead of user inside the json

const columns = [
    {
        dataField: "table",
        text: "Table",
        headerStyle: (column, colIndex) => {
            return {width: '10%', backgroundColor: '#00a5e4'};
        }
    },
    {
        dataField: "user",
        text: "User",
        headerStyle: (column, colIndex) => {
            return {backgroundColor: '#00a5e4'};
        }
    },
    {
        dataField: "startDate",
        text: "Start Date",
        headerStyle: (column, colIndex) => {
            return {backgroundColor: '#00a5e4'};
        }
    },
    {
        dataField: "endDate",
        text: "End Date",
        headerStyle: (column, colIndex) => {
            return {backgroundColor: '#00a5e4'};
        }
    },
    {
      dataField: "bookingId",
      text: "Booking ID",
      headerStyle: (column, colIndex) => {
        return { backgroundColor: '#00a5e4'};
      }
    },
    {
        dataField: "",
        text: "Edit/Delete",
        formatter: () => {
            return (
                <Stack direction="row" spacing={4} justifyContent="center">
                    <Button colorScheme="twitter" variant="outline">
                        Edit
                    </Button>
                    <Button colorScheme="red" variant="outline"

                            // defaultValue={document.querySelector()}
                            // onClick={deleteTableBooking}
                    >
                        Delete
                    </Button>
                </Stack>
            )
        },
        headerStyle: (column, colIndex) => {
            return {backgroundColor: '#00a5e4'}
        },
    }
];

const rooms = [
    {
        room: "#2",
        user: "Agnes Ko",
        date: "October 27, 2021",
        time: "11:00 am - 1:00 pm"
    },
    {
        room: "#3",
        user: "Shaniah Nizzar",
        date: "October 25, 2021",
        time: "11:00 am - 1:00 pm"
    }
];

const roomColumns = [
    {
        dataField: "room",
        text: "Room",
        headerStyle: (column, colIndex) => {
            return {width: '10%', backgroundColor: '#00a5e4'};
        }
    },
    {
        dataField: "user",
        text: "User",
        headerStyle: (column, colIndex) => {
            return {backgroundColor: '#00a5e4'};
        }
    },
    {
        dataField: "date",
        text: "Date",
        headerStyle: (column, colIndex) => {
            return {backgroundColor: '#00a5e4'};
        }
    },
    {
        dataField: "time",
        text: "Time",
        headerStyle: (column, colIndex) => {
            return {width: '45%', backgroundColor: '#00a5e4'};
        }
    },
    {
        dataField: "",
        text: "Edit/Delete",
        formatter: () => {
            return (
                <Stack direction="row" spacing={4} justifyContent="center">
                    <Button colorScheme="twitter" variant="outline">
                        Edit
                    </Button>
                    <Button colorScheme="red" variant="outline">
                        Delete
                    </Button>
                </Stack>
            )
        },
        headerStyle: (column, colIndex) => {
            return {backgroundColor: '#00a5e4'}
        },
    }
];

export default function App() {
    return (
        <>
            <NavbarBS />
            <div className={styles.tableBody}>
                <h1 style={{
                    fontWeight: 'bold',
                    fontSize: '4rem',
                    textAlign: 'left'
                }}>All Bookings</h1>

                <div>Max Booking Hours
                    <NumberInput id="maxHours" precision={0} size="md" maxW={20}
                                 defaultValue={1} min={1} max={24}
                                 allowMouseWheel onChange={updateMaxTableDays}>
                        <NumberInputField/>
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper/>
                        </NumberInputStepper>
                    </NumberInput>
                </div>
                <section className={styles.section}>
                    <h1>Table Bookings</h1>
                    <div className="App" style={{backgroundColor: 'white'}}>
                        <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={tables}
                            columns={columns}
                        />
                    </div>
                </section>
                <section className={styles.section}>
                    <h1>Room Bookings</h1>
                    <div className="App" style={{backgroundColor: 'white'}}>
                        <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={rooms}
                            columns={roomColumns}
                        />
                    </div>
                </section>
            </div>
        </>
    );
}
App.auth = true