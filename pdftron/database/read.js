import firebase from "firebase/compat/app";
import {getDatabase, ref, child, get, onValue} from 'firebase/database'
import initFirebase from "./initFirebase"


initFirebase();
const dbRef = ref(getDatabase());

export const getRooms = async () => {
    get(child(dbRef, `rooms/`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (let i = 0; i<data.length; i++) {
                console.log(data[i].name)
            }
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
};

export const getUserTableBookings = async (userID) => {
    get(child(dbRef, `tables/`)).then((snapshot) => {
        let curBookings = [];
        if (snapshot.exists()) {
            const data = snapshot.val();


            for (let table of data) {
                for (let booking of table.bookings) {
                    if (booking.userId === userID) {
                        let ans = {table: table.id, startDate: booking.startDate, endDate: booking.endDate, teamId: table.teamId}
                        console.log(ans);
                        curBookings.push(ans);
                    }
                }
            }
        } else {
            console.log("No data available");
        }
        return curBookings;

    }).catch((error) => {
        console.error(error);
    });
};

export const getAllTableBookings = async () => {
    let allBookings = [];
    get(child(dbRef, `table/`)).then((snapshot) => {

        if (snapshot.exists()) {
            const data = snapshot.val();


            for (let table of data) {
                for (let booking of table.bookings) {
                    let ans = {table: table.id, startDate: booking.startDate, endDate: booking.endDate, teamId: table.teamId}
                    allBookings.push(ans);
                }
            }
        }
        else {
            console.log("No data available");
        }
        return allBookings;

    }).catch((error) => {
        console.error(error);
    });
};

export const getUserRoomBookings = async (userID) => {
    get(child(dbRef, `rooms/`)).then((snapshot) => {
        let curBookings = [];
        if (snapshot.exists()) {
            const data = snapshot.val();


            for (let table of data) {
                for (let booking of table.bookings) {
                    if (booking.userId === userID) {
                        let ans = {table: table.id, startDate: booking.startDate, endDate: booking.endDate, teamId: table.teamId}
                        console.log(ans);
                        curBookings.push(ans);
                    }
                }
            }
        } else {
            console.log("No data available");
        }
        return curBookings;

    }).catch((error) => {
        console.error(error);
    });
};

export const getAllRoomBookings = async () => {
    let allBookings = [];
    get(child(dbRef, `rooms/`)).then((snapshot) => {

        if (snapshot.exists()) {
            const data = snapshot.val();


            for (let table of data) {
                for (let booking of table.bookings) {
                    let ans = {table: table.id, startDate: booking.startDate, endDate: booking.endDate, teamId: table.teamId}
                    allBookings.push(ans);
                    }
                }
            }
        else {
            console.log("No data available");
        }
        return allBookings;

    }).catch((error) => {
        console.error(error);
    });
};

export const getAllTables = async () => {
    get(child(dbRef, `tables/`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val()
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
};

export const getFloorPlan = async ()=> {
    get(child(dbRef, `floorplan/data`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val()
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
};


export const getAllTeams = async () => {
    get(child(dbRef, `teams/`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val()
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
};
