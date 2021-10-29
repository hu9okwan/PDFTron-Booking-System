import React, {useMemo} from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/Book.module.css"

// This was completed with the help of https://www.npmjs.com/package/react-datetime-picker
// see the above website for more documentation
// also, https://retool.com/blog/how-to-use-react-datepicker-to-build-better-internal-apps/

// TODO:
// - enforce constraints
//      - bug when booking between 11:30PM - 12 AM, all current day times become available
// - implement hours for rooms


export default function TableDatePicker(props) {
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());

    const minTimeStart = useMemo(() => {
        // restrcts selectable start datetime to current day with time rounded to next 30 min interval

        const todayDate = new Date();
        const selectedDate = new Date(props.startDate); // create a copy before modifying
        // When current date is selected, set minTime to next nearest 30 mins
        if(selectedDate.setHours(0,0,0,0) === todayDate.setHours(0,0,0,0)) {
            return new Date();
        }
        return new Date(0, 0, 0, 24);
    }, [props.startDate]);


    const minTimeEnd = useMemo(() => {
        // changes selectable end datetime to the set minBookTime you can book a room

        const minBookTime = 30 // in 30 minute invervals (30, 60, 90)
        
        const todayDate = new Date();
        const selectedDateStart = new Date(props.startDate); 
        const selectedDateEnd = new Date(props.endDate); 
        if(selectedDateEnd.setHours(0,0,0,0) === todayDate.setHours(0,0,0,0)
            || selectedDateEnd.setHours(0,0,0,0) === selectedDateStart.setHours(0,0,0,0)) {
            let date = new Date(props.startDate)
            date.setMinutes(props.startDate.getMinutes() + minBookTime)
            return date;
        }
        return new Date(0, 0, 0, 24);
    }, [props.startDate, props.endDate]);


    const minSelected = useMemo(() => {
        // changes selected end datetime to be after the selected start datetime if start datetime is after end datetime

        const selectedDateStart = new Date(props.startDate); 
        const selectedDateEnd = new Date(props.endDate); 
        
        if (selectedDateStart.getTime() >= selectedDateEnd.getTime()) {
            let date = new Date(props.startDate)
            date.setMinutes(props.startDate.getMinutes() + 30)
            return date;
        }
        return props.endDate
    }, [props.startDate, props.endDate])


    return (
        <div className={styles.datePickerContainer}>
            <DatePicker
                className={styles.datePicker}
                showTimeSelect
                dateFormat="MMM d, yyyy"
                selected={props.startDate}
                selectsStart
                minDate={new Date()}
                minTime={minTimeStart}
                maxTime={new Date(0, 0, 0, 23, 30)}
                startDate={props.startDate}
                endDate={props.endDate}
                onChange={date => props.setStartDate(date)}
            />
            <DatePicker
                className={styles.datePicker}
                showTimeSelect
                dateFormat="MMM d, yyyy"
                selected={minSelected}
                selectsEnd
                minTime={minTimeEnd}
                maxTime={new Date(0, 0, 0, 23, 30)}
                startDate={props.startDate}
                endDate={props.endDate}
                minDate={props.startDate}
                onChange={date => props.setEndDate(date)}
            />
        </div>
    );
}
