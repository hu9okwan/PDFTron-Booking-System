const admin = require('firebase-admin');
const serviceAccount = require('./pdftron-461d4-firebase-adminsdk-u1i9d-e77537e5ea.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// global variables
const maxTimeBooked = 24;

// ======================== READ FUNCTIONS =============================
const tableExists = async (tableID) => {
    const table = await db.collection("Table").col(tableID).get();
    if (table.exists) {
        return table.data();
    }
    else { return {}}
};


const userExists = async (username) => {
    const user = await db.collection("User").col(username).get();
    if (user.exists) {
        return user.data();
    }
    else { return {}}
};


const _checkTableAvailability = async (tableID, startDate, endDate) => {
    /*
    Function checks if specific table is available for that certain date.

    Constraints:
    - table needs to exist
    - startDate needs to be available
    - needs to be no other bookings between startDate and endDate
     */
    const tableBookingSnapShot = tableExists;
    console.log(tableBookingSnapShot);
};

// ========================= WRITE FUNCTIONS ===============================
const createBooking = async (user_email, table_ID, start_date, end_date) => {
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

const createTable = async (section) => {
    const newID = generateTableID();
    const newTable = {
        maxTimeBooked: maxTimeBooked,
        section: section,
        tableID: newID
    };
    console.log("successfully created table with these attributes" + newTable);
    await db.collection("Table").doc("Table"+newID).set(newTable);
};

const createUser = async (email) => {
    const username = email.substr(0, email.indexOf("@"));
    const user = {
        email: email,
        username: username  // test@pdftron.com > test
    };
    await db.collection("User").doc(username).set(user);
};

// ===================== UPDATE FUNCTIONS ==========================
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

const generateTableID = async () => {
    // get current ID, increment, update database, return new ID
    let id = await db.collection("uniqueCounters").doc("tableID").get();
    try {
        let newID = id.data().tableBookingID + 1;
        await db.collection("uniqueCounters").doc("tableID").update({tableID: newID});
        return newID;
    } catch (e) {
        return e;
    }
};


// ============================= DELETE FUNCTIONS =====================
const deleteTable = async (tableID) => {
    await db.collection("Table").doc(tableID).delete();
};

module.exports = {_checkTableAvailability };
