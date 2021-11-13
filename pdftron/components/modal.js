import React, {useState, useRef, useEffect} from "react";
import TableDatePicker from "./datepicker";
import styles from "../styles/Book.module.css"
import {createTableBooking, getAllTableBookings, createRoomBooking} from "../database/databaseCRUD";
import { Button } from "@chakra-ui/react"
import { set } from "@firebase/database";


const Modal = ({ tableID, roomID, team, toggle, bookedTables, bookedRoomTimes, setBookedTables }) => {
    const closeModal = () => {
        toggle();
    };
    //tableId, startDate, endDate, userID
    const submitBooking = () => {
        // change 1 to userID whenever sessions are implemented
        // console.log(startDate, endDate, tableID, team);
        if (!startDate) {
            alert("bruh it literally tells u to select a date")
            reloadTables()
        } else if (roomID) {
            // alert("not implemented yet 😞")
            createRoomBooking(roomID, startDate, 1).then(message => {
                console.log(message)
                alert(message)
                reloadTables()
            })
        } else if (tableID) {
            createTableBooking(tableID, startDate, endDate, 1).then(message => {
                console.log(message)
                alert(message)
                setStartDate(false)
                setEndDate(false)
                reloadTables()
            })
        }
    };

    const reloadTables = async () => {
        const res = await Promise.resolve(getAllTableBookings());
        setBookedTables(res);
    }
      

    const checkKey = (e) => {
        if (e.key === 'Escape') {
            closeModal()
            document.removeEventListener('keydown', checkKey)
        }
    }
    document.addEventListener('keydown', checkKey)


    // click outside modal to close 
    const modal = useRef(null);
    useEffect(() => {
        window.onclick = function(event) {
            if (event.target == modal.current) {
              closeModal()
            }
        }
    })


    const [startDate, setStartDate] = useState(false);
    const [endDate, setEndDate] = useState(false);


    const StartDateRender = () => {
        if (startDate && tableID) {
            return (
            `${startDate.toDateString()}`
            )
        } else if (startDate && roomID) {
            return (
            `${startDate.toDateString()}`
            )
        } else {
            return (
            `📆 Select a date 📆`
            )
        }
    }

    const EndDateRender = () => {
        if (endDate && tableID) {
            return (
                <>
                <div>to</div>
                <div>{endDate.toDateString()}</div>
                </>
            )
        } else if (startDate && roomID) {
            return (
                <>
                <div>{formatDate(startDate)}</div>
                <br/>
                </>
            )
        } else {
            return (
                <><br/><br/></>
            )
        }
    }

    function formatDate(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

    return (

        <div className={styles.modal} ref={modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={closeModal}>
                    &times;
                </span>

                <div className={styles.selectContainer}>
                    <TableDatePicker isModal={true} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} tableID={tableID} roomID={roomID} bookedTables={bookedTables} bookedRoomTimes={bookedRoomTimes}
                        timeSelect={tableID ? false : true} />
                    <div className={styles.tableInfo}>
                        <h3 style={{textAlign: "center"}}>
                            {tableID ? `${team} Table ${tableID}` : `${team} Room ${roomID}`}
                        </h3>
                        &nbsp;
                        <div>
                        <StartDateRender />
                        </div>
                        <EndDateRender />
                        
                        &nbsp;
                        <Button className={styles.bookButton}
                            onClick={submitBooking}>Book</Button>
                    </div>
                </div>
                
            </div>



        </div>
    );

}

export default Modal
