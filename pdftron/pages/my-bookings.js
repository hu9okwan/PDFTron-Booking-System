import React, { useState, useEffect, forwardRef } from "react";
import styles from '../styles/Table.module.css'
import { NavbarBS } from "../components/NavbarBS";
import { getUserTableBookings, getUserRoomBookings, deleteTableBooking, deleteRoomBooking } from "../database/databaseCRUD";
import { useSession } from 'next-auth/react';
import MaterialTable from "material-table";
import { Paper } from '@material-ui/core';


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };



export default function App() {
    const { data: session } = useSession()


    var columns = [
        { title: "Table", field: "tableId",},
        { title: "Start Date", field: "startDate",},
        { title: "End Date", field: "endDate", },
    ]

    var columnsRoom = [
        { title: "Room", field: "roomId"},
        { title: "Start Date", field: "startDate",},
        { title: "Time", field: "time", },
    ]

    const [dataTable, setDataTable] = useState([]); // table data
    const [dataRoom, setDataRoom] = useState([]); // room data

    //for error handling
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessage] = useState([])

    useEffect(() => {
        getUserTableBookings(session.user.id)
            .then(res => {
                console.log(res)

                let formattedData = []
                for (let bookings of res) {
                    // console.log(bookings)
                    for (let booking in bookings) {
                        let startDate = new Date(bookings[booking]["startDate"])
                        let endDate = new Date(bookings[booking]["endDate"])

                        bookings[booking]["startDate"] = startDate.toDateString()
                        bookings[booking]["endDate"] = endDate.toDateString()
                        bookings[booking]["bookingId"] = booking
                        formattedData.push(bookings[booking])
                    }
                }
                setDataTable(formattedData)
                // console.log(formattedData)
            })
            .catch(error => {
                console.log(error)
                setErrorMessage(["Cannot load user data"])
                setIserror(true)
            })
    }, [])

    useEffect(() => {
        getUserRoomBookings(session.user.id)
            .then(res => {
                console.log(res)

                let formattedData = []
                for (let bookings of res) {
                    // console.log(bookings)
                    for (let booking in bookings) {
                        // console.log(bookings[booking])
                        let startDate = new Date(bookings[booking]["startDate"])
                        let strTime = formatDate(startDate)

                        bookings[booking]["startDate"] = startDate.toDateString()
                        bookings[booking]["time"] = strTime
                        bookings[booking]["bookingId"] = booking

                        formattedData.push(bookings[booking])
                    }
                }
                setDataRoom(formattedData)
                // console.log(formattedData)
            })
            .catch(error => {
                console.log(error)
                setErrorMessage(["Cannot load user data"])
                setIserror(true)
            })
    }, [])

    const formatDate = (date) => {

        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;

        // get from DB max time booked for rooms vvvvvv to be dynamic
        let endDate = new Date(date);
        endDate.setMinutes(endDate.getMinutes() + 30)

        var endHours = endDate.getHours();
        var endMinutes = endDate.getMinutes();
        var ampm = endHours >= 12 ? 'PM' : 'AM';
        endHours = endHours % 12;
        endHours = endHours ? endHours : 12; // the hour '0' should be '12'
        endMinutes = endMinutes < 10 ? '0'+endMinutes : endMinutes;
        var endTime = endHours + ':' + endMinutes + ' ' + ampm;

        let timeRange = strTime + " - " + endTime
        return timeRange;
    }


    const removeFromRendered = (bookingId, tableOrRoom) => {

        if (tableOrRoom === "table") {
            let removeIndex = dataTable.map(function(item) { return item.bookingId; }).indexOf(bookingId);
            let dataCopy = dataTable.slice()
            dataCopy.splice(removeIndex, 1)
            setDataTable(dataCopy)

        } else if (tableOrRoom === "room") {
            let removeIndex = dataRoom.map(function(item) { return item.bookingId; }).indexOf(bookingId);
            let dataCopy = dataRoom.slice()
            dataCopy.splice(removeIndex, 1)
            setDataRoom(dataCopy)
        }


        
    }

    return (
        <>
            <NavbarBS />

            <div className={styles.tableContainer}>
                <div className={styles.materialTable}>
                    <MaterialTable
                        components={{
                            Container: props => <Paper {...props} elevation={1}/>
                        }}
                        className={styles.materialTable}
                        title="Table Bookings"
                        columns={columns}
                        data={dataTable}
                        icons={tableIcons}
                        style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0), rgba(235, 246, 253, 1))'}}
                        options={{ 
                            // paging: false, 
                            // filtering: true,
                            actionsColumnIndex: -1, 
                            pageSize: 10,
                            headerStyle: {
                                backgroundColor: 'rgba(0,165,228,0.25)',
                                fontWeight: 'bold',
                            }
                        }}
                        editable={{
                            onRowDelete: (oldData) =>
                                new Promise(async (resolve) => {
                                    console.log(oldData.bookingId)
                                    await deleteTableBooking(oldData.bookingId)
                                    removeFromRendered(oldData.bookingId, "table")
                                    resolve()
                                }),
                        }}
                        localization={{ body: { 
                            editRow: { deleteText: 'Are you sure you want to delete this booking?' } ,
                            emptyDataSourceMessage: "You currently have no table bookings"
                        } 
                    }}

                    />
                </div>

                <div className={styles.materialTable}>
                    <MaterialTable
                        components={{
                            Container: props => <Paper {...props} elevation={1}/>
                        }}
                        title="Room Bookings"
                        columns={columnsRoom}
                        data={dataRoom}
                        icons={tableIcons}
                        style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0), rgba(235, 246, 253, 1))'}}
                        options={{ 
                            // paging: false, 
                            // filtering: true,
                            actionsColumnIndex: -1,
                            pageSize: 10,
                            headerStyle: {
                                backgroundColor: 'rgba(0,165,228,0.25)',
                                fontWeight: 'bold',
                            }
                        }}
                        editable={{
                            onRowDelete: (oldData) =>
                                new Promise(async (resolve) => {
                                    console.log(oldData.bookingId)
                                    await deleteRoomBooking(oldData.bookingId)
                                    removeFromRendered(oldData.bookingId, "room")
                                    resolve()
                                }),
                        }}
                        localization={{ body: { 
                                            editRow: { deleteText: 'Are you sure you want to delete this booking?' } ,
                                            emptyDataSourceMessage: "You currently have no room bookings"
                                        } 
                                    }}

                    />
                </div>
            </div>
        </>
    );
}
App.auth = true;

