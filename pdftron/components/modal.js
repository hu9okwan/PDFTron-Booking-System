import React, {useState} from "react";
import TableDatePicker from "./datepicker";
import styles from "../styles/Book.module.css"
import {createTableBooking} from "../database/databaseCRUD";
import { Button } from "@chakra-ui/react"



const Modal = ({ tableID, roomID, team, toggle, bookedTables }) => {
    const closeModal = () => {
        toggle();
    };
    //tableId, startDate, endDate, userID
    const submitBooking = () => {
        // change 1 to userID whenever sessions are implemented
        // console.log(startDate, endDate, tableID, team);
        createTableBooking(tableID, startDate, endDate, 1).then(message => console.log(message))
    };

    const checkKey = (e) => {
        if (e.key === 'Escape') {
            closeModal()
            document.removeEventListener('keydown', checkKey)
        }
    }
    document.addEventListener('keydown', checkKey)

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (

        <div className={styles.modal}>
            <span className={styles.close} onClick={closeModal}>
                &times;
            </span>
            <div className={styles.selectContainer}>
                <TableDatePicker className={styles.datePicker} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} tableID={tableID} bookedTables={bookedTables} 
                    timeSelect={tableID ? false : true}></TableDatePicker>
            </div>
            <div>
                {tableID ? `Table ID: ${tableID}` : `Room ID: ${roomID}`}
                </div>
            <div>{team}</div>

            <Button className={styles.bookButton}
                    onClick={submitBooking}>Book</Button>
        </div>
    );

}

export default Modal
