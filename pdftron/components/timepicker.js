import React, {useMemo, useState, useEffect} from 'react'  
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/Book.module.css"


export default function TimePicker(props) {



    
    // potential way to store the time
    
    // set startDate to the startTime selected
    // set endDate to the endTime selected
    
    const timeIntervalGap = 60


    const minTimeStart = useMemo(() => {
        // restricts selecting times before current time if startDate is today

        const todayDate = new Date();
        const selectedStartDate = new Date(props.startDate);
        const selectedEndDate = new Date(props.endDate);
        
        // When current date is selected, disable previous times from now
        if (selectedStartDate.setHours(0,0,0,0) === todayDate.setHours(0,0,0,0) &&
            (!props.endDate || selectedEndDate.setHours(0,0,0,0) === todayDate.setHours(0,0,0,0))) {
            return new Date();
        } 
        // else if (selectedStartDate.setHours(0,0,0,0) === todayDate.setHours(0,0,0,0) && 
        //          selectedEndDate.setHours(0,0,0,0) !== todayDate.setHours(0,0,0,0)) {

        //     return 
        // }



        let minStartTime = new Date(props.startDate).setHours(0, 0, 0, 0)
        return minStartTime;
    }, [props.startDate, props.endDate]);


    // MINIMUM START TIME FOR END PICKER
    const minTimeEnd = useMemo(() => {
        // changes selectable end datetime to the set minBookTime you can book a room
        
        console.log(props.startTime)
        if (props.startTime) {
            const minStartTime = new Date(props.startTime);
            minStartTime.setMinutes(props.startTime.getMinutes() + timeIntervalGap)
            return minStartTime
        }


        return new Date().setHours(0,0,0,0);

    }, [props.startTime, props.endTime]);


    const minSelectedEnd = useMemo(() => {
        // changes selected end datetime to be after the selected start datetime if start datetime is after end datetime

        const selectedTimeStart = new Date(props.startTime);
        const selectedTimeEnd = new Date(props.endTime);

        if (!props.startTime) {
            return false
        }

        else if (props.startTime && (selectedTimeStart.getTime() >= selectedTimeEnd.getTime())) {
            let date = new Date(props.startTime)
            date.setMinutes(props.startTime.getMinutes() + timeIntervalGap)
            // console.log(date, "****")
            return date;
        }

        return selectedTimeEnd

    }, [props.startTime, props.endTime])



    const onChange = (date) => {
        // maybe grab time from date here and replace the startDate's time with it
        props.setStartTime(date)
    }

    const onChangeEnd = (date) => {
        props.setEndTime(date)
    }

    return (
        <>
            <div className="timepickerContainer">
            <DatePicker
                onChange={onChange}
                selected={props.startTime}
                showTimeSelect
                showTimeSelectOnly
                minTime={minTimeStart}
                maxTime={new Date().setHours(23, 59, 59, 59)}
                timeIntervals={timeIntervalGap}
                timeCaption="Start"
                dateFormat="h:mm aa"
                disabled={!props.startDate}
                placeholderText="Start time"
            />
            <span className={styles.toContainer}>~</span>
            <DatePicker
                onChange={onChangeEnd}
                showTimeSelect
                showTimeSelectOnly
                selected={minSelectedEnd}
                minTime={minTimeEnd}
                maxTime={new Date().setHours(23, 59, 59, 59)}
                timeIntervals={timeIntervalGap}
                timeCaption="End"
                dateFormat="h:mm aa"
                disabled={!props.startDate || !props.startTime}
                placeholderText="End time"
            />
            </div>
        </>
    );
}
