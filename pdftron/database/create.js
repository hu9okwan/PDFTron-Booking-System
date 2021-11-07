import firebase from "firebase/compat/app";
import {getDatabase, ref, child, set, onValue} from 'firebase/database'
import initFirebase from "./initFirebase"

initFirebase();
const db = getDatabase();


export const createRoomBooking = async (tableId, startDate, endDate, userID) => {
  // /reservations/4 (4 needs to be uniquely generated)
  await set(ref(db, 'tables/' + tableId + '/reservations/4' ), {
    startDate: startDate,
    endDate: endDate,
    userId: userID
  });
  console.log("Booked table")
};


export const saveToDatabase = async (tableData) => {
  await set(ref(db, 'floorplan/'), {
    data: tableData
  });
};
