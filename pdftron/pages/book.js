import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { NavbarBS } from '../components/NavbarBS';
import styles from "../styles/Book.module.css"
import Modal from "../components/modal";
// const jsonObj = require('../public/tempJSON.json');
import { getFloorPlan, isAdmin, getAllTableBookings } from "../database/databaseCRUD";
const jsonObj = require('../public/tempJSON.json');
import  { useSession }  from 'next-auth/react';
import TableDatePicker from "../components/datepicker";


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
    // useEffect(() => {    
    //     let active = true;
    //     load()
    //     return () => { active = false }
    
    //     async function load() {
    //         const res = await Promise.resolve(getAllTableBookings());
    //         if (!active) { return }
    //         setBookedTables(res);
    //     }
    // }, [])


    const [selectedDate, setSelectedDate] = useState(new Date());
    

    useEffect(() => {
        if (canvas) {
            // loadMap(canvas).then(() => updateMap(selectedDate, canvas))
            loadMap(canvas)
            canvas.hoverCursor = 'pointer';
            clickTable(canvas);
            hoverTable(canvas);
        }
    }, [canvas]);


    const loadMap = async (canvas) => {
        getFloorPlan().then( floorPlan => {
            canvas.loadFromJSON(floorPlan, canvas.renderAll.bind(canvas), function (o, object) {
                object.set("selectable", false);
            })
            return canvas
        }).then(async () => {
            const res = await Promise.resolve(getAllTableBookings());
            setBookedTables(res);
        })
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
                // console.log(selectedRectData)
                togglePop()

            }
        }
    )}

    function updateMap(selectedDate, canvas) {
        // compare booked date with selected date for tables and updates their status/colour

        let selectedDateCopy = new Date(selectedDate)
        selectedDateCopy.setHours(0,0,0,0)

        if (bookedTables !== undefined) { 
            let bookedTableIDs = filterBookingDate(selectedDateCopy)

            let tables = canvas._objects

            if (tables !== undefined) {
                for (let table of tables) {
        
                    // grab from database instead
                    let fillColour;
                    if (bookedTableIDs.includes(table["tableID"])){
                        fillColour = "#FF5C5B"
                    } else if (table["team"] === "General") {
                        fillColour = "#C7E4A7"
                    } else if (table["team"] === "Web") {
                        fillColour = "#7D99E8"
                    } else if (table["team"] === "Unavailable") {
                        fillColour = "#D3D3D3"
                    }
        
                    table.set("fill", fillColour)
                }
            }
            canvas.renderAll()
        }
    }

    function filterBookingDate(date) {
        let tableIDArray =  []

        for (let bookings of bookedTables) {
            for (let booking in bookings) {
                if (bookings[booking] !== undefined) {

                    let bookingStartDate = new Date(bookings[booking]["startDate"])
                    bookingStartDate.setHours(0,0,0,0)                    
                    let bookingEndDate = new Date(bookings[booking]["endDate"])
                    bookingEndDate.setHours(0,0,0,0)

                    let dateRangeArr = dateRange(bookingStartDate, bookingEndDate)

                    if (dateRangeArr.includes(date.getTime())) {
                        tableIDArray.push(bookings[booking]["tableId"])
                        // console.log(bookings[booking]["tableId"])
                    }
                }
            }
        }
        return tableIDArray
    }

    const dateRange = (startDate, endDate, steps = 1) => {
        const dateArray = [];
        let currentDate = new Date(startDate);
      
        while (currentDate <= new Date(endDate)) {
            let dateEpoch = new Date(currentDate).getTime()
            dateArray.push(dateEpoch);
            // Use UTC date to prevent problems with time zones and DST
            currentDate.setUTCDate(currentDate.getUTCDate() + steps);
        }
      
        return dateArray;
    }


    return (
        <div>
            <NavbarBS isLoggedin={true} username={session.user.name} />
            <div className={styles.flexContainer}>
                <TableDatePicker isModal={false} startDate={selectedDate} setStartDate={setSelectedDate} timeSelect={false} onChange={updateMap(selectedDate, canvas)} bookedTables={[]}/>
                <canvas id="canvas"></canvas>
                <span id="toolTip" className={styles.toolTip}></span>
                {state.seen ? <Modal tableID={rectData.tableID} roomID={rectData.roomID} team={rectData.team} bookedTables={bookedTables} toggle={togglePop} setBookedTables={setBookedTables}>


                </Modal> : null}
            </div>
        </div>

    );
}
Book.auth = true
