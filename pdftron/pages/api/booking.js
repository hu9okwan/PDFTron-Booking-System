const admin = require('firebase-admin');
const serviceAccount = require('./pdftron-461d4-firebase-adminsdk-u1i9d-e77537e5ea.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// global variables
const maxTimeBooked = 24;

// ======================== READ FUNCTIONS =============================
const tableExists = async (tableName) => {
    const table = await db.collection("Table").doc(tableName).get();
    if (table.exists) {
        return table.data();
    } else {
        return null
    }
};

const userExists = async (username) => {
    const user = await db.collection("User").doc(username).get();
    return user.exists;
};

const _checkTableAvailability = async (tableID, startDate, endDate) => {
    //
    // TODO:
    // DOESNT WORK CURRENTLY
    // NEEDS PROPERT CONVERSION BETWEEN DATE TO TIMESTAMP
    // NEEDS PROPER TIMEZONE, FIREBASE USES UTC7

    const table = tableExists("Table" + tableID);
    const curBookings = await db.collection("TableBooking").where("tableID", "==", 1).get();

    // convert string to datetime then timestamp for comparisons
    const newStart = new Date.UTC(startDate).getTime() / 1000;
    const newEnd = new Date.UTC(endDate).getTime() / 1000;

    curBookings.forEach(doc => {
        const curStart = doc.data().startDate._seconds;
        const curEnd = doc.data().endDate._seconds;

        console.log("Current start", curStart);
        console.log("new start", newStart);
        console.log("current end", curEnd);
        console.log("new end", newEnd);

        if (curStart <= newStart <= newEnd <= curEnd) {
            return false;
        }
    });
    return true;
};


const getUserTableBoookings = async (userID) =>  {
    // TODO:
    // given the users ID (email)
    // returns a list of TableBookings with userID
};

const getUserRoomBoookings = async (userID) =>  {
    // TODO:
    // given the users ID (email)
    // returns a list of RoomBookings with userID
};

// ========================= WRITE FUNCTIONS ===============================
const createBooking = async (email, tableID, startDate, endDate) => {
    const avail = await _checkTableAvailability(tableID, startDate, endDate);

    if (avail) {
        const newID = generateTableBookingID();
        const booking_req = {
            tableBookingID: newID, // this fields needs to be incremented / unique
            tableID: tableID,
            userID: email,
            startDate: startDate,
            endDate: endDate
        };
        await db.collection("TableBooking").doc("TableBooking1").set(booking_req)
    }

};

const createTable = async (section) => {
    const newID = generateTableID();
    const newTable = {
        maxTimeBooked: maxTimeBooked,
        section: section,
        tableID: newID
    };
    console.log("successfully created table with these attributes" + newTable);
    await db.collection("Table").doc("Table" + newID).set(newTable);
};


const createUser = async (email) => {
    if (await userExists()) {
        const username = email.substr(0, email.indexOf("@"));
        const user = {
            email: email,
            username: username  // test@pdftron.com > test
        };
        await db.collection("User").doc(username).set(user);
    }
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

const updateTableSection = async (tableID) => {
    // TODO
    // Given a tableId
    // change the table section
    // returns nothing
};

const updateRoomSection = async (roomID) => {
    // TODO
    // Given a roomID
    // change the room section
    // returns nothing
};

const updateMaxRoomHours = async (maxHours) => {
    // TODO
    // given a new maxHours
    // update the Admin settings to reflect the new maxHours
    // returns nothing
};

const updateMaxTableDays = async (maxDays) => {
    // TODO
    // given a new maxDays
    // update the Admin settings to reflect the new maxDays
    // returns nothing
};

// ============================= DELETE FUNCTIONS =====================
const deleteTable = async (tableID) => {
    await db.collection("Table").doc(tableID).delete();
};


//TODO: add all the functions to be exported
module.exports = {
    tableExists,
    _checkTableAvailability,
    userExists,
    createBooking,
    createTable,
    createUser
};
