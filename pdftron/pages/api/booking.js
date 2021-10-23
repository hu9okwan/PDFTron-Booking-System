const admin = require('firebase-admin');
const serviceAccount = require('./pdftron-461d4-firebase-adminsdk-u1i9d-e77537e5ea.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


// ======================== READ FUNCTIONS =============================
const generateTableBookingID = async () => {
    // get current ID, increment, update database, return new ID
    let id = await db.collection("uniqueCounters").doc("tableBookingID").get();

    try {
        let newID = id.data().tableBookingID + 1;
        await db.collection("uniqueCounters").doc("tableBookingID").update({tableBookingID: newID});
        return newID;
    } catch (e) {
        return e;
    }
};

const tableExists = async (tableID) => {

};


// ========================= WRITE FUNCTIONS ===============================


const bookTable = async (user_email, table_ID, start_date, end_date) => {

    const newID = generateTableBookingID();

    const booking_req = {
        tableBookingID: "tblBook_" + newID, // this fields needs to be incremented / unique
        tableID: table_ID,
        userID: user_email,
        startDate: start_date,
        endDate: end_date
    };

    await db.collection("TableBooking").doc("TableBooking1").set(booking_req)
};


// ===================== UPDATE FUNCTIONS ==========================

/*
Function checks if specific table is available for that certain date.

Constraints:
- table needs to exist
- startDate needs to be available
- needs to be no other bookings between startDate and endDate
 */
const checkTableAvailability = async (tableID, startDate, endDate) => {
    const tableBookingSnapShot = await db.collection("TableBooking").doc("TableBooking1").get();

    if (tableBookingSnapShot.exists) {

        console.log(tableBookingSnapShot.data().tableBookingID);
        return true;
    }
    else {
        console.log("Table does not exist!");
        return false;
    }
};

// ============================= DELETE FUNCTIONS =====================

module.exports = {bookTable, checkTableAvailability, generateTableBookingID };
