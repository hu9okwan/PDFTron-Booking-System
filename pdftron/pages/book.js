import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { NavbarBS } from '../components/NavbarBS';
import styles from "../styles/Book.module.css"
import Modal from "../components/modal";
// const jsonObj = require('../public/tempJSON.json');
import { getFloorPlan, isAdmin, getAllTableBookings } from "../database/databaseCRUD";
const jsonObj = require('../public/tempJSON.json');
import  { useSession }  from 'next-auth/react';

// console.log(useSession.user.email); // ty ty
// and this is it right for book. ok ty



 export default function Book() {
    const { data: session } = useSession()
    const [state, setState] = useState ({
        seen: false
    });
    const togglePop = () => {
        setState({
            seen: !state.seen
        });
    };

    const [canvas, setCanvas] = useState('');
    useEffect(() => {
        setCanvas(initCanvas());
    }, []);


    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: 800,
            width: 1000,
            backgroundImage: '../office-outline.png'
        })
    );


    const [rectData, setRectData] = useState (
        {
            tableID: undefined,
            roomID: undefined,
            team: undefined
        }
    )

    const [bookedTables, setBookedTables] = useState()
    useEffect(() => {    
        let active = true;
        load()
        return () => { active = false }
    
        async function load() {
            const res = await Promise.resolve(getAllTableBookings());
            if (!active) { return }
            setBookedTables(res);
        }
    }, [])


    useEffect(() => {
        if (canvas) {
            // loadFromSVG(canvas);
            loadMap(canvas);
            canvas.hoverCursor = 'pointer';
            clickTable(canvas);
            hoverTable(canvas);
        }
    }, [canvas]);


    const loadMap = async (canvas) => {
        getFloorPlan().then( floorPlan =>
            canvas.loadFromJSON(floorPlan, canvas.renderAll.bind(canvas), function (o, object) {
                object.set("selectable", false);
            })
        )

    }


    const hoverTable = (canvas) => {
        let toolTip = document.getElementById("toolTip");
        let selected_object_opacity = 0.5;
        let original_opacity
        canvas.on('mouse:over', function(e) {

            if (e.target) {
                const status = e.target.reserved ? "Reserved" : "Available"
                const tableOrRoom = e.target.tableID ? `Table ID: ${e.target.tableID}` : `Room ID: ${e.target.roomID}`
                toolTip.innerText =
                    `${tableOrRoom}
                    Team: ${e.target.team}
                    Status: ${status}`

                toolTip.style.visibility = 'visible'

                var offset = canvas.calcOffset();
                let left = offset._offset.left + e.target.left
                let top = offset._offset.top + e.target.top - 100
                toolTip.style.left = left + "px"
                toolTip.style.top = top + "px"


                original_opacity    = e.target.opacity;

                e.target.set('opacity', selected_object_opacity);
                canvas.renderAll();
            }
        })
        canvas.on('mouse:out', function(e) {
            if (e.target) {
                toolTip.style.visibility = 'hidden'

                e.target.set('opacity', original_opacity);
                canvas.renderAll();
            }
        })
    }


    const clickTable = (canvas) => {
        canvas.on('mouse:up', function(e) {
            //check if user clicked an object
            if (e.target) {
                //clicked on object
                let selectedRectData = {
                    tableID: e.target.tableID,
                    roomID: e.target.roomID,
                    team: e.target.team,
                    }
                setRectData(selectedRectData)
                console.log(selectedRectData)
                togglePop()

            }
        }
    )}

    function updateMap(selectedDate, canvas) {
        // find data for tables with selected date and updates their status
        let tables = canvas._objects
        if (tables !== undefined) { // change to async await so dont have to check here for initial load
            for (let table of tables) {
                // console.log(table.tableId)

                table["reserved"] = false;
                let fillColour;
                if (table["team"] === "General") {
                    fillColour = "#C7E4A7"
                } else if (table["team"] === "Web") {
                    fillColour = "#7D99E8"
                } else if (table["team"] === "Unavailable") {
                    fillColour = "#D3D3D3"
                }

                table.set("fill", fillColour)

                for (let booking in dummyData.TableBooking) {

                    // it should call function from api to check if table is booked on selected date
                    let bookingDate = dummyData.TableBooking[booking]["startDate"]
                    let bookingTableID = dummyData.TableBooking[booking]["tableID"]
                    let date = `${selectedDate.getMonth()}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`
                    let date2 = bookingDate
                    console.log("selected date:", date)
                    console.log(date2)

                    if (date === date2 && bookingTableID === table.tableId) {
                        console.log("yes")
                        table.set("reserved", true)
                        table.set("fill", "#CD5C5C")
                    }

                }

            }
            canvas.renderAll()
        }
    }


    return (
        <div>
            <NavbarBS isLoggedin={true} />
            <div className={styles.flexContainer}>
                <canvas id="canvas"></canvas>
                <span id="toolTip" className={styles.toolTip}></span>
                {state.seen ? <Modal tableID={rectData.tableID} roomID={rectData.roomID} team={rectData.team} bookedTables={bookedTables} toggle={togglePop}/> : null}
            </div>
        </div>

    );
}
Book.auth = true
