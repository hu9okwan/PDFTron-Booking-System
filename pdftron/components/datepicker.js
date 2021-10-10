import React, {useState} from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/Book.module.css"


// This was completed with the help of https://www.npmjs.com/package/react-datetime-picker
// see the above website for more documentation
// also, https://retool.com/blog/how-to-use-react-datepicker-to-build-better-internal-apps/

// TODO:
// - Make sure user cant pick previous dates
// - enforce constraints
// - implement hours for rooms

export default function TableDatePicker() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div className={styles.datePickerContainer}>
            <DatePicker
                className={styles.datePicker}
                showTimeSelect
                dateFormat="MMM d, yyyy"
                selected={startDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                onChange={date => setStartDate(date)}
            />
            <DatePicker
                className={styles.datePicker}
                showTimeSelect
                dateFormat="MMM d, yyyy"
                selected={endDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                onChange={date => setEndDate(date)}
            />
        </div>
    );
}
