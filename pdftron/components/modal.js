import React, {useState, useRef, useEffect} from "react";
import TableDatePicker from "./datepicker";
import styles from "../styles/Book.module.css"
import "../styles/Book.module.css"

import {createTableBooking, getAllTableBookings, createRoomBooking, getAllRoomBookings} from "../database/databaseCRUD";
import { set } from "@firebase/database";
import { css } from "@emotion/react";
import { SyncLoader, ClipLoader } from 'react-spinners';

const Modal = ({ userId, tableId, roomId, userTeamId, team, tableTeamId, toggle, bookedTables, bookedRoomTimes, setBookedTables, setBookedRoomTimes }) => {
    const closeModal = () => {
        toggle();
    };


    let [loading, setLoading] = useState(false);
    const override = css`
    display: flex;
    margin: 0 auto;
    justify-content: center;
    `;

    //tableId, startDate, endDate, userId
    const submitBooking = () => {
        // console.log(startDate, endDate, tableId, team);
        setLoading(true)
        // console.log(loading)
        if (!startDate) {
            return
        } else if (roomId) {
            createRoomBooking(roomId, startDate, endDate, startTime, endTime, userId).then(message => {
                if (message[0]) {
                    setSuccessStatus(true)
                    setLoading(false)
                } else {
                    setSuccessStatus(false)
                    setErrorStatus(true)
                    setLoading(false)
                }
                reloadRooms()
            })
        } else if (tableId) {
            createTableBooking(tableId, startDate, endDate, userId).then(message => {
                if (message[0]) {
                    setSuccessStatus(true)
                    console.log(message)
                    setBookedDates({
                        bookedStartDate: message[2],
                        bookedEndDate: message[3],
                        message: message[1]
                    })
                    setLoading(false)
                } else {
                    setSuccessStatus(false)
                    setErrorStatus(true)
                    setLoading(false)
                }
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

    const reloadRooms = async () => {
        const res = await Promise.resolve(getAllRoomBookings());
        setBookedRoomTimes(res);

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

    const [startTime, setStartTime] = useState(false)
    const [endTime, setEndTime] = useState(false)


    const [successStatus, setSuccessStatus] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);
    const [bookedDates, setBookedDates] = useState({});
 
    const [disabled, setDisabled] = useState(false)

    const InfoRender = () => {

        let html

        if (tableTeamId === 0) {
            setDisabled(true)
            html =  <div className={styles.dateInfoContainer}>
                        This table is unavailable for booking.
                    </div>
        } else if (tableTeamId !== userTeamId && tableTeamId !== 1) {
            setDisabled(true)
            html =  <div className={styles.dateInfoContainer}>
                        <div>This table is only bookable for</div>
                        <div>the <strong>{team}</strong> team</div>
                    </div>
        }

        else if (successStatus) {
            let startingDate
            let endingDate

            if (bookedDates.bookedStartDate) {
                startingDate = bookedDates.bookedStartDate.toDateString()
            }
            if (bookedDates.bookedEndDate) {
                endingDate = bookedDates.bookedEndDate.toDateString()
            }

            if (tableId) {
                html =  <div className={styles.dateInfoContainer}>
                            <div><strong>Booked for:</strong></div>
                            <div>
                                {startingDate}
                            </div>
                            { startingDate === endingDate ? <> </> :
                            <>
                            <div>
                                to
                            </div>
                            <div>
                                {endingDate}
                            </div> 
                            </>
                            }
                        </div>
            } else if (roomId) {
                html = <div className={styles.dateInfoContainer}>
                            <div><strong>Booked for:</strong></div>
                            <div>
                                {startDate.toDateString()}
                            </div>
                            <div>
                                {/* {formatDate(startDate)} */}
                            </div>
                        </div>
            }
        } else if (errorStatus) {
            html =  <div className={styles.dateInfoContainer}>
                        ⚠️ Selected date(s) are unavailable.
                    </div>
        } else if (endDate && (tableId || roomId)) {
            html =  <div className={styles.dateInfoContainer}>
                        <div>
                            {startDate.toDateString()}
                        </div>
                        <div>
                            to
                        </div>
                        <div>
                            {endDate.toDateString()}
                        </div>
                    </div>

        } 
        // else if (startDate && roomId) {
        //     html =  <div className={styles.dateInfoContainer}>
        //                 <div>
        //                     {startDate.toDateString()}
        //                 </div>
        //                 <div>
        //                     {formatDate(startDate)}
        //                 </div>
        //             </div>
        // } 
        else if (startDate && (tableId || roomId)) {
            
            html =  <div className={styles.dateInfoContainer}>
                        {startDate.toDateString()}
                    </div>
        } else {
            html =  <div className={styles.dateInfoContainer}>
                        📆 Select a date
                    </div>
        } 

        return html
    }

    const ButtonRender = () => {
        if (successStatus) {
            return (
                <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className={styles.checkmark__circle} cx="26" cy="26" r="25" fill="none"/>
                    <path className={styles.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
            )
        } else if (loading) {
            return (
                // <SyncLoader color={"#00a5e4"} css={override} size={10} margin={5}/>
                <ClipLoader color={"#00a5e4"} css={override} size={45}/>
                

            )
        } else if (tableTeamId === 0 || (tableTeamId !== userTeamId && tableTeamId !== 1)) {
            return (
                <></>
            )
        } else {
            return (
                <button className={styles.bookBtn} disabled={!startDate} onClick={submitBooking}>Book</button>
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
                    <TableDatePicker isModal={true} disabled={disabled} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} tableId={tableId} roomId={roomId} bookedTables={bookedTables} bookedRoomTimes={bookedRoomTimes}
                        timeSelect={tableId ? false : true} 
                        setSuccessStatus={setSuccessStatus}
                        startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime}
                        />
                    <div className={styles.tableInfo}>
                        <h3 style={{textAlign: "center"}}>
                            {tableId ? `${team} Table ${tableId}` : `${team} Room ${roomId}`}
                        </h3>

                        <InfoRender />
                        <div className={styles.modalBtnContainer}>
                        <ButtonRender />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Modal
