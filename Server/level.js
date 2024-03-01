const mongoose = require("mongoose");



// const LevelSchema = new mongoose.Schema(
//     {
//         name: "Can go down for upto 72hrs",
//         values: [{
//             name: "Financial Account number, Payment Card number, Medical data, Cryptographic keys, Driver License",
//             level: "3",
//         },
//         {
//             name: 'Birth date, Educational data, Financial data, System Config settings, Internal IP address, legal billings, Corporate tax, Paychecks, Bank account information',
//             level: "2",
//         },
//         {
//             name: "Phone number, Age, Home address, gender, email, Internet Facing Websites (e.g., company website, social networks, blogs etc.)",
//             level: "1",
//         },]
//     },
//     {
//         name: "Cannot be tolerated",
//         values: [{
//             name: "Financial Account number, Payment Card number, Medical data, Cryptographic keys, Driver License",
//             level: "3",
//         },
//         {
//             name: 'Birth date, Educational data, Financial data, System Config settings, Internal IP address, legal billings, Corporate tax, Paychecks, Bank account information',
//             level: "3",
//         },
//         {
//             name: "Phone number, Age, Home address, gender, email, Internet Facing Websites (e.g., company website, social networks, blogs etc.)",
//             level: "3",
//         },]
//     },
//     {
//         name: "Can go down for upto 24hrs",
//         values: [{
//             name: "Financial Account number, Payment Card number, Medical data, Cryptographic keys, Driver License",
//             level: "3",
//         },
//         {
//             name: 'Birth date, Educational data, Financial data, System Config settings, Internal IP address, legal billings, Corporate tax, Paychecks, Bank account information',
//             level: "2",
//         },
//         {
//             name: "Phone number, Age, Home address, gender, email, Internet Facing Websites (e.g., company website, social networks, blogs etc.)",
//             level: "2",
//         },]
//     },
//     {
//         collection: "LevelSchema",
//     }
// );

const LevelSchema = new mongoose.Schema(
    {
        name: String,
        values: [
            {
                name: String,
                level: String
            }
        ]
    },
    {
        collection: "LevelSchema"
    }
)

mongoose.model("Levels", LevelSchema);