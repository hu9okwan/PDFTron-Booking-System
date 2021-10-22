///const { credentials } = require('@grpc/grpc-js');
const admin = require('firebase-admin');
const serviceAccount = require('./pdftron-461d4-firebase-adminsdk-u1i9d-e77537e5ea.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });

const db = admin.firestore();

const user1 = {
    email: "myrandomemail@console.com",
    firstName: "First User",
    isAdmin: true,
    lastName: "First User",
    userID: "ABCD1234"
};
db.collection('Users').doc('User1').set(user1);

const user4 = {
    email: "myrandomemail@console.com",
    firstName: "Second User",
    isAdmin: false,
    lastName: "Second User",
    userID: "ABCD5678"
};

const user3 = {
    email: "myrandomemail@console.com",
    firstName: "Third User",
    isAdmin: true,
    lastName: "Third User",
    userID: "ABCD567899"
};
db.collection('Users').doc('User3').set(user3);


// Hard code test for room

const room1 = {
    IsReserved: true,
    Date: "20 October 2021",
    section: "A",
    tableid: "01 02 03"
}
db.collection('Room').doc('Room1').set(room1);

const room2 = {
    IsReserved: true,
    Date: "12 October 2021",
    section: "B",
    tableid: "04 05 06 07 08"
}
db.collection('Room').doc('Room2').set(room2);

const room3 = {
    IsReserved: true,
    Date: "13 October 2021",
    section: "C",
    tableid: "08 09 10"
}
db.collection('Room').doc('Room3').set(room3);

// Hard code test for table

const table1 = {
    IsReserved: false,
    maxTimeBooked: 24,
    section: "A",
    tableid: "01"
}
db.collection('Table').doc('Table1').set(table1);

const table2 = {
    IsReserved: false,
    maxTimeBooked: 36,
    section: "A",
    tableid: "02"
}
db.collection('Table').doc('Table2').set(table2);

const table3 = {
    IsReserved: true,
    maxTimeBooked: 48,
    section: "A",
    tableid: "03"
}
db.collection('Table').doc('Table3').set(table3);


// Hard code test for tablebooking

const tablebooking1 = {
    startDate: "12 October 2021",
    tablebookingID: 001,
    userID: "ABCD1234",
    tableid: "01"
}
db.collection('TableBooking').doc('TableBooking1').set(tablebooking1);

const tablebooking2 = {
    startDate: "13 October 2021",
    tablebookingID: 002,
    userID: "ABCD5678",
    tableid: "02"
}
db.collection('TableBooking').doc('TableBooking2').set(tablebooking2);

const tablebooking3 = {
    startDate: "14 October 2021",
    tablebookingID: 003,
    userID: "ABCD567899",
    tableid: "03"
}
db.collection('TableBooking').doc('TableBooking3').set(tablebooking3);
