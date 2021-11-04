import React from "react";
import styles from '../styles/Table.module.css'
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
// import { Button } from "react-bootstrap"
import { Button, ButtonGroup, Stack } from "@chakra-ui/react"
import {NavbarBS} from "../components/NavbarBS";

const tables = [
  { user: "Diego", type: "Admin", team: "Development" },
  { user: "Tyler", type: "General", team: "HR" },
];

const columns = [
  {
    dataField: "user",
    text: "User",
    headerStyle: (column, colIndex) => {
      return { backgroundColor: '#00a5e4' };
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
    dataField: "team",
    text: "Team",
    headerStyle: (column, colIndex) => {
      return { backgroundColor: '#00a5e4'};
    }
  },
  {
    dataField: "",
    text: "",
    formatter: () => {
      return (
        <Stack direction="row" spacing={4} justifyContent="center">
        <Button colorScheme="twitter" variant="outline">
        Edit
        </Button>
      </Stack>
      )
    },
    headerStyle: (column, colIndex) => {
      return { backgroundColor: '#00a5e4'}
    },
  }
];

export default function App() {
  return (
    <>
      <NavbarBS isLoggedin={true} />
      <div className={styles.tableBody}>
        <section className={styles.section}>
          <h1>User Settings</h1>
          <div className="App" style={{backgroundColor: 'white' }}>
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={tables}
              columns={columns}
            />
        </div>
        </section>
      </div>
    </>
  );
}
