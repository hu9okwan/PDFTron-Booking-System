import React, {useMemo, useState, useEffect} from 'react'  
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/Book.module.css"


export default function TimePicker(props) {


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

        let minStartTime = new Date(props.startDate).setHours(0, 0, 0, 0)
        return minStartTime;
    }, [props.startDate, props.endDate]);


    // MINIMUM START TIME FOR END PICKER
    const minTimeEnd = useMemo(() => {
        // changes selectable end datetime to the set minBookTime you can book a room
        
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
            props.setEndTime(date)
            return date;
        }

        return selectedTimeEnd

    }, [props.startTime, props.endTime])


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

    const timeRange = (startTime, endTime, excludeTimesEnd, minutes = timeIntervalGap) => {
        const timeArray = [];
        let currentDate = new Date(startTime);
      
        if (excludeTimesEnd) {
            while (currentDate.getTime() <= new Date(endTime).getTime()) {
                timeArray.push(new Date(currentDate));
                // Use UTC date to prevent problems with time zones and DST
                currentDate.setUTCMinutes(currentDate.getUTCMinutes() + minutes);
            }
        } else {
            while (currentDate.getTime() != new Date(endTime).getTime()) {
                timeArray.push(new Date(currentDate));
                // Use UTC date to prevent problems with time zones and DST
                currentDate.setUTCMinutes(currentDate.getUTCMinutes() + minutes);
            }
        }
      
        return timeArray;
    }

    const areDatesSameDay = (first, second) => {
        if (first.getYear() === second.getYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()) {
            return true
        }
        return false
    }
    

    const excludeBookedTimes = useMemo(() => {
        // console.log(props.bookedRoomTimes)
        let excludedTimes = []
        if (props.bookedRoomTimes !== undefined) {

            for (let bookings of props.bookedRoomTimes) {

                for (let key in bookings) {
                    // console.log(bookings[key])

                    if (bookings[key] !== undefined && bookings[key]["roomId"] === props.roomId && props.startDate) {

                        let existingStartDate = new Date(bookings[key]["startDate"])
                        let existingEndDate = new Date(bookings[key]["endDate"])

                        // console.log(existingStartDate, "*****")

                        let timeRangeArr = timeRange(existingStartDate, existingEndDate)
                        for (let time of timeRangeArr) {
                            if (areDatesSameDay(time, props.startDate)){
                                excludedTimes.push(time)
                            }
                            if (props.endDate) {
                                let datesArr = dateRange(props.startDate, props.endDate)

                                for (let date of datesArr) {
                                    if (areDatesSameDay(date, props.endDate)){
                                        excludedTimes.push(time)
                                    }
                                }
                            }
                        }                     
                    }
                }
            }
        }

        return excludedTimes
    }, [props.bookedRoomTimes, props.startDate, props.endDate])


    // this is dupe function of above but idk how to pass variable into a useMemo hook
    // so here would have an additional time disabled on the end time picker
    const excludeBookedTimesEnd = useMemo(() => {

        let excludedTimes = []
        if (props.bookedRoomTimes !== undefined) {

            for (let bookings of props.bookedRoomTimes) {

                for (let key in bookings) {

                    if (bookings[key] !== undefined && bookings[key]["roomId"] === props.roomId && props.startDate) {

                        let existingStartDate = new Date(bookings[key]["startDate"])
                        let existingEndDate = new Date(bookings[key]["endDate"])

                        let timeRangeArr = timeRange(existingStartDate, existingEndDate, true)
                        for (let time of timeRangeArr) {
                            if (areDatesSameDay(time, props.startDate)){
                                excludedTimes.push(time)
                            }
                            if (props.endDate) {
                                let datesArr = dateRange(props.startDate, props.endDate)

                                for (let date of datesArr) {
                                    if (areDatesSameDay(date, props.endDate)){
                                        excludedTimes.push(time)
                                    }
                                }
                            }
                        }                     
                    }
                }
            }
        }

        return excludedTimes
    }, [props.bookedRoomTimes, props.startDate, props.endDate])


    const onChange = (date) => {
        props.setStartTime(date)
        props.setSuccessStatus(false)
    }

    const onChangeEnd = (date) => {
        props.setEndTime(date)
        props.setSuccessStatus(false)
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
                excludeTimes={excludeBookedTimes}
            />
            <span className={styles.toContainer}>–</span>
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
                excludeTimes={excludeBookedTimesEnd}
            />
            </div>
        </>
    );
}
