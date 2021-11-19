import React, { useState, useEffect, forwardRef } from "react";
import styles from '../styles/Table.module.css'
import { NavbarBS } from "../components/NavbarBS";
import { getAllUsers, getAllTeams, updateUserInfo } from "../database/databaseCRUD";
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

    let test = {0: 'Web'}



    const [dataUsers, setDataUsers] = useState([]); // table data
    const [dataTeams, setDataTeams] = useState({});

    //for error handling
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessage] = useState([])

    useEffect(() => {
        getSetTeams()
        initializeTableData()
    }, [])



    const getSetTeams = async () => {
        // creates a mapping for 'lookup' property in columns {0: "Web", 1: "Finance", ...}
        const allTeams = await getAllTeams()
    
        let teamObj = {}
        for (let team of allTeams) {
            teamObj[team.id] = team.name
        }
        console.log(teamObj)
        setDataTeams(teamObj)
        
    }
    

    const initializeTableData = () => {
        getAllUsers()
        .then(allUsers => {
            // console.log(allUsers)

            getAllTeams().then(allTeams => {

                let formattedData = []
                for (let user of allUsers) {

                    // for (let team of allTeams) {
                    //     if (team.id === user["teamId"]) {
                    //         user["teamName"] = team.name
                    //     }
                    // }
                    formattedData.push(user)
                }
                setDataUsers(formattedData)
                // console.log(formattedData)
            })
            .catch(error => {
                console.log(error)
                setErrorMessage(["Cannot load user data"])
                setIserror(true)
            })
        })
    }


    const removeFromRendered = (userId) => {

        let removeIndex = dataUsers.map(function(item) { return item.userId; }).indexOf(userId);
        let dataCopy = dataUsers.slice()
        dataCopy.splice(removeIndex, 1)
        setDataUsers(dataCopy)
        
    }

    var columns = [
        { title: "User ID", field: "id", editable: "never", defaultSort: "asc"},
        { title: "Name", field: "name", },
        { title: "Email", field: "email",},
        { title: "Team", field: "teamId", lookup: dataTeams},
        { title: "Admin Privileges", field: "isAdmin", type: "boolean"},
    ]

    return (
        <>
            <NavbarBS />

            <div className={styles.tableContainer, styles.userTableContainer}>
            <MaterialTable
                components={{
                    Container: props => <Paper {...props} elevation={1}/>
                }}
                title="All Users"
                columns={columns}
                data={dataUsers}
                icons={tableIcons}
                style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0), rgba(235, 246, 253, 1))'}}
                options={{ 
                    // paging: false, 
                    actionsColumnIndex: -1, 
                    pageSize: 10,
                    headerStyle: {
                        backgroundColor: 'rgba(0,165,228,0.25)',
                        fontWeight: 'bold',
                    }
                }}
                // tableLayout="fixed"
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise(async (resolve) => {
                            await updateUserInfo(newData)
                            console.log(newData)
                            initializeTableData()
                            resolve()
                    }),
                    // onRowDelete: (oldData) =>
                    //     new Promise(async (resolve) => {
                    //         console.log(oldData.userId)
                    //         // await deleteUser(oldData.userId)
                    //         removeFromRendered(oldData.userId)
                    //         resolve()
                    // }),
                }}
                localization={{ body: { 
                    editRow: { deleteText: "Are you sure you want to delete this user? WARNING: All their existing bookings will be deleted." }
                } 
            }}

            />

            </div>
        </>
    );
}
App.auth = true;

