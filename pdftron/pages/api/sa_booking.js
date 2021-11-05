// imports here
const admin = require('firebase-admin');
const serviceAccount = require('./pdftron-461d4-firebase-adminsdk-u1i9d-e77537e5ea.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });

const db = admin.firestore();

const table_data = {
    endDate: admin.firestore.Timestamp.fromDate(new Date('December 20, 1815')),
    startDate: admin.firestore.Timestamp.fromDate(new Date('December 10, 1815')),
    tableBookingID: "tblbook_6",
    tableID: 1,
    userID:"random_user3@pdftron.com"
}

const room_data = {
    maxTimeBooked: 24,
    section: "web",
    roomID: 1  
}

async function bookTable(table_data) {
    // Creates table booking and returns the document name as a unique id
    const table = await db.collection('TableBooking').add(table_data);
    document_id = table.id
    //console.log(document_id);
    return document_id;
}

async function cancelTableReservation(table_booking_id) {
    // removes a table booking based on the document name
    // The document name is a unique value
    const remove_booking = await db.collection('TableBooking').doc(table_booking_id).delete();
    console.log("Booking Removed")
}

async function checkTableAvailability() {
    // This function goes through the Table collection
    // Then returns a json list of all the tables available
    const tables = db.collection('Table');
    
    const tablesnapshot = await tables.get();
    
    if (tablesnapshot.empty) {
        console.log('No matching documents.');
        return;
    }  
    table_list = []
    tablesnapshot.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        const tables = doc.data();
        table_list.push(tables);    
    });
    return table_list;
     
}


async function bookRoom(room_data) {
    // Creates room booking and returns the document name as a unique id
    const room = await db.collection('RoomBooking').add(room_data);
    document_id = room.id
    //console.log(document_id);
    return document_id;
    
}

async function cancelRoomReservation(room_booking_id) {
    // removes a room booking based on the document name
    // The document name is a unique value
    const remove_booking = await db.collection('RoomBooking').doc(room_booking_id).delete();
    console.log("Room Booking Removed")

}

async function checkRoomAvailability() {
    // This function goes through the Room collection
    // Then returns a json list of all the rooms available
    const rooms = db.collection('Room');
    
    const tablesnapshot = await rooms.get();
    
    if (tablesnapshot.empty) {
        console.log('No matching documents.');
        return;
    }  
    table_list = []
    tablesnapshot.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        const tables = doc.data();
        table_list.push(tables);    
    });
    return table_list;
    
}

async function getUserTableBoookings(userID){
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

// getUserTableBoookings("random_user@pdftron.com")
//     .then(output => console.log(output))

async function getUserRoomBoookings(userID){
    // returns a list of RoomBookings with userID
    // takes a json list of all the RoomBookings collection
    // looks for the room booked based on the matching userID field in each document
    // Once the UserID field matches the given useID it will return a list of all rooms booked for the user

    const snapshot = await db.collection('RoomBooking').get()
    room_list = snapshot.docs.map(doc => doc.data())
    
    user_rooms = []
    room_list.forEach(function(value){
        if (value["userID"] == userID){
            //console.log(value["userID"]);
            user_rooms.push(value)
        }
      });
    return user_rooms;
};

// getUserRoomBoookings("test@pdftron.com")
//      .then(output => console.log(output))

async function updateTableSection(tableID,custom_section){
    // Given a tableId
    // change the table section
    // returns nothing
    // This function goes through all the documents inside the Table collection
    // It then compares the tableID field of each document with the given tableID
    // Once it finds a matching tableID it saves the name of the document to value
    // After that it will update that document based on the document name
    const numbers = db.collection("Table").where('tableID', '==', tableID )
    value = ''
    numbers.get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            console.log(doc.id , '=>', doc.data())
            value = doc.id
            return value
        })
        const table = db.collection("Table").doc(value).update(
            {
                section: custom_section
            }
        ).then(console.log("Table Section Updated"))
    }
    )
};

    // const snapshot = await db.collection('Table').doc(tableID)
    // const doc = await snapshot.get();
    // if (!doc.exists) {
    //   console.log('No such document exist!');
    // } else {
    //    const change_section = await db.collection('Table').doc(tableID).update({
    //         section: custom_section,
    //     });
    //     console.log("Changed the section for" ,tableID)
    // };


//updateTableSection("2","dev")
    

async function updateRoomSection(roomID,room_section){
    // TODO
    // Given a roomID
    // change the room section
    // returns nothing
    const numbers = db.collection("Room").where('roomID', '==', roomID )
    value = ''
    numbers.get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            // console.log(doc.id , '=>', doc.data())
            value = doc.id
            return value
        })
        const room = db.collection("Room").doc(value).update(
            {
                section: room_section
            }
        ).then(console.log("Room Section Updated"))
    }
    )
};

//updateRoomSection("1","f")

async function updateMaxRoomHours(maxHours){
    // TODO
    // given a new maxHours
    // update the Admin settings to reflect the new maxHours
    // returns nothing
    const MH = db.collection("Admin").doc("settings").update(
        {
            RoomMaxHours: maxHours
        }
    ).then(console.log("Max Hours Updated"))
};
//updateMaxRoomHours(8)

async function updateMaxTableDays(maxDays){
    // TODO
    // given a new maxDays
    // update the Admin settings to reflect the new maxDays
    // returns nothing
    const MD = db.collection("Admin").doc("settings").update(
        {
            TableMaxDays: maxDays
        }
    ).then(console.log("Max Days Updated"))
};

//updateMaxTableDays(30)

//checkTableAvailability()
//    .then(tables => console.log(tables))

// bookTable(table_data)
//     .then(document_id => console.log(document_id))

//const booking_id = "89ghgWKfamTYB7dG9PRN"
//cancelTableReservation(booking_id)