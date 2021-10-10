import React, {Component} from "react";
import TableDatePicker from "./datepicker";
import styles from "../styles/Book.module.css"

export default class PopUp extends Component {
    handleClick = () => {
        this.props.toggle();
    };

    render() {
        return (

                <div className={styles.modal}>
                    <span className={styles.close}
                          onClick={this.handleClick}>&times;    </span>
                    <div className={styles.selectContainer}>
                        <TableDatePicker></TableDatePicker>
                    </div>
                    <button className={styles.bookButton}>Book</button>
                </div>
        );
    }
}
