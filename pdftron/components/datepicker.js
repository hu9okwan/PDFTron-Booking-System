import React, {useMemo} from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/Book.module.css"
import {getMaxDays} from "../database/databaseCRUD";

import TimePicker from "../components/timepicker";


// This was completed with the help of https://www.npmjs.com/package/react-datetime-picker
// see the above website for more documentation
// also, https://retool.com/blog/how-to-use-react-datepicker-to-build-better-internal-apps/

// TODO:
// - enforce constraints (should be fixed with minSelectedStart function, need to test)
//      - bug when booking between 11:30PM - 12 AM, all current day times become available
// - implement hours for rooms


// !!!!!!!!!!!!!!!!! IMPORTANT !!!!!!!!!!!!!!!!!!!!!!!
// getMaxDays() returns a promise and can be used to set max days


export default function TableDatePicker(props) {
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());





    const minSelectedStart = useMemo(() => {
        
        const todayDate = new Date();

        if(todayDate.getHours() === 23 && todayDate.getMinutes() >= 30) {
            let tomorrowDate = new Date()
            tomorrowDate.setDate(tomorrowDate.getDate() + 1)
            tomorrowDate.setHours(0,0,0,0)
            return tomorrowDate
        }
        return new Date()
    })



    const dateRange = (startDate, endDate, steps = 1) => {
        const dateArray = [];
        let currentDate = new Date(startDate);
      
        while (currentDate <= new Date(endDate)) {
          dateArray.push(new Date(currentDate));
          // Use UTC date to prevent problems with time zones and DST
          currentDate.setUTCDate(currentDate.getUTCDate() + steps);
        }
      
        return dateArray;
    }

    const excludeBookedDates = useMemo(() => {
        let excludedDates = []

        for (let bookings of props.bookedTables) {

            for (let key in bookings) {
                if (bookings[key] !== undefined && bookings[key]["tableId"] === props.tableID) {

                    let startDate = new Date(bookings[key]["startDate"])
                    let endDate = new Date(bookings[key]["endDate"])
                    
                    startDate.setHours(0,0,0,0)
                    endDate.setHours(0,0,0,0)

                    let dateRangeArray = dateRange(startDate, endDate)

                    excludedDates = [...new Set([...excludedDates,...dateRangeArray])];
                }
            }
        }

        return excludedDates
        
    }, [props.bookedTables])


    // const excludeBookedTimes = useMemo(() => {
    //     // console.log(props.bookedRoomTimes)
    //     let excludedTimes = []
    //     if (props.bookedRoomTimes !== undefined) {

    //         for (let bookings of props.bookedRoomTimes) {

    //             for (let key in bookings) {

    //                 let existingStartDate = new Date(bookings[key]["startDate"])
    //                 if (bookings[key] !== undefined && bookings[key]["roomId"] === props.roomID && props.startDate && existingStartDate !== undefined) {
    //                     // console.log(props.startDate, "*****")
    //                     if (existingStartDate.toDateString() === props.startDate.toDateString()) {
    //                         console.log("yap")
    //                         excludedTimes.push(existingStartDate);
    //                     }
    //                 }
    //             }
    //         }
    //     }

    //     // console.log(excludedTimes)
    //     return excludedTimes
    // }, [props.bookedRoomTimes, props.startDate])
    

    const onChange = (dates) => {
        // console.log(dates)
        const [start, end] = dates;
        // console.log(start)
        props.setSuccessStatus(false)
        props.setStartDate(start);
        props.setEndDate(end);
    }

    const onChange2 = date => {
        props.setStartDate(date)
        if (props.endDate <= date) {
            props.setEndDate(date)
        }
    }

    const onChangeRoom = date => {
        // console.log("yap")
        // console.log(date)
        props.setSuccessStatus(false)
        props.setStartDate(date)
    }

 
    return (
        <div className={styles.datePickerContainer}>

            <DatePicker
                className={styles.datePicker}
                // showTimeSelect={props.timeSelect}
                dateFormat={"     MMMM d, yyyy"}
                excludeDates={props.isModal && props.tableID && excludeBookedDates}
                // excludeTimes={props.isModal && excludeBookedTimes}
                selected={props.startDate}
                minDate={minSelectedStart}
                maxDate={props.isModal && props.disabled && new Date().setDate(new Date().getDate()-1)}
                // minTime={props.isModal && props.roomID && minTimeStart}
                maxTime={new Date(0, 0, 0, 23, 30)}
                startDate={props.startDate}
                endDate={props.endDate}
                inline={props.isModal}
                selectsRange={props.isModal}
                todayButton={!props.isModal && "Today"}
                onChange={(props.isModal && onChange) || onChange2}
                showTimeInput={props.isModal && props.roomID}
                timeInputLabel={false}
                customTimeInput={props.isModal && props.roomID && <TimePicker startDate={props.startDate} endDate={props.endDate} startTime={props.startTime} setStartTime={props.setStartTime} endTime={props.endTime} setEndTime={props.setEndTime}/>}
            />

        </div>
    );
}
