import firebase from "firebase/compat/app";
import {getDatabase, ref, child, get, onValue} from 'firebase/database'
import initFirebase from "./initFirebase"

initFirebase();
const dbRef = ref(getDatabase());
