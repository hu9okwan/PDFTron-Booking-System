import React, {useState, useRef, useEffect} from "react";
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


    // click outside modal to close 
    const modal = useRef(null);
    useEffect(() => {
        window.onclick = function(event) {
            if (event.target == modal.current) {
              closeModal()
            }
        }
    })


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    return (

        <div className={styles.modal} ref={modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={closeModal}>
                    &times;
                </span>

                <div className={styles.selectContainer}>
                    <TableDatePicker isModal={true} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} tableID={tableID} bookedTables={bookedTables} 
                        timeSelect={tableID ? false : true} />
                    <div className={styles.tableInfo}>
                        <h3 style={{textAlign: "center"}}>
                            {tableID ? `${team} Table ${tableID}` : `${team} Room ${roomID}`}
                        </h3>
                        &nbsp;
                        <div>{startDate.toDateString()}</div>
                        to
                        <div>{endDate ? endDate.toDateString() : startDate.toDateString()}</div>
                        &nbsp;
                        <Button className={styles.bookButton}
                            onClick={submitBooking}>Book</Button>
                    </div>
                </div>
                

                {/* <div className={styles.buttonContainer}>
                    <Button className={styles.bookButton}
                            onClick={submitBooking}>Book</Button>
                </div> */}

            </div>
        </div>
    );

}

export default Modal
