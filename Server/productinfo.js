const mongoose = require("mongoose");

const ProductDetailsSchema = new mongoose.Schema(
    {
        name: String,
        Product_type: String,
        HTTP_used: Array,
        mech_used: Array,
        description: String,
        files: Array,
        system: String,
        data_used: Array
    },
    {
        collection: "ProductInfo",
    }
);

mongoose.model("ProductInfo", ProductDetailsSchema);