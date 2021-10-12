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

const user2 = {
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