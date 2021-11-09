import React, {useState} from "react";
import TableDatePicker from "./datepicker";
import styles from "../styles/Book.module.css"
import { Button } from "@chakra-ui/react"
import {createRoomBooking} from "../database/databaseCRUD";


const Modal = ({ tableID, roomID, team, toggle }) => {
    const closeModal = () => {
        toggle();
    };
    //tableId, startDate, endDate, userID
    const submitBooking = () => {
        createRoomBooking(tableID, startDate, endDate, team).then(r => console.log(startDate, endDate, tableID, team))
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
                <TableDatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}></TableDatePicker>
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
