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

const roomExists = async (roomName) => {
    const room = await db.collection("Room").doc(roomName).get();
    if (room.exists) {
        return room.data();
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

const _checkRoomAvailability = async (roomID, startDate, endDate) => {
    //
    // TODO:
    // DOESNT WORK CURRENTLY
    // NEEDS PROPERT CONVERSION BETWEEN DATE TO TIMESTAMP
    // NEEDS PROPER TIMEZONE, FIREBASE USES UTC7
  
    const room = roomExists("Room" + roomID);
    const curBookings = await db.collection("RoomBooking").where("roomID", "==", 1).get();
  
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

const createRoom = async (section) => {
    const newID = generateRoomID();
    const newTable = {
        maxTimeBooked: maxTimeBooked,
        section: section,
        roomID: newID
    };
    console.log("successfully created room with these attributes" + newTable);
    await db.collection("Room").doc("Room" + newID).set(newRoom);
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
const generateRoomID = async () => {
    // get current ID, increment, update database, return new ID
    let id = await db.collection("uniqueCounters").doc("roomID").get();
    try {
        let newID = id.data().roomBookingID + 1;
        await db.collection("uniqueCounters").doc("roomID").update({roomID: newID});
        return newID;
    } catch (e) {
        return e;
    }
 };
  
 const generateRoomBookingID = async () => {
    // get current ID, increment, update database, return new ID
    let id = await db.collection("uniqueCounters").doc("roomBookingID").get();
  
    try {
        let newID = id.data().tableBookingID + 1;
        await db.collection("uniqueCounters").doc("roomBookingID").update({roomBookingID: newID});
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

const deleteRoom = async (roomID) => {
    await db.collection("Room").doc(roomID).delete();
 };

 
//TODO: add all the functions to be exported
module.exports = {
    tableExists,
    _checkTableAvailability,
    userExists,
    createBooking,
    createTable,
    createUser,
    _checkRoomAvailability,
    createRoom,
    generateRoomBookingID,
    deleteTable,
    deleteRoom
   
 };
 








// imports here
// const admin = require('firebase-admin');
// const serviceAccount = require('./pdftron-461d4-firebase-adminsdk-u1i9d-e77537e5ea.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//     });

// const db = admin.firestore();

// const table_data = {
//     endDate: admin.firestore.Timestamp.fromDate(new Date('December 20, 1815')),
//     startDate: admin.firestore.Timestamp.fromDate(new Date('December 10, 1815')),
//     tableBookingID: "tblbook_4",
//     tableID: 1,
//     userID:"test@pdftron.com"
// }

// async function bookTable(table_data) {
//     const table = await db.collection('TableBooking').add(table_data);
//     document_id = table.id
//     //console.log(document_id);
//     return document_id;
// }

// async function cancelTableReservation(booking_id) {
//     const remove_booking = await db.collection('TableBooking').doc(booking_id).delete();
//     console.log("Booking Removed")
// }

// async function checkTableAvailability() {
    
//     const tables = db.collection('Table');
    
//     const tablesnapshot = await tables.get();
    
//     if (tablesnapshot.empty) {
//         console.log('No matching documents.');
//         return;
//     }  
    
//     tablesnapshot.forEach(doc => {
//         //console.log(doc.id, '=>', doc.data());
//         const tables = doc.data();
//         console.log(tables)
//         return (tables);
//     });
     
// }

// const room_data = {
//     endDate: admin.firestore.Timestamp.fromDate(new Date('December 20, 1815')),
//     startDate: admin.firestore.Timestamp.fromDate(new Date('December 10, 1815')),
//     roomBookingID: "rmlbook_4",
//     roomID: 1,
//     userID:"test@pdftron.com"
// }
// function bookRoom(room_data) {
//     const room = await db.collection('RoomBooking').add(room_data);
//     document_id = room.id
//     //console.log(document_id);
//     return document_id;
// }

// function cancelRoomReservation(booking_id) {
//     const remove_booking = await db.collection('RoomBooking').doc(booking_id).delete();
//     console.log("Booking Removed")
// }

// function checkRoomAvailability() {
//     const rooms = db.collection('Room');
    
//     const roomsnapshot = await rooms.get();
    
//     if (roomsnapshot.empty) {
//         console.log('No matching documents.');
//         return;
//     }  
    
//     roomsnapshot.forEach(doc => {
//         //console.log(doc.id, '=>', doc.data());
//         const rooms = doc.data();
//         console.log(rooms)
//         return (rooms);
//     });
// }

// //checkTableAvailability()
// //    .then(tables => console.log(tables))

// //bookTable(table_data)
// //    .then(document_id => console.log(document_id))

// //const booking_id = "89ghgWKfamTYB7dG9PRN"
// //cancelTableReservation(booking_id)

// //checkTableAvailability()
// //    .then(tables => console.log(tables))
