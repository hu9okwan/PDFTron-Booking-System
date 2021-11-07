import firebase from "firebase/compat/app";
import {getDatabase, ref, child, get, onValue, set} from 'firebase/database'
import initFirebase from "./initFirebase"

initFirebase();
const db = getDatabase();


export const updateMaxRoomHours = async (maxHours) => {
    await update(ref(db, 'settings/' ), {
        maxHours: maxHours,
    });
};

export const updateMaxTableDays = async (maxDays) => {
    await update(ref(db, 'settings/' ), {
        maxDays: maxDays,
    });
};
