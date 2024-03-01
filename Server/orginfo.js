const mongoose = require("mongoose");

const OrgInfoSchema = new mongoose.Schema(
    {
        org_name: String,
        risk_framework: String,
    },
    {
        collection: "OrgInfo",
    }
);

mongoose.model("OrgInfo", OrgInfoSchema);