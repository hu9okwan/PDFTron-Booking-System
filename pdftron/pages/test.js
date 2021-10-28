import React from "react";
// import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
const tables = [
  { table: "#2", startDate: "October 27, 2021", endDate: "October 27, 2021", type: "General" },
  { table: "#3", startDate: "October 25, 2021", endDate: "October 25, 2021", type: "HR" },
];
const columns = [
  {
    dataField: "table",
    text: "Table"
  },
  {
    dataField: "startDate",
    text: "Start Date"
  },
  {
    dataField: "endDate",
    text: "End Date"
  },
  {
    dataField: "type",
    text: "Type"
  },
  {
    dataField: "",
    text: ""
  }
];

const rooms = [
  { room: "#2", date: "October 27, 2021", time: "11:00 am - 1:00 pm" },
  { room: "#3", date: "October 25, 2021", time: "11:00 am - 1:00 pm" }
];
const roomColumns = [
  {
    dataField: "room",
    text: "Room",
  },
  {
    dataField: "date",
    text: "Date",
  },
  {
    dataField: "time",
    text: "Time"
  }
];

export default function App() {
  return (
    <html>
      <body>
        <section>
          <h2>Table Bookings</h2>
          <div className="App">
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={tables}
              columns={columns}
            />
          </div>
        </section>
        <section>
          <h2>Room Bookings</h2>
          <div className="App">
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={rooms}
              columns={roomColumns}
            />
          </div>
        </section>
      </body>
    </html>
  );
}                 
