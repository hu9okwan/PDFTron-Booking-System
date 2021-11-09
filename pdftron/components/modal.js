import React, {useState} from "react";
import TableDatePicker from "./datepicker";
import styles from "../styles/Book.module.css"
import {createTableBooking} from "../database/databaseCRUD";


const Modal = ({ tableID, team, toggle }) => {
    const closeModal = () => {
        toggle();
    };
    //tableId, startDate, endDate, userID
    const submitBooking = () => {
        // change 1 to userID whenever sessions are implemented
        // console.log(startDate, endDate, tableID, team);
        createTableBooking(tableID, startDate, endDate, 1).then(r => console.log("succesfully created booking"))
    };


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (

        <div className={styles.modal}>
                <span className={styles.close}
                      onClick={closeModal}>&times;    </span>
            <div className={styles.selectContainer}>
                <TableDatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}></TableDatePicker>
            </div>
            <div>Table ID: {tableID}</div>
            <div>{team}</div>

            <button className={styles.bookButton}
                    onClick={submitBooking}>Book</button>
        </div>
    );

}

export default Modal
