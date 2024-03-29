import firebase from "firebase/compat/app";
import {getDatabase, ref, child, set, onValue, get, update, remove } from 'firebase/database'
import { snapshotViewportBox } from "framer-motion";
import initFirebase from "./initFirebase"

initFirebase();
const db = getDatabase();
const dbRef = ref(getDatabase());

// ============================ CREATE =======================================

export const createTeam = async(newTeamInfo) => {
    await set(ref(db, 'teams/' + id), {
        name: newTeamInfo.name,
        id: newTeamInfo.id,
        colour: newTeamInfo.colour
    });
};


export const createTableBooking = async (tableId, startDate, endDate, userId) => {
  // /reservations/4 (4 needs to be uniquely generated)

    console.log(tableId, startDate, endDate, userId);

    if (endDate === null) {
        endDate = new Date(startDate)
    }

    return isAvailable(startDate, endDate, tableId).then(async (status) => {
        // console.log(status)

        if (status) {
            let startDateTimestamp = startDate.getTime()
            let endDateTimestamp = endDate.getTime()

            let objId = await getObjId("tableID", tableId)
            console.log(objId)

            let bookingId = generateID()
            await set(ref(db, 'floorplan/data/objects/' + objId + '/bookings/' + 'bookId_' + bookingId), {
                tableId: tableId,
                startDate: startDateTimestamp,
                endDate: endDateTimestamp,
                userId: userId
            });
            console.log(`booking id: ${bookingId}`)
            let bookingDateString = startDate === endDate ? `${startDate.toDateString()}` : `${startDate.toDateString()} to ${endDate.toDateString()}`
            let returnMsg = [status, `The table has been booked for: ${bookingDateString}`, startDate, endDate]
            return(returnMsg)
        } else {
            // console.log("sucks to suck")
            let returnMsg = [status, "Selected date(s) are unavailable or it just got booked by another user. Please choose another date.", startDate, endDate]
            return(returnMsg)
        }
    })
};

export const createRoomBooking = async (roomId, startDate, endDate, startTime, endTime, userId) => {


    if (endDate === null) {
        endDate = new Date(startDate)
    }

    // console.log(startDate, endDate, startTime, endTime)

    return isRoomAvailable(startDate, endDate, startTime, endTime, roomId).then(async (status) => {


    //     return ["testing"]
    // })

    startDate.setHours(startTime.getHours())
    startDate.setMinutes(startTime.getMinutes())
    startDate.setSeconds(0)

    endDate.setHours(endTime.getHours())
    endDate.setMinutes(endTime.getMinutes())
    endDate.setSeconds(0)


    // return isRoomAvailable(startDate, roomId).then(async (status) => {
    //     // console.log(status)

        if (status) {
            let startDateTimestamp = startDate.getTime()
            let endDateTimestamp = endDate.getTime()


            let objId = await getObjId("roomID", roomId)

            let bookingIdRoom = generateID()
            await set(ref(db, 'floorplan/data/objects/' + objId + '/bookings/' + 'bookId_' + bookingIdRoom), {
                roomId: roomId,
                startDate: startDateTimestamp,
                endDate: endDateTimestamp,
                userId: userId
            });
            console.log(`booking id: ${bookingIdRoom}`)
            let returnMsg = [status, `The room has been booked for: ${startDate.toDateString()} at ${formatDate(startDate)}`, startDate]
            return(returnMsg)
        } else {
            // console.log("sucks to suck")
            let returnMsg = [status, "Selected date(s) are unavailable or it just got booked by another user. Please choose another date.", startDate]
            return(returnMsg)
        }
    })
};

export const saveToDatabase = async (tableData) => {
    // need to make a helper function that compares if any bookings were made during editing and to deal with it
  await set(ref(db, 'floorplan/'), {
    data: tableData
  });
};

export const addUserToDatabase = async (session) => {
    let name = session.user.name
    let userEmail = session.user.email
    let data = await findNextAvailableUserId();
    await set(ref(db, 'users/' + data[1]), {
    name: name,
    email: userEmail,
    teamId: 1,
    isAdmin: false,
    id: data[0]
  });
  return {id: data[0], teamId: 1, isAdmin: false}
};

// ============================ READ =======================================

export const getAllSettings = async () => {
    let settings = [];
    return get(child(dbRef, 'settings/')).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (let key in data) {
                settings.push(data[key])
            }
            return settings
        }
    })
};

export const getAllUsers = async () => {
    let userArr = []
    return get(child(dbRef, `users/`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (let key in data) {

                try {
                    for (let user of data[key]) {
                        userArr.push(user)
                    }
                }
                catch(err) {
                    // object is not iterable
                    userArr.push(data[key])
                }
            }
            return userArr
        }
    }).catch((error) => {
        console.error(error);
    });
}


export const getUserSessionInfo = async (userEmail) => {
    let userInfo = {}
    return get(child(dbRef, `users/`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (let key in data) {
                if (data[key]["email"] === userEmail) {
                    // console.log(data[key]["id"])
                    userInfo["userId"] = data[key]["id"]
                    userInfo["teamId"] = data[key]["teamId"]
                    userInfo["isAdmin"] = data[key]["isAdmin"]
                    return userInfo;
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
    let curBookings = [];
    if (!userID) {
        return curBookings
    }
    return get(child(dbRef, `floorplan/data/objects`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (let key in data) {

                try {
                    if (data[key]["tableID"] !== undefined) {
                        for (let bookingId in data[key]["bookings"]) {
                            if (data[key]["bookings"][bookingId]["userId"] === userID) {
                                let bookingObj = {[bookingId]: data[key]["bookings"][bookingId]}
                                curBookings.push(bookingObj)
                            }
                        }
                    }
                }
                catch(err) {
                    console.log(err)
                }
            }
            // console.log(curBookings)
            return curBookings
        }
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
            if (data[key]["tableID"] !== undefined) {
                for (let booking of data[key]["bookings"]) {
                // booking["table"] = data[key]["name"];

                allBookings.push(booking)
                }
            }
          }
          catch(err) {
            // object is not iterable
            // data[key]["bookings"]["table"] = data[key]["name"];
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
    let curBookings = [];
    if (!userID) {
        return curBookings
    }
    return get(child(dbRef, `floorplan/data/objects`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (let key in data) {

                try {
                    if (data[key]["roomID"] !== undefined) {
                        for (let bookingId in data[key]["bookings"]) {
                            if (data[key]["bookings"][bookingId]["userId"] === userID) {
                                let bookingObj = {[bookingId]: data[key]["bookings"][bookingId]}
                                curBookings.push(bookingObj)
                            }
                        }
                    }
                }
                catch(err) {
                    console.log(err)

                }
            }

            return curBookings
        }
    }).catch((error) => {
        console.error(error);
    });
};

export const getAllRoomBookings = async () => {
  let allBookings = [];
  return get(child(dbRef, `floorplan/data/objects`)).then((snapshot) => {

    if (snapshot.exists()) {
      const data = snapshot.val();

      for (let key in data) {
        if (data[key]["bookings"] === undefined){

        } else {
            try {
                if (data[key]["roomID"] !== undefined) {
                    for (let booking of data[key]["bookings"]) {
                        // booking["room"] = data[key]["name"];

                        allBookings.push(booking)
                    }
                }
            } catch(err) {
                // data[key]["bookings"]["room"] = data[key]["name"];
                allBookings.push(data[key]["bookings"])
            }
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
export const updateSettingInfo = async (settingNewInfo) => {
    let settingName = settingNewInfo.name;
    if (settingName.includes("Table")) {
        await update(ref(db, 'settings/0/'), {
            value: settingNewInfo.value,
        })
    }
    else {
        await update(ref(db, 'settings/1/'), {
            value: settingNewInfo.value,
        })
    }
};

export const updateUserInfo = async (userNewInfo) => {
    let userObjId = await getUserObjId(userNewInfo.id)
    await update(ref(db, 'users/' + userObjId ), {
        name: userNewInfo.name,
        email: userNewInfo.email,
        isAdmin: userNewInfo.isAdmin,
        teamId: parseInt(userNewInfo.teamId)
    });
    console.log("Successfully updated user")
};

export const updateTeamInfo = async (teamNewInfo) => {
    let id = teamNewInfo.id;
    console.log(id);
    await update(ref(db, 'teams/' + id), {
        name: teamNewInfo.name,
        colour: teamNewInfo.colour,
        id: teamNewInfo.id
    })
};

// ============================ DELETE =======================================

export const deleteTableBooking = async (tableBookingID) => {

    let path = await findBookingIdPath(tableBookingID)
    console.log(path)
    await remove(ref(db, 'floorplan/data/objects/' + path));
    console.log("Successfully deleted this table booking")
};

export const deleteRoomBooking = async (roomBookingID) => {
    let path = await findBookingIdPath(roomBookingID)
    await remove(ref(db, 'floorplan/data/objects/' + path));
    console.log("Successfully deleted this room booking")
};

export const deleteTeam = async (teamId) => {
    // probably need to add some checks here cuz if teamId is null,
    // all teams get deleted OMEGALUL
    await remove(ref(db, 'teams/' + teamId))
    console.log("Successfully deleted this team")
};

// ============================ HELPER =======================================

const findBookingIdPath = async (bookingId) => {
    return get(child(dbRef, `floorplan/data/objects`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val()
            for (let key in data) {
                if (data[key]["bookings"] !== undefined) {
                    for (let bookingIdInDb in data[key]["bookings"]) {
                        if (bookingIdInDb === bookingId) {
                            return `${key}/bookings/${bookingId}`
                        }
                    }
                }
            }
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
    });
};

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
            return true
        } else {
            return false
        }
    })

}


const isRoomAvailable = (startDate, endDate, startTime, endTime, roomId) => {
    let avail = true

    return getRoomBookings(roomId).then(allCurrentBookings => {
        allCurrentBookings.forEach(bookingsForRoom => {
            for (let key in bookingsForRoom) {
                if (bookingsForRoom[key] !== undefined) {
                    let existingBookingStartDate = new Date(bookingsForRoom[key].startDate)
                    let existingBookingEndDate = new Date(bookingsForRoom[key].endDate)

                    let a = new Date()
                    a.setHours(existingBookingStartDate.getHours())
                    a.setMinutes(existingBookingStartDate.getMinutes())
                    a.setSeconds(0)
                    a = a.getTime()

                    let b = new Date()
                    b.setHours(existingBookingEndDate.getHours())
                    b.setMinutes(existingBookingEndDate.getMinutes())
                    b.setSeconds(0)
                    b = b.getTime()


                    let c = new Date()
                    c.setHours(startTime.getHours())
                    c.setMinutes(startTime.getMinutes())
                    c.setSeconds(0)
                    c = c.getTime()

                    let d = new Date()
                    d.setHours(endTime.getHours())
                    d.setMinutes(endTime.getMinutes())
                    d.setSeconds(0)
                    d = d.getTime()

                    let existingDateRange = dateRange(existingBookingStartDate, existingBookingEndDate)
                    let requestBookDateRange = dateRange(startDate, endDate)

                    for (let existDate of existingDateRange) {

                        for (let bookDate of requestBookDateRange) {
                            if (areDatesSameDay(existDate, bookDate)) {

                                console.log("logic")


                                 console.log("*****")


                                if ((a <= c && d <= b) ||
                                    (a <= c && c < b) ||
                                    (a < d && d <= b) ||
                                    (c <= a && b <= d) ||
                                    (a === c && b === d)
                                    ) {
                                        avail = false
                                }

                            }
                        }
                    }
                }
            }
        })

        // prob super scuffed but it doesnt work when i return in the if statement above 🤡
        if (avail) {
            return true
        } else {
            return false
        }
    })
}

const getTeamObjId = async (teamID) => {
    return get(child(dbRef, 'teams/' + teamID)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (let objId in data) {
                if (data[objId]["id"] === id) {
                    return objId
                }
            }
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

const getUserObjId = async (id) => {
    // gets the object key of firebase b/c the id of room or table does not always equal the object key
    return get(child(dbRef, `users`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log(data)
            for (let objId in data) {

                if (data[objId]["id"] === id) {
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

const formatDate = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}


const findNextAvailableTeamId = async () => {
    let allTeams = await getAllTeams();
    return allTeams.length;
};

const findNextAvailableUserId = async () => {
    // finds next lowest available user id

    let allUsers = await getAllUsers()
    // console.log(allUsers, "********findNextAvailableUserId*")

    let id_list = [];
    for (let obj of allUsers) {
        id_list.push(obj["id"])
    }
    const set = new Set(id_list);
    let id = 1;
    while (set.has(id)) { id++ }

    return [id, allUsers.length]
}


const dateRange = (startDate, endDate, steps = 1) => {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dateArray.push(new Date(currentDate));
      // Use UTC date to prevent problems with time zones and DST
      currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }

    return dateArray;
}


const areDatesSameDay = (first, second) => {
    if (first.getYear() === second.getYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()) {
        return true
    }
    return false
}
