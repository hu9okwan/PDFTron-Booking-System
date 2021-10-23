
const bookingModule = require("./booking");


// SET UP
bookingModule.bookTable("test@pdftron.com", "1", "10-23-2021", "10-24-2021");


// ===================== TESTING ==================
//
// test("Test to see if Table 1 is available for booking", async () => {
//     // set up
//     await bookingModule.bookTable("test@pdftron.com", "1", "10-23-2021", "10-24-2021");
//
//     const data = await bookingModule.checkTableAvailability();
//     expect(data).toBe(true);
// });

//
// test("Get incremental tableIDs", async () => {
//
//     const id = await bookingModule.generateTableBookingID();
//     expect(id).toBe(5);
// });
