
const bookingModule = require("./booking");


// SET UP
// bookingModule.bookTable("test@pdftron.com", "1", "10-23-2021", "10-24-2021");


// ===================== TESTING ==================

// test("Test to see if Table 1 is available for booking", async () => {
//     // set up
//     await bookingModule.bookTable("test@pdftron.com", "1", "10-23-2021", "10-24-2021");
//
//     const data = await bookingModule.checkTableAvailability();
//     expect(data).toBe(true);
// });
//
//
// test("Get incremental tableIDs", async () => {
//
//     const id = await bookingModule.generateTableBookingID();
//     expect(id).toBe(5);
// });
//
//
// test("Test to see if table exists", async () => {
//     const tbl = await bookingModule.tableExists("Table1");
//     let exists;
//     exists = tbl !== {};
//     expect(exists).toBe(true);
// });


// test("Fail Check if table is available between these dates", async () => {
//     const avail = await bookingModule._checkTableAvailability(2, "Oct 24, 2021 00:00:00", "Oct 24, 2021 00:00:00");
//     expect(avail).toBe(true);
// });
