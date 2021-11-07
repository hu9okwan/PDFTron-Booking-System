import firebase from "firebase/compat/app";
import {getDatabase, ref, child, get, onValue} from 'firebase/database'
import initFirebase from "./initFirebase"

initFirebase();
const db = getDatabase();


export const deleteTableBooking = async (tableBookingID) => {
    remove(ref(db, 'tables/booking/' + tableBookingID));
    console.log("Successfully delete this tableBookingID")
};


export const deleteRoomBooking = async (tableBookingID) => {
    remove(ref(db, 'rooms/bookings/' + tableBookingID));
    console.log("Successfully delete this room Booking")
};
