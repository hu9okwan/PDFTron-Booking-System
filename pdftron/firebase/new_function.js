const fs = require('firebase-admin');

const serviceAccount = require('./pdftron-461d4-firebase-adminsdk-u1i9d-e77537e5ea.json');

fs.initializeApp({
 credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore(); 

// This is an example of how the new table document data should be
const table_data = {
    id:4,
    name: "General Table 2",
    teamId: 2,
    isAvailableIfNoReservationsOrBookings: true,
    bookings: [],
    reservations: []
}

async function addTable(table_data){
    // This function creats new tables 
    // but with empty bookings and reservation
    // It just creates the tables with the required fields
    const table = await db.collection('tables').add(table_data).then(console.log("New Table Created"));
    document_id = table.id
    //console.log(document_id);
    return document_id;
}
//addTable(table_data)

// This is an example of how a booking data should be
const booking_data ={
    startDate: fs.firestore.Timestamp.fromDate(new Date('December 10, 1815')),
    endDate: fs.firestore.Timestamp.fromDate(new Date('December 20, 1815')),
    userID: 2
}

async function add_Table_Bookings(table_id,booking_data) {
    // this function adds booking to a table inside the Table collection
    // it adds the booking_data based on the given table id
    // each table has a different table id
    // and each table can have multiple bookings
    const tables = db.collection("tables").where('id', '==', table_id);
    value = ""
    tables.get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            //console.log(doc.id , '=>', doc.data())
            //console.log(doc.id)
            value = doc.id
            return value
        })
        const new_booking = db.collection("tables").doc(value)
        new_booking.update({
        bookings: fs.firestore.FieldValue.arrayUnion(booking_data)
        }).then(console.log("New Booking Added"));
    })    
}

//add_Table_Bookings(4,booking_data)

// This is an example of how reservation data should be
const reservation_data = {
    startDate: fs.firestore.Timestamp.fromDate(new Date('December 10, 1815')),
    endDate: null,
    userID: 2
}

async function add_Table_Reservations(res_id,reservation_data){
    // this function adds reservation to a table inside the Table collection
    // it adds the reservation_data based on the given table id
    // each table has a different table id
    // and each table can have multiple reservations
    const tables = db.collection("tables").where('id', '==', res_id);
    value = ""
    tables.get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            //console.log(doc.id , '=>', doc.data())
            //console.log(doc.id)
            value = doc.id
            return value
        })
        const new_booking = db.collection("tables").doc(value)
        new_booking.update({
        reservations: fs.firestore.FieldValue.arrayUnion(reservation_data)
        }).then(console.log("New Reservation Added"));
    })  
}

//add_Table_Reservations(4,reservation_data)

// This is an example of how the new room data should be for the document
const room_data = {
    id: 4,
    name: "Room4",
    isAvailableIfNoReservationsOrBookings: true,
    bookings: [],
    reservations: []
}

async function addRooms(room_data){
    // This function creats new rooms 
    // but with empty bookings and reservation
    // It just creates the rooms with the required fields
    const room = await db.collection('rooms').add(room_data).then(console.log("New Room Created"));
    document_id = room.id
    //console.log(document_id);
    return document_id;
}

//addRooms(room_data)


async function add_Room_Bookings(room_id, booking_data) {
    // this function adds booking to a room inside the Room collection
    // it adds the booking_data based on the given room id
    // each room has a different room id
    // and each room can have multiple bookings
    const room = db.collection("rooms").where('id', '==', room_id);
    value = ""
    room.get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            //console.log(doc.id , '=>', doc.data())
            //console.log(doc.id)
            value = doc.id
            return value
        })
        const new_booking = db.collection("rooms").doc(value)
        new_booking.update({
        bookings: fs.firestore.FieldValue.arrayUnion(booking_data)
        }).then(console.log("New Booking Added To The Room"));
    })    
}

//add_Room_Bookings(4,booking_data)

async function add_Room_Reservations(res_id,reservation_data){
    // this function adds reservation to a room inside the room collection
    // it adds the reservation_data based on the given room id
    // each room has a different rooms id
    // and each room can have multiple reservations
    const room = db.collection("rooms").where('id', '==', res_id);
    value = ""
    room.get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            //console.log(doc.id , '=>', doc.data())
            //console.log(doc.id)
            value = doc.id
            return value
        })
        const new_reservation = db.collection("rooms").doc(value)
        new_reservation.update({
        reservations: fs.firestore.FieldValue.arrayUnion(reservation_data)
        }).then(console.log("New Reservation Added To The Room"));
    })  
}

//add_Room_Reservations(4,reservation_data)

async function get_all_status(){
    // This function returns a list of json objects
    // That contain the status information
    // These status can be used for the front end to show the status of a table or room
    // The status contain color, id, and name these attributes help to explain the status of booking and reservation
    // Or can be used for tables and rooms

    const all_status = db.collection('status')
    const snapshot = await all_status.get();
    if (snapshot.empty) {
        console.log('No matching documents.');
    }  
    status_list = []
    snapshot.forEach(doc => {
    //console.log(doc.id, '=>', doc.data());
    status_list.push(doc.data())
    });
    return status_list;

}


// get_all_status()
//     .then(function (data){
//         console.log(data)
//     })

// this is and example of what team data should look like
const team_data = {
    id: 4,
    name: "Test Team"
    
}

async function create_teams(team_data){
    // This function creates teams
    const team = await db.collection('teams').add(team_data).then(console.log("New Team Added"));
    document_id = team.id
    //console.log(document_id);
    return document_id;
}

//create_teams(team_data)

async function get_teams(){
    // This function returns a list of all teams available
    const all_teams = db.collection('teams')
    const snapshot = await all_teams.get();
    if (snapshot.empty) {
        console.log('No matching documents.');
    }  
    team_list = []
    snapshot.forEach(doc => {
    //console.log(doc.id, '=>', doc.data());
    team_list.push(doc.data())
    });
    return team_list;
}

// get_teams()
//     .then(team_data => console.log(team_data))

// This is an example of what the new user data should look like
const user_data = {
    id: 5,
    name: "Test User",
    email: "TestUser@pdftron.com",
    teamId: 4,
    isAdmin: false
}

async function add_user(user_data) {
     // This function creates users
     const user = await db.collection('users').add(user_data).then(console.log("New User Added"));
     document_id = user.id
     //console.log(document_id);
     return document_id;
}

//add_user(user_data)

async function remove_user(user_id){
    // This function removes a user based on their user id
    const user = db.collection("users").where('id', '==', user_id )
    value = ''
    user.get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            console.log(doc.id , '=>', doc.data())
            value = doc.id
            return value
        })
        const table = db.collection("users").doc(value).delete().then(
            console.log("Deleted User"))
        })
}

//remove_user(5)

// This is an example of what the settings data should look like
const settings_data = {
    hours_LimitForRoomBookings: 2,
    days_LimitForRoomBookings: 0,
    days_LimitFroTableBookings: 10,
    hours_LimitFroTableBookings: 0
}

async function add_settings(settings_data){
    // This function adds the changes made to the app setting to the settings collection
    // It can also be used for updating any existing settings fields
    const new_setting = await db.collection('settings').doc("app_setting").set(settings_data).then(
    console.log("New settings Added"));

}

add_settings(settings_data)


