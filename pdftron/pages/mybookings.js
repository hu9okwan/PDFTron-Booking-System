import React from "react";
import styles from '../styles/Table.module.css'
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
// import { Button } from "react-bootstrap"
import { Button, ButtonGroup, Stack } from "@chakra-ui/react"
import {NavbarBS} from "../components/NavbarBS";
import {getUserTableBookings, getUserRoomBookings} from "../database/read";
import {saveToDatabase, getUserTableBookings, getUserRoomBookings, deleteTableBooking, deleteRoomBooking} from '../database/databaseCRUD.js';

// getUserTableBookings(userID)
// const tables = [
//   { table: allBookin, startDate: "October 27, 2021", endDate: "October 27, 2021", type: "General" },
//   { table: "#3", startDate: "October 25, 2021", endDate: "October 25, 2021", type: "HR" },
// ];

const tables = getUserTableBookings() // put in user ID once we have sessions

const columns = [
  {
    dataField: "table",
    text: "Table",
    headerStyle: (column, colIndex) => {
      return { width: '10%',  backgroundColor: '#00a5e4' };
    }
  },
  {
    dataField: "startDate",
    text: "Start Date",
    headerStyle: (column, colIndex) => {
      return { backgroundColor: '#00a5e4'};
    }
  },
  {
    dataField: "endDate",
    text: "End Date",
    headerStyle: (column, colIndex) => {
      return { backgroundColor: '#00a5e4'};
    }
  },
  {
    dataField: "type",
    text: "Type",
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
        <Button colorScheme="twitter" variant="outline" onclick="saveToDatabase()"> 
        Edit
        </Button>
        <Button colorScheme="red" variant="outline" onclick="deleteTableBooking()">
          Delete
      </Button>
      </Stack>
      )
    },
    headerStyle: (column, colIndex) => {
      return { backgroundColor: '#00a5e4'}
    },
  }
];

// const rooms = [
//   { room: "#2", date: "October 27, 2021", time: "11:00 am - 1:00 pm" },
//   { room: "#3", date: "October 25, 2021", time: "11:00 am - 1:00 pm" }
// ];

const rooms = getUserRoomBookings() // add in user ID 

const roomColumns = [
  {
    dataField: "room",
    text: "Room",
    headerStyle: (column, colIndex) => {
      return { width: '10%',  backgroundColor: '#00a5e4'};
    }
  },
  {
    dataField: "date",
    text: "Date",
    headerStyle: (column, colIndex) => {
      return { backgroundColor: '#00a5e4'};
    }
  },
  {
    dataField: "time",
    text: "Time",
    headerStyle: (column, colIndex) => {
      return { width: '45%', backgroundColor: '#00a5e4'};
    }
  },
  {
    dataField: "",
    text: "Edit/Delete",
    formatter: () => {
      return (
        <Stack direction="row" spacing={4} justifyContent="center">
        <Button colorScheme="twitter" variant="outline" onclick="saveToDatabase()">
        Edit
        </Button>
        <Button colorScheme="red" variant="outline" onclick="deleteRoomBooking()">
          Delete
        </Button>
        </Stack>
      )
    },
    headerStyle: (column, colIndex) => {
      return { backgroundColor: '#00a5e4' }
    },
  }
];

export default function App() {
  return (
    <>
      {/* <div className={styles.loginContainer}> */}
      {/* <header className={styles.navbar}>
    </header> */}
      <NavbarBS isLoggedin={true} />
      <div className={styles.flexContainer}>
      <div className={styles.tableBody}>
      <h1 style={{fontWeight: 'bold', fontSize: '4rem', textAlign: 'left'}}>My Bookings</h1>
        <section className={styles.section}>
          <h1>Table Bookings</h1>
          <div className="App" style={{backgroundColor: 'white' }}>
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
        {/* </div> */}
      </div>
      </div>
    </>
  );
}
