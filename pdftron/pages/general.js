import React, { useState, useEffect, forwardRef } from "react";
import styles from '../styles/Table.module.css'
import { NavbarBS } from "../components/NavbarBS";
git pimport {
    getUserTableBookings,
    getUserRoomBookings,
    deleteTableBooking,
    deleteRoomBooking,
    getAllTeams,
    createTeam,
    deleteTeam,
    updateUserInfo,
    updateTeamInfo,
    getAllSettings, updateSettingInfo
} from "../database/databaseCRUD";
import { useSession } from 'next-auth/react';
import MaterialTable from "material-table";
import { Paper } from '@material-ui/core';
import ReactDOM from 'react-dom'

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
    const { data: session } = useSession();
    let teamColumns = [
        { title: 'Team ID', field: 'id'},
        { title: 'Team Name', field: 'name' },
        { title: 'Team Colour', field: 'colour' },
    ];

    let bookingColumns = [
        {title: 'Setting Name', field: 'name'},
        {title: 'Setting Value', field: 'value'}
    ];


    const [dataTeams, setDataTeams] = useState([]);
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessage] = useState([]);
    const [dataSettings, setDataSettings] = useState([]);



    useEffect(() => {
        initializeTeamData();
        initializeSettings()
    }, []);

    const initializeSettings = () => {
        getAllSettings().then(
            allSettings => {
                let formattedData = [];
                for (let setting of allSettings) {
                    formattedData.push(setting)
                }
                console.log(formattedData)
                setDataSettings(formattedData)
            }
        ).catch(error => {
            console.log(error);
            setErrorMessage(["Cannot load user data"]);
            setIserror(true)
        })
    };

    const initializeTeamData = () => {
      getAllTeams().then(
          allTeams => {
              let formattedData = [];
              for (let team of allTeams) {
                  formattedData.push(team)
              }
              setDataTeams(formattedData)
          }
      ).catch(error => {
            console.log(error);
            setErrorMessage(["Cannot load user data"]);
            setIserror(true)
          }
      )

    };

    const rerenderDelete = (id) => {
        let removeIndex = dataTeams.map(function(item) { return item.id; }).indexOf(id);
        let dataCopy = dataTeams.slice();
        dataCopy.splice(removeIndex, 1);
        setDataTeams(dataCopy)
    };


    return (
        <div className={styles.settings}>
            <h3>General Settings<hr></hr></h3>
            <div style={{ maxWidth: '100%' }}>
                <MaterialTable
                    title="General Settings"
                    columns={bookingColumns}
                    icons={tableIcons}
                    data={dataSettings}
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
                        onRowUpdate: (newData) =>
                            new Promise(async (resolve) => {
                                await updateSettingInfo(newData);
                                console.log(newData)
                                initializeSettings()
                                resolve()
                            }),
                    }}
                />
            </div>
            <div style={{ maxWidth: '100%' }}>
                <MaterialTable
                    title="Teams"
                    columns={teamColumns}
                    icons={tableIcons}
                    data={dataTeams}
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
                                console.log(oldData.id);
                                await deleteTeam(oldData.id);
                                rerenderDelete(oldData.id);
                                resolve()
                            }),
                        onRowUpdate: (newData) =>
                            new Promise(async (resolve) => {
                                await updateTeamInfo(newData);
                                console.log(newData);
                                initializeTeamData();
                                resolve()
                            }),
                        onRowAdd: () =>
                            new Promise(async (resolve) => {
                                initializeTeamData()
                                resolve()
                            })
                    }}
                    localization={{
                        body: {
                            editRow: {deleteText: 'Are you sure you want to delete this team?'},
                        }
                    }}

                />
            </div>
        </div>

    )

}
App.auth = true;
