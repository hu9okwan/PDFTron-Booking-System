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
    if (table.exists) { return table.data(); }
    else { return null }
};


const userExists = async (username) => {
    const user = await db.collection("User").doc(username).get();
    if (user.exists) { return user.data(); }
    else { return null }
};


const _checkTableAvailability = async (tableID, startDate, endDate) => {
    /*
    Function checks if specific table is available for that certain date.

    Constraints:
    - table needs to exist
    - startDate needs to be available
    - needs to be no other bookings between startDate and endDate
     */
    const table = tableExists("Table"+tableID);
    const curBookings = await db.collection("TableBooking").where("tableID", "==", 1).get();

    // convert string to datetime then timestamp for comparisons
    const start = new Date(startDate).getTime() / 1000;
    const end = new Date(endDate).getTime() / 1000;

    console.log(curBookings.length);

    curBookings.forEach(doc => {
        //TODO:
        // compare using start timestamp so less calculations
        // check for any overallping dates in pseudo
        // if cur_start >= book_start and cur_start <= book_end or
        // cur _end >= book_start and cur_end <= book_end:

        console.log("cur table availability", doc.data())
    })

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

module.exports = {tableExists, _checkTableAvailability };
