import React from "react";
import styles from '../styles/Table.module.css'
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import {NavbarBS} from "../components/NavbarBS";
import { Button, ButtonGroup, Stack } from "@chakra-ui/react"



const tables = [
  { table: "#2", user: "Diego Felix", startDate: "October 27, 2021", endDate: "October 27, 2021", type: "General" },
  { table: "#3", user: "Tyler Gordon", startDate: "October 25, 2021", endDate: "October 25, 2021", type: "HR" },
];

const columns = [
  {
    dataField: "table",
    text: "Table",
    headerStyle: (column, colIndex) => {
      return { width: '10%',  backgroundColor: '#00a5e4' };
    }
  },
  {
    dataField: "user",
    text: "User",
    headerStyle: (column, colIndex) => {
      return { backgroundColor: '#00a5e4' };
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
      return { backgroundColor: '#00a5e4'}
    },
  }
];

const rooms = [
  { room: "#2", user: "Agnes Ko", date: "October 27, 2021", time: "11:00 am - 1:00 pm" },
  { room: "#3", user: "Shaniah Nizzar", date: "October 25, 2021", time: "11:00 am - 1:00 pm" }
];

const roomColumns = [
  {
    dataField: "room",
    text: "Room",
    headerStyle: (column, colIndex) => {
      return { width: '10%',  backgroundColor: '#00a5e4'};
    }
  },
  {
    dataField: "user",
    text: "User",
    headerStyle: (column, colIndex) => {
      return { backgroundColor: '#00a5e4'};
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
      return { backgroundColor: '#00a5e4' }
    },
  }
];



export async function getStaticProps() {
  // SERVER SIDE RENDERING OF DATABSE FUNCTIONS
  var admin = require("firebase-admin");
  const serviceAccount = require('../firebase/pdftron-461d4-firebase-adminsdk-u1i9d-e77537e5ea.json');
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount)
  // });
  const db = admin.firestore();

  const all_teams = db.collection('teams');
  const snapshot = await all_teams.get();
  if (snapshot.empty) {
    console.log('No matching documents.');
  }
  let team_list = [];
  snapshot.forEach(doc => {
    //console.log(doc.id, '=>', doc.data());
    team_list.push(doc.data())
  });
  return {props: {team_list},};
}


export default function App({ team_list }) {
  return (
    <>

      <NavbarBS isLoggedin={true} />
      <div className={styles.tableBody}>
        <h1 style={{fontWeight: 'bold', fontSize: '4rem', textAlign: 'left'}}>All Bookings</h1>
        <section className={styles.section}>
          <h1></h1>
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
      </div>
    </>
  );
}