import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { NavbarBS } from '../components/NavbarBS';
import styles from "../styles/Book.module.css"
import "../styles/Book.module.css"

import Modal from "../components/modal";
// const jsonObj = require('../public/tempJSON.json');
import { getFloorPlan, getAllTableBookings, getAllRoomBookings, getUserId , getAllTeams, getAllUsers} from "../database/databaseCRUD";
const jsonObj = require('../public/tempJSON.json');
import  { useSession }  from 'next-auth/react';
import TableDatePicker from "../components/datepicker";


// console.log(useSession.user.email); // ty ty
// and this is it right for book. ok ty



 export default function Book() {
    const { data: session } = useSession()


    // // get userId this way if getting it from session doesnt work from _app.js
    // const [userId, setUserId] = useState()

    // useEffect(() => {
    //     let active = true;
    //     load()
    //     return () => { active = false }

    //     async function load() {
    //         if (session) {
    //             const res = await Promise.resolve(getUserId(session.user.email));
    //             if (!active) { return }
    //             setUserId(res);
    //         }
    //     }
    // }, [])

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
            backgroundImage: '/public/office-outline.png'
        })
    );


    const [rectData, setRectData] = useState (
        {
            tableId: undefined,
            roomId: undefined,
            team: undefined,
            teamId: undefined
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

    const [bookedRoomTimes, setBookedRoomTimes] = useState()


    const [selectedDate, setSelectedDate] = useState(new Date());

    const [dataTeams, setDataTeams] = useState({});
    const [dataTeamsColours, setDataTeamsColours] = useState({});


    useEffect(() => {
        if (canvas) {
            getSetTeams().then((teamObj) => {

                loadMap(canvas)
                canvas.hoverCursor = 'pointer';
                clickTable(canvas, teamObj);
                panningZoom(canvas)

                getAllUsers().then(allUsers => {
                    let userData = []

                    for (let user of allUsers) {
                        let tempUserObj = {
                            userId: user.id,
                            userName: user.name
                        }
                        userData.push(tempUserObj)
                    }
                    hoverTable(canvas, teamObj, userData)
                })
            })
        }
    }, [canvas]);


    const getSetTeams = async () => {
        // creates a mapping {0: "Web", 1: "Finance", ...}
        const allTeams = await getAllTeams()

        let teamObj = {}
        let teamColours = {}
        for (let team of allTeams) {
            teamObj[team.id] = team.name
            teamColours[team.id] = team.colour
        }
        // console.log(teamObj)
        setDataTeams(teamObj)
        setDataTeamsColours(teamColours)

        return teamObj

    }

    // const [userData, setUserData] = useState()

    // useEffect(() => {
    //     let active = true;
    //     load()
    //     return () => { active = false }

    //     async function load() {
    //         if (session) {
    //             const allUsers = await Promise.resolve(getAllUsers());
    //             let formattedData = []
    //             for (let user of allUsers) {
    //                 let tempUserObj = {
    //                     userId: user.id,
    //                     userName: user.name
    //                 }
    //                 formattedData.push(tempUserObj)
    //             }
    //             if (!active) { return }
    //             setUserData(formattedData);
    //         }
    //     }
    // }, [])


    const loadMap = async (canvas) => {
        getFloorPlan().then( floorPlan => {
            canvas.loadFromJSON(floorPlan, canvas.renderAll.bind(canvas), function (o, object) {
                object.set("selectable", false);
            })
            return canvas
        }).then(async () => {
            const res = await Promise.resolve(getAllTableBookings());
            setBookedTables(res);
            const res2 = await Promise.resolve(getAllRoomBookings());
            setBookedRoomTimes(res2);
            // console.log(res)
            // console.log(res2)
        })
    }


    const hoverTable = (canvas, teamObj, userData) => {
        let toolTip = document.getElementById("toolTip");
        let selected_object_opacity = 0.5;
        let original_opacity
        canvas.on('mouse:over', function(e) {

            if (e.target) {
                // const status = e.target.reserved ? "Reserved" : "Available"
                const tableOrRoom = e.target.tableID ? `Table ID: ${e.target.tableID}` : `Room ID: ${e.target.roomID}`
                let userName

                console.log(e.target.userId)
                for (let user of userData) {
                    if (user.userId === e.target.userId) {
                        console.log(user.userId)
                        userName = user.userName
                    }
                }
                const bookedBy = userName ? `Booked by: ${userName}` : ""
                toolTip.innerText =
                    `${tableOrRoom}
                    Team: ${teamObj[e.target.teamId]}
                    Status: ${e.target.status}
                    ${bookedBy}`

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


    const clickTable = (canvas, teamObj) => {
        canvas.on('mouse:up', function(e) {
            //check if user clicked an object
            if (e.target) {
                //clicked on object
                let selectedRectData = {
                    tableId: e.target.tableID,
                    roomId: e.target.roomID,
                    team: teamObj[e.target.teamId],
                    teamId: e.target.teamId
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
            let bookedTableInfo = filterBookingDate(selectedDateCopy)
            console.log(bookedTableInfo)
            let tables = canvas._objects

            if (tables !== undefined) {
                for (let table of tables) {

                    let fillColour;
                    let userId
                    bookedTableInfo.some(e => {
                        if (e.tableId === table["tableID"]) {
                            userId = e.userId
                        }
                    })
                    if (userId) {
                        fillColour = "#FF5C5B"
                        table["status"] = "Booked"
                        table["userId"] = userId
                    } else {
                        fillColour = dataTeamsColours[table["teamId"]]
                        if (table["teamId"] === 0) {
                            table["status"] = "Reserved"
                        } else {
                            table["status"] = "Available"
                        }
                    }

                    table.set("fill", fillColour)
                }
            }
            canvas.renderAll()
        }
    }

    const panningZoom = (canvas) => {

        // canvas.on('mouse:wheel', function(opt) {
        //     var delta = opt.e.deltaY;
        //     var zoom = canvas.getZoom();
        //     zoom *= 0.999 ** delta;
        //     if (zoom > 20) zoom = 20;
        //     if (zoom < 0.01) zoom = 0.01;
        //     canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        //     opt.e.preventDefault();
        //     opt.e.stopPropagation();
        //     var vpt = this.viewportTransform;
        //     if (zoom < 0.4) {
        //       vpt[4] = 200 - 800 * zoom / 2;
        //       vpt[5] = 200 - 800 * zoom / 2;
        //     } else {
        //       if (vpt[4] >= 0) {
        //         vpt[4] = 0;
        //       } else if (vpt[4] < canvas.getWidth() - 800 * zoom) {
        //         vpt[4] = canvas.getWidth() - 800 * zoom;
        //       }
        //       if (vpt[5] >= 0) {
        //         vpt[5] = 0;
        //       } else if (vpt[5] < canvas.getHeight() - 800 * zoom) {
        //         vpt[5] = canvas.getHeight() - 800 * zoom;
        //       }
        //     }
        //   });
          canvas.on('mouse:down', function(opt) {
            var evt = opt.e;
            if (!opt.target) {
                canvas.setCursor("grabbing")
              this.isDragging = true;
              this.selection = false;
              this.lastPosX = evt.clientX;
              this.lastPosY = evt.clientY;
            }
          });
          canvas.on('mouse:move', function(opt) {
            if (this.isDragging) {
              var e = opt.e;
              var zoom = canvas.getZoom();
              var vpt = this.viewportTransform;
              if (zoom < 0.4) {
                vpt[4] = 200 - 800 * zoom / 2;
                vpt[5] = 200 - 800 * zoom / 2;
              } else {
                vpt[4] += e.clientX - this.lastPosX;
                vpt[5] += e.clientY - this.lastPosY;
                if (vpt[4] >= 0) {
                  vpt[4] = 0;
                } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
                  vpt[4] = canvas.getWidth() - 1000 * zoom;
                }
                if (vpt[5] >= 0) {
                  vpt[5] = 0;
                } else if (vpt[5] < canvas.getHeight() - 800 * zoom) {
                  vpt[5] = canvas.getHeight() - 800 * zoom;
                }
              }
              this.requestRenderAll();
              this.lastPosX = e.clientX;
              this.lastPosY = e.clientY;
            }
          });
          canvas.on('mouse:up', function(opt) {
            this.setViewportTransform(this.viewportTransform);
            this.isDragging = false;
            this.selection = true;
          });
    }


    function filterBookingDate(date) {
        let tableBookingsInfo =  []

        for (let bookings of bookedTables) {
            for (let booking in bookings) {
                if (bookings[booking] !== undefined) {

                    let bookingStartDate = new Date(bookings[booking]["startDate"])
                    bookingStartDate.setHours(0,0,0,0)
                    let bookingEndDate = new Date(bookings[booking]["endDate"])
                    bookingEndDate.setHours(0,0,0,0)

                    let dateRangeArr = dateRange(bookingStartDate, bookingEndDate)

                    if (dateRangeArr.includes(date.getTime())) {
                        let bookingInfoObj = {
                            tableId: bookings[booking]["tableId"],
                            userId: bookings[booking]["userId"]
                        }
                        tableBookingsInfo.push(bookingInfoObj)
                    }
                }
            }
        }
        return tableBookingsInfo
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


    const changeDate = (move) => {
        const today = new Date()
        today.setHours(0,0,0,0)

        let selectedDateCopy = new Date(selectedDate)
        selectedDateCopy.setHours(0,0,0,0)

        if (selectedDateCopy.getTime() === today.getTime() && move === "prev") {
            return
        }
        if (move === "prev") {
            selectedDateCopy.setDate(selectedDateCopy.getDate() - 1)
            setSelectedDate(selectedDateCopy)
        } else if (move === "next") {
            selectedDateCopy.setDate(selectedDateCopy.getDate() + 1)
            setSelectedDate(selectedDateCopy)
        }

    }

    return (
        <div>
            <div className={styles.flexContainer}>
                <div className={styles.prevNextContainer}>
                    <button style={{all: "unset", cursor: "pointer", transform: `rotate(180deg)`}} onClick={() => changeDate("prev")}><img src="../next.png" height="40px" width="40px" /></button>
                    <TableDatePicker isModal={false} startDate={selectedDate} setStartDate={setSelectedDate} timeSelect={false} onChange={updateMap(selectedDate, canvas)} bookedTables={[]}/>
                    <button style={{all: "unset", cursor: "pointer"}} onClick={() => changeDate("next")}><img src="../next.png" height="40px" width="40px" /></button>
                </div>
                <canvas id="canvas" className={styles.canvas}></canvas>
                <span id="toolTip" className={styles.toolTip}></span>
                {state.seen ? <Modal userId={session.user.id} userTeamId={session.user.teamId} userEmail={session.user.email} tableId={rectData.tableId} roomId={rectData.roomId} team={rectData.team} tableTeamId={rectData.teamId} bookedTables={bookedTables} bookedRoomTimes={bookedRoomTimes} toggle={togglePop} setBookedTables={setBookedTables} setBookedRoomTimes={setBookedRoomTimes}>


                </Modal> : null}
            </div>
        </div>

    );
}
Book.auth = true
