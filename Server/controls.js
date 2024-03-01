const mongoose = require("mongoose");

const ControlsSchema = new mongoose.Schema(
    {
        ID: Number,
        Category: String,
        Type: String,
        Sub_Category: String,
        ASVS_ID: String,
        Requirement_Description: String,
        ASVS_level: Number,
        NIST_ID: String,
        NIST_Controls: String,
        data_used: Array
    },
    {
        collection: "Controls",
    }
);

mongoose.model("Controls", ControlsSchema);