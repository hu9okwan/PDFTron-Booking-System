import firebase from "firebase/compat/app";
import {getDatabase, ref, child, set, onValue, get, update } from 'firebase/database'
import initFirebase from "./initFirebase"

initFirebase();
const db = getDatabase();
const dbRef = ref(getDatabase());

// ============================ CREATE =======================================

export const createTableBooking = async (tableId, startDate, endDate, userID) => {
  // /reservations/4 (4 needs to be uniquely generated)

  console.log(tableId, startDate, endDate, userID);

    return isAvailable(startDate, endDate, tableId).then(async (status) => {
        console.log(status)

        if (status === "available") {
            let startDateTimestamp = startDate.getTime()
            let endDateTimestamp = endDate.getTime()
        
            await set(ref(db, 'floorplan/data/objects/' + tableId + '/bookings/' + 'bookId_' + generateID()), {
                tableId: tableId,
                startDate: startDateTimestamp,
                endDate: endDateTimestamp,
                userId: userID
            });
            // console.log("Booked table")
            return("Booked table")
        } else if (status === "unavailable") {
            // console.log("sucks to suck")
            return("sucks to suck")
        }
    })

};

export const saveToDatabase = async (tableData) => {
  await set(ref(db, 'floorplan/'), {
    data: tableData
  });
};

// ============================ READ =======================================
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


export const getMaxDays = async () => {
  get(child(dbRef, `settings/`)).then((snapshot) => {
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
  get(child(dbRef, `settings/`)).then((snapshot) => {
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
  get(child(dbRef, `tables/`)).then((snapshot) => {
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

export const getAllTableBookings = async (tableId) => {
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
    return get(child(dbRef, `floorplan/data/objects/`)).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            // console.log(data[tableId]);
            return [data[tableId]["bookings"]];
          }
        }
    )
  };

export const getUserRoomBookings = async (userID) => {
  get(child(dbRef, `rooms/`)).then((snapshot) => {
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
  let allBookings = [];
  get(child(dbRef, `rooms/`)).then((snapshot) => {

    if (snapshot.exists()) {
      const data = snapshot.val();

      for (let key in data) {
        for (let booking of table.bookings) {
          let ans = {table: table.id, startDate: booking.startDate, endDate: booking.endDate, teamId: table.teamId}
          allBookings.push(ans);
        }
      }
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
  get(child(dbRef, `tables/`)).then((snapshot) => {
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
  get(child(dbRef, `teams/`)).then((snapshot) => {
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