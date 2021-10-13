import React, {Component} from "react";
import TableDatePicker from "./datepicker";
import styles from "../styles/Book.module.css"

export default class PopUp extends Component {
    closeModal = () => {
        this.props.toggle();
    };

    submitBooking = () => {
        console.log("hello noobland")
    }

    render() {
        return (

                <div className={styles.modal}>
                    <span className={styles.close}
                          onClick={this.closeModal}>&times;    </span>
                    <div className={styles.selectContainer}>
                        <TableDatePicker></TableDatePicker>
                    </div>
                    <button className={styles.bookButton}
                        onClick={this.submitBooking}>Book</button>
                </div>
        );
    }
}
