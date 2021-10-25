import React, {useState} from "react";
import TableDatePicker from "./datepicker";
import styles from "../styles/Book.module.css"


const Modal = ({ tableID, team, toggle }) => {
    const closeModal = () => {
        toggle();
    };

    const submitBooking = () => {
        console.log(startDate, endDate, tableID, team)
    }


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
