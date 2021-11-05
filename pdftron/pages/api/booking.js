const admin = require('firebase-admin');
const serviceAccount = require('./pdftron-461d4-firebase-adminsdk-u1i9d-e77537e5ea.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });

const db = admin.firestore();

const table_data = {
    endDate: admin.firestore.Timestamp.fromDate(new Date('December 20, 1815')),
    startDate: admin.firestore.Timestamp.fromDate(new Date('December 10, 1815')),
    tableBookingID: "tblbook_4",
    tableID: 1,
    userID:"test@pdftron.com"
}

async function bookTable(table_data) {
    const table = await db.collection('TableBooking').add(table_data);
    document_id = table.id
    return document_id;
}

async function cancelTableReservation(booking_id) {
    const remove_booking = await db.collection('TableBooking').doc(booking_id).delete();
    console.log("Booking Removed")
}

async function checkTableAvailability() {
    
    const tables = db.collection('Table');
    
    const tablesnapshot = await tables.get();
    
    if (tablesnapshot.empty) {
        console.log('No matching documents.');
        return;
    }  
    
    my_list = []

    tablesnapshot.forEach(doc => {
        const tables = doc.data();
        my_list.push(tables)
    })
    return my_list;
}
     

const room_data = {
        RoomID: 1, 
        endDate: admin.firestore.Timestamp.fromDate(new Date('December 20, 1815')),
        startDate: admin.firestore.Timestamp.fromDate(new Date('December 10, 1815')),
        userID:"test@pdftron.com"
    }
    
async function bookRoom() {
    const room = await db.collection('RoomBooking').add(room_data);
    document_id = room.id
    return document_id;
}

async function cancelRoomReservation(booking_id) {

    const remove_booking = await db.collection('RoomBooking').doc(booking_id).delete()
    console.log("Booking Removed")
}

async function checkRoomAvailability() {

    const rooms = db.collection('Room')
    
    const roomsnapshot = await rooms.get()
    
    if (roomsnapshot.empty) {
        console.log('No matching documents.')
        return;
    }  
    
    my_list = []

    roomsnapshot.forEach(doc => {
        const rooms = doc.data()
        my_list.push(rooms)
    })
    return my_list;
}


const getUserTableBoookings = async (userID) =>  {
    // given the users ID (email)
    // returns a list of TableBookings with userID
    // takes a json list of all the TableBookings collection
    // looks for the table booked based on the matching userID field in each document
    // Once the UserID field matches the given useID it will return a list of all tables booked for the user
    const snapshot = await db.collection('TableBooking').get()
    bookings_list = snapshot.docs.map(doc => doc.data())
    
    user_tables = []
    bookings_list.forEach(function(value){
        if (value["userID"] == userID){
            //console.log(value["userID"]);
            user_tables.push(value)
        }
      });
    return user_tables;
};


const getUserRoomBoookings = async (userID) =>  {
    // given the users ID (email)
    // given the users ID (email)
    // returns a list of RoomBookings with userID

    const snapshot = await db.collection('RoomBooking').get()
    bookings_list = snapshot.docs.map(doc => doc.data())
    
    user_rooms = []
    bookings_list.forEach(function(value){
        if (value["userID"] == userID){
            user_rooms.push(value)
        }
      });
    return user_rooms;
};

async function updateTableSection(tableID,section) {
    // given tableID (string) and section (the section will be changed to)
    // this function looks through each document inside the Table collection
    // it compare the tableID field inside each document
    // Once the tableIDs are a match then it changes the section field of the document

    const numbers = db.collection("Table").where('tableID', '==', tableID )
    value = ''
    numbers.get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            value = doc.id
            return value
        })
        const table = db.collection("Table").doc(value).update(
            {
                section: section
            }
        ).then(console.log("Table Section Updated"))
    }
    )
};

async function updateRoomSection(roomID,section)  {
    // given roomID (string) and section (the section will be changed to)
    // this function looks through each document inside the Table collection
    // it compare the roomID field inside each document
    // Once the roomID are a match then it changes the section field of the document
    
    const numbers = db.collection("Room").where('roomID', '==', roomID )
    value = ''
    numbers.get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            value = doc.id
            return value
        })
        const room = db.collection("Room").doc(value).update(
            {
                section: section
            }
        ).then(console.log("Room Section Updated"))
    }
    )
};

async function updateMaxRoomHours(maxHours){
    // given maxHours (number)
    // Change the value in Admin collection , setting documents

    const MH = db.collection("Admin").doc("settings").update(
        {
            RoomMaxHours: maxHours
        }
    )
};

async function updateMaxTableDays (maxDays)  {
    // given maxDays (number)
    // Change the value in Admin collection , setting documents

    const MD = db.collection("Admin").doc("settings").update(
        {
            TableMaxDays: maxDays
        }
    )
};




/// -----------------------------------Test of the functions above --------------------------///

// checkTableAvailability()
//     .then(tables => console.log(tables))

// bookTable(table_data)
//    .then(document_id => console.log(document_id))

//const booking_id = "89ghgWKfamTYB7dG9PRN"
//cancelTableReservation(booking_id)

// checkRoomAvailability()
//     .then(rooms => console.log(rooms))

    
// bookRoom(room_data)
//    .then(document_id => console.log(document_id))

// const booking_id = "mumhyupIGBXrzpRIzz6S"
// cancelRoomReservation(booking_id)

// getUserTableBoookings("random_user3@pdftron.com")
//     .then(output => console.log(output))

// getUserRoomBoookings("test2@pdftron.com")
//     .then(output => console.log(output))



// updateTableSection("1","general")

// updateRoomSection("1","G")

// updateMaxRoomHours(4)

// updateMaxTableDays(25)











/// ----------------------------------------------------------------------------///////////















// const admin = require('firebase-admin');
// const serviceAccount = require('./pdftron-461d4-firebase-adminsdk-u1i9d-e77537e5ea.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

// const db = admin.firestore();

// // global variables
// const maxTimeBooked = 24;

// // ======================== READ FUNCTIONS =============================
// const tableExists = async (tableName) => {
//     const table = await db.collection("Table").doc(tableName).get();
//     if (table.exists) {
//         return table.data();
//     } else {
//         return null
//     }
// };

// const roomExists = async (roomName) => {
//     const room = await db.collection("Room").doc(roomName).get();
//     if (room.exists) {
//         return room.data();
//     } else {
//         return null
//     }
//  };
 
// const userExists = async (username) => {
//     const user = await db.collection("User").doc(username).get();
//     return user.exists;
// };

// const _checkTableAvailability = async (tableID, startDate, endDate) => {
//     //
//     // TODO:
//     // DOESNT WORK CURRENTLY
//     // NEEDS PROPERT CONVERSION BETWEEN DATE TO TIMESTAMP
//     // NEEDS PROPER TIMEZONE, FIREBASE USES UTC7

//     const table = tableExists("Table" + tableID);
//     const curBookings = await db.collection("TableBooking").where("tableID", "==", 1).get();

//     // convert string to datetime then timestamp for comparisons
//     const newStart = new Date.UTC(startDate).getTime() / 1000;
//     const newEnd = new Date.UTC(endDate).getTime() / 1000;

//     curBookings.forEach(doc => {
//         const curStart = doc.data().startDate._seconds;
//         const curEnd = doc.data().endDate._seconds;

//         console.log("Current start", curStart);
//         console.log("new start", newStart);
//         console.log("current end", curEnd);
//         console.log("new end", newEnd);

//         if (curStart <= newStart <= newEnd <= curEnd) {
//             return false;
//         }
//     });
//     return true;
// };

// const _checkRoomAvailability = async (roomID, startDate, endDate) => {
//     //
//     // TODO:
//     // DOESNT WORK CURRENTLY
//     // NEEDS PROPERT CONVERSION BETWEEN DATE TO TIMESTAMP
//     // NEEDS PROPER TIMEZONE, FIREBASE USES UTC7
  
//     const room = roomExists("Room" + roomID);
//     const curBookings = await db.collection("RoomBooking").where("roomID", "==", 1).get();
  
//     // convert string to datetime then timestamp for comparisons
//     const newStart = new Date.UTC(startDate).getTime() / 1000;
//     const newEnd = new Date.UTC(endDate).getTime() / 1000;
  
//     curBookings.forEach(doc => {
//         const curStart = doc.data().startDate._seconds;
//         const curEnd = doc.data().endDate._seconds;
  
//         console.log("Current start", curStart);
//         console.log("new start", newStart);
//         console.log("current end", curEnd);
//         console.log("new end", newEnd);
  
//         if (curStart <= newStart <= newEnd <= curEnd) {
//             return false;
//         }
//     });
//     return true;
//  };

 

// const getUserTableBoookings = async (userID) =>  {
//     // TODO:
//     // given the users ID (email)
//     // returns a list of TableBookings with userID

// };

// const getUserRoomBoookings = async (userID) =>  {
//     // TODO:
//     // given the users ID (email)
//     // returns a list of RoomBookings with userID
// };

// // ========================= WRITE FUNCTIONS ===============================
// const createBooking = async (email, tableID, startDate, endDate) => {
//     const avail = await _checkTableAvailability(tableID, startDate, endDate);

//     if (avail) {
//         const newID = generateTableBookingID();
//         const booking_req = {
//             tableBookingID: newID, // this fields needs to be incremented / unique
//             tableID: tableID,
//             userID: email,
//             startDate: startDate,
//             endDate: endDate
//         };
//         await db.collection("TableBooking").doc("TableBooking1").set(booking_req)
//     }

// };

// const createTable = async (section) => {
//     const newID = generateTableID();
//     const newTable = {
//         maxTimeBooked: maxTimeBooked,
//         section: section,
//         tableID: newID
//     };
//     console.log("successfully created table with these attributes" + newTable);
//     await db.collection("Table").doc("Table" + newID).set(newTable);
// };

// const createRoom = async (section) => {
//     const newID = generateRoomID();
//     const newTable = {
//         maxTimeBooked: maxTimeBooked,
//         section: section,
//         roomID: newID
//     };
//     console.log("successfully created room with these attributes" + newTable);
//     await db.collection("Room").doc("Room" + newID).set(newRoom);
//  };

 
// const createUser = async (email) => {
//     if (await userExists()) {
//         const username = email.substr(0, email.indexOf("@"));
//         const user = {
//             email: email,
//             username: username  // test@pdftron.com > test
//         };
//         await db.collection("User").doc(username).set(user);
//     }
// };

// // ===================== UPDATE FUNCTIONS ==========================
// const generateTableBookingID = async () => {
//     // get current ID, increment, update database, return new ID
//     let id = await db.collection("uniqueCounters").doc("tableBookingID").get();

//     try {
//         let newID = id.data().tableBookingID + 1;
//         await db.collection("uniqueCounters").doc("tableBookingID").update({tableBookingID: newID});
//         return newID;
//     } catch (e) {
//         return e;
//     }
// };

// const generateTableID = async () => {
//     // get current ID, increment, update database, return new ID
//     let id = await db.collection("uniqueCounters").doc("tableID").get();
//     try {
//         let newID = id.data().tableBookingID + 1;
//         await db.collection("uniqueCounters").doc("tableID").update({tableID: newID});
//         return newID;
//     } catch (e) {
//         return e;
//     }
// };
// const generateRoomID = async () => {
//     // get current ID, increment, update database, return new ID
//     let id = await db.collection("uniqueCounters").doc("roomID").get();
//     try {
//         let newID = id.data().roomBookingID + 1;
//         await db.collection("uniqueCounters").doc("roomID").update({roomID: newID});
//         return newID;
//     } catch (e) {
//         return e;
//     }
//  };
  
//  const generateRoomBookingID = async () => {
//     // get current ID, increment, update database, return new ID
//     let id = await db.collection("uniqueCounters").doc("roomBookingID").get();
  
//     try {
//         let newID = id.data().tableBookingID + 1;
//         await db.collection("uniqueCounters").doc("roomBookingID").update({roomBookingID: newID});
//         return newID;
//     } catch (e) {
//         return e;
//     }
//  };
 
// const updateTableSection = async (tableID) => {
//     // TODO
//     // Given a tableId
//     // change the table section
//     // returns nothing
// };

// const updateRoomSection = async (roomID) => {
//     // TODO
//     // Given a roomID
//     // change the room section
//     // returns nothing
// };

// const updateMaxRoomHours = async (maxHours) => {
//     // TODO
//     // given a new maxHours
//     // update the Admin settings to reflect the new maxHours
//     // returns nothing
// };

// const updateMaxTableDays = async (maxDays) => {
//     // TODO
//     // given a new maxDays
//     // update the Admin settings to reflect the new maxDays
//     // returns nothing
// };

// ============================= DELETE FUNCTIONS =====================
// const deleteTable = async (tableID) => {
//     await db.collection("Table").doc(tableID).delete();
// };

// const deleteRoom = async (roomID) => {
//     await db.collection("Room").doc(roomID).delete();
//  };

 
// //TODO: add all the functions to be exported
// module.exports = {
//     tableExists,
//     _checkTableAvailability,
//     userExists,
//     createBooking,
//     createTable,
//     createUser,
//     _checkRoomAvailability,
//     createRoom,
//     generateRoomBookingID,
//     deleteTable,
//     deleteRoom
   
//  };
 
