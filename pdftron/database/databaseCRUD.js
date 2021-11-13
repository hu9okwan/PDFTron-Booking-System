import firebase from "firebase/compat/app";
import {getDatabase, ref, child, set, onValue, get, update } from 'firebase/database'
import { snapshotViewportBox } from "framer-motion";
import initFirebase from "./initFirebase"

initFirebase();
const db = getDatabase();
const dbRef = ref(getDatabase());

// ============================ CREATE =======================================

export const createTableBooking = async (tableId, startDate, endDate, userID) => {
  // /reservations/4 (4 needs to be uniquely generated)

    console.log(tableId, startDate, endDate, userID);

    if (endDate === null) {
        endDate = startDate
    }

    return isAvailable(startDate, endDate, tableId).then(async (status) => {
        console.log(status)

        if (status === "available") {
            let startDateTimestamp = startDate.getTime()
            let endDateTimestamp = endDate.getTime()

            let objId = await getObjId("tableID", tableId)
            console.log(objId)

            let bookingId = generateID()
            await set(ref(db, 'floorplan/data/objects/' + objId + '/bookings/' + 'bookId_' + bookingId), {
                tableId: tableId,
                startDate: startDateTimestamp,
                endDate: endDateTimestamp,
                userId: userID
            });
            console.log(`booking id: ${bookingId}`)
            return("The table has been booked.")
        } else if (status === "unavailable") {
            // console.log("sucks to suck")
            return("Selected date(s) are unavailable or the table just got booked by another user. \n\nPlease choose another date.")
        }
    })
};

export const createRoomBooking = async (roomId, startDate, userID) => {
    // /reservations/4 (4 needs to be uniquely generated)
  
    console.log(roomId, startDate, userID);
    startDate.setSeconds(0)
    startDate.setMilliseconds(0)
  
    return isRoomAvailable(startDate, roomId).then(async (status) => {
        console.log(status)

        if (status === "available") {
            let startDateTimestamp = startDate.getTime()

            let objId = await getObjId("roomID", roomId)

            let bookingIdRoom = generateID()
            await set(ref(db, 'floorplan/data/objects/' + objId + '/bookings/' + 'bookId_' + bookingIdRoom), {
                roomId: roomId,
                startDate: startDateTimestamp,
                userId: userID
            });
            console.log(`booking id: ${bookingIdRoom}`)
            return("The room has been booked.")
        } else if (status === "unavailable") {
            // console.log("sucks to suck")
            return("Selected date & time are unavailable or it just got booked by another user. \n\nPlease choose another date or time.")
        }
    })
};

export const saveToDatabase = async (tableData) => {
    // need to make a helper function that compares if any bookings were made during editing and to deal with it
  await set(ref(db, 'floorplan/'), {
    data: tableData
  });
};

export const addUserToDatabase = async (userEmail) => {
  await set(ref(db, 'users/' + 'user_' + generateID()), {
    email: userEmail,
    teamId: 0,
    isAdmin: false
  });
};

// ============================ READ =======================================

export const isAdmin = async (userEmail) => {
  return get(child(dbRef, `users/`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      for (let id in data) {
        if (data[id]["email"] === userEmail) {
          // console.log(data[id]["isAdmin"])
          return data[id]["isAdmin"];
        }
      }
      return false;
    } else {
      console.log("No data available");
      return false;
    }
  }).catch((error) => {
    console.error(error);
  });
}

export const getRooms = async () => {
  return get(child(dbRef, `rooms/`)).then((snapshot) => {
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


export const getMaxDays = async () => {
  return get(child(dbRef, `settings/`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      console.log(data["maxDays"])
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
};

export const getMaxHours = async () => {
  return get(child(dbRef, `settings/`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      console.log(data["maxHours"])
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
};



export const getUserTableBookings = async (userID) => {
  return get(child(dbRef, `tables/`)).then((snapshot) => {
    let curBookings = [];
    if (snapshot.exists()) {
      const data = snapshot.val();


      for (let table of data) {
        for (let booking of table.bookings) {
          if (booking.userId === userID) {
            let ans = {table: table.id, startDate: booking.startDate, endDate: booking.endDate, teamId: table.teamId}
            console.log(ans);
            curBookings.push(ans);
          }
        }
      }
    } else {
      console.log("No data available");
    }
    return curBookings;

  }).catch((error) => {
    console.error(error);
  });
};

export const getAllTableBookings = async () => {
  let allBookings = [];
  return get(child(dbRef, `floorplan/data/objects/`)).then((snapshot) => {

    if (snapshot.exists()) {
      const data = snapshot.val();
      // console.log(data);
      for (let key in data) {
        if (data[key]["bookings"] === undefined) {
        }
        else {
          try {
            for (let booking of data[key]["bookings"]) {
              booking["table"] = data[key]["name"];

              allBookings.push(booking)
            }
          }
          catch(err) {
            // object is not iterable
            data[key]["bookings"]["table"] = data[key]["name"];
            allBookings.push(data[key]["bookings"])
          }
        }
      }
    }
    else {
      console.log("No data available");
    }
    // console.log(allBookings)
    return allBookings;
  }).catch((error) => {
    console.error(error);
  });
};

export const getTableBookings = async (tableId) => {
    return get(child(dbRef, `floorplan/data/objects/`)).then( async (snapshot) => {
        if (snapshot.exists()) {
            let objId = await getObjId("tableID", tableId)
            const data = snapshot.val();
            // console.log(data[tableId]);
            return [data[objId]["bookings"]];
          
        }
    })
};

export const getRoomBookings = async (roomId) => {
    return get(child(dbRef, `floorplan/data/objects/`)).then( async (snapshot) => {
        if (snapshot.exists()) {
            let objId = await getObjId("roomID", roomId)
            const data = snapshot.val();
            // console.log(data[roomId]);
            return [data[objId]["bookings"]];
            
        }
    })
};

export const getUserRoomBookings = async (userID) => {
  return get(child(dbRef, `rooms/`)).then((snapshot) => {
    let curBookings = [];
    if (snapshot.exists()) {
      const data = snapshot.val();


      for (let table of data) {
        for (let booking of table.bookings) {
          if (booking.userId === userID) {
            let ans = {table: table.id, startDate: booking.startDate, endDate: booking.endDate, teamId: table.teamId}
            console.log(ans);
            curBookings.push(ans);
          }
        }
      }
    } else {
      console.log("No data available");
    }
    return curBookings;

  }).catch((error) => {
    console.error(error);
  });
};

export const getAllRoomBookings = async () => {

  return get(child(dbRef, `rooms/`)).then((snapshot) => {

    if (snapshot.exists()) {
      const data = snapshot.val();
      let allBookings = [];

      for (let key in data) {
        for (let booking of table.bookings) {
          let ans = {table: table.id, startDate: booking.startDate, endDate: booking.endDate, teamId: table.teamId}
          allBookings.push(ans);
        }
      }
      return allBookings;
    }
    else {
      console.log("No data available");
    }
    return allBookings;

  }).catch((error) => {
    console.error(error);
  });
};

export const getAllTables = async () => {
  return get(child(dbRef, `tables/`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
};

export const getFloorPlan = async ()=> {
  return get(child(dbRef, `floorplan/data`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
};

export const getAllTeams = async () => {
  return get(child(dbRef, `teams/`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
};
// ============================ UPDATE =======================================

export const updateMaxRoomHours = async (maxHours) => {
  await update(ref(db, 'settings/' ), {
    maxHours: maxHours,
  });
  console.log("Succesfully update max hours for rooms")
};

export const updateMaxTableDays = async (maxDays) => {
  await update(ref(db, 'settings/' ), {
    maxDays: maxDays,
  });
  console.log("Successfully updated max days")
};

// ============================ DELETE =======================================

export const deleteTableBooking = async (tableBookingID) => {
  remove(ref(db, 'tables/booking/' + tableBookingID));
  console.log("Successfully delete this tableBookingID")
};

export const deleteRoomBooking = async (tableBookingID) => {
  remove(ref(db, 'rooms/bookings/' + tableBookingID));
  console.log("Successfully delete this room Booking")
};

// ============================ HELPER =======================================

const generateID = () => {
  // probably bad but just need a way of generating IDs
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( var i = 0; i < 6; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
  }
  return result;
};


const isAvailable = (startDate, endDate, tableId) => {
    // check availability for given table

    let avail = true

    return getTableBookings(tableId).then(allCurrentBookings => {
        allCurrentBookings.forEach(bookingsForTable => {
            for (let key in bookingsForTable) {
                if (bookingsForTable[key] !== undefined) {
                    let existingBookingStartDate = new Date(bookingsForTable[key].startDate)
                    let existingBookingEndDate = new Date(bookingsForTable[key].endDate)
                    existingBookingStartDate.setHours(0,0,0,0)
                    existingBookingEndDate.setHours(0,0,0,0)
                    startDate.setHours(0,0,0,0)
                    endDate.setHours(0,0,0,0)

                    // console.log(existingBookingStartDate)
                    // console.log(startDate)
                    // console.log(existingBookingStartDate <= startDate)
                    // // console.log(startDate <= endDate)
                    // console.log(endDate <= existingBookingEndDate)

                    if ((existingBookingStartDate <= startDate && endDate <= existingBookingEndDate) ||
                        (existingBookingStartDate <= startDate && startDate <= existingBookingEndDate) ||
                        (existingBookingStartDate <= endDate && endDate <= existingBookingEndDate) ||
                        (startDate <= existingBookingStartDate && existingBookingEndDate <= endDate) ||
                        (endDate < startDate)) {
                            avail = false
                    }
                }
            }
        })

        // prob super scuffed but it doesnt work when i return in the if statement above 🤡
        if (avail) {
            return "available"
        } else {
            return "unavailable"
        }
    })

}


const isRoomAvailable = (startDate, roomId) => {
    let avail = true

    return getRoomBookings(roomId).then(allCurrentBookings => {
        allCurrentBookings.forEach(bookingsForRoom => {
            for (let key in bookingsForRoom) {
                if (bookingsForRoom[key] !== undefined) {
                    let existingBookingStartDateEpoch = bookingsForRoom[key].startDate
                    let startDateEpoch = startDate.getTime()

                    // console.log(existingBookingStartDateEpoch, "existing")
                    // console.log(startDateEpoch,"current")
                    // console.log(existingBookingStartDateEpoch === startDateEpoch)

                    if (existingBookingStartDateEpoch === startDateEpoch) {
                        avail = false
                    }
                }
            }
        })

        // prob super scuffed but it doesnt work when i return in the if statement above 🤡
        if (avail) {
            return "available"
        } else {
            return "unavailable"
        }
    })
} 


const getObjId = async (tableIdOrRoomId, id) => {
    // gets the object key of firebase b/c the id of room or table does not always equal the object key
    return get(child(dbRef, `floorplan/data/objects`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (let objId in data) {
                if (data[objId][tableIdOrRoomId] === id) {
                    return objId
                }
            }
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.log(error);
    })
}