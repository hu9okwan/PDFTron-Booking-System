import firebase from "firebase/compat/app";
import {getDatabase, ref, child, get, onValue} from 'firebase/database'
import initFirebase from "./initFirebase"


initFirebase();
const dbRef = ref(getDatabase());

export const getRooms = async () => {
    get(child(dbRef, `rooms/`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (let i = 0; i<data.length; i++) {
                console.log(data[i].name)
            }
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
};




