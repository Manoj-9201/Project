const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken");

const JWT_SECRET = "eiginq349u1240825ywryhhne[tjk25=-p[thuk;;[llthwy=tp34===";

const mongoUrl = "mongodb+srv://MK:383496@cluster0.q48wjxd.mongodb.net/test?authSource=Cluster0&authMechanism=SCRAM-SHA-1";

mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connected to Database");
    })
    .catch(e => console.log(e))

require("./UserDetails");


const User = mongoose.model("UserInfo");
app.post("/register", async (req, res) => {
    const { email, password, confirm_password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword)
    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.send({ error: "User Exists" })
        }
        await User.create({
            email,
            password: encryptedPassword,
            confirm_password: encryptedPassword
        })
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" })

    }
});

app.post("/login-user", async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.json({ error: "User not found" })
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({}, JWT_SECRET);

        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        }
        else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "Invalid Password" });
});



require("./productinfo")
const ProductInfo = mongoose.model("ProductInfo")
app.post("/productinfo", async (req, res) => {

    const prodInfo = req.body

    const result = await ProductInfo.create(prodInfo)
    if (res.status(200)) {
        return res.json({ status: "ok", data: result });
    }
    else {
        return res.json({ error: "error" })
    }
});

require("./orginfo")
const OrgInfo = mongoose.model("OrgInfo")
app.post("/orginfo", async (req, res) => {
    const orgInfo = req.body
    const result = await OrgInfo.create(orgInfo)
    if (res.status(200)) {
        return res.json({ status: "ok", data: result });
    }
    else {
        return res.json({ error: "error" })
    }

});

require('./controls')
require('./level')
const Controls = mongoose.model('Controls')
const Levels = mongoose.model('Levels')
app.post('/query_category_by_type', async (req, res) => {

    try {

        const { query_data } = req.body

        const data = {}
        for (let category of Object.keys(query_data)) {
            if (category === 'system' || category === 'data_used') continue

            const query = [...query_data[category], ""]
            const cate_in = await Controls.find(
                {
                    Category: category,
                    Type: {
                        $in: query
                    }
                }
            )

            const cate_out = await Controls.find(
                {
                    Category: category,
                    Type: {
                        $nin: query
                    }
                }
            )

            if (!(category in data))
                data[category] = { included: [], excluded: [] }

            data[category]['included'].push(cate_in)
            data[category]['excluded'].push(cate_out)

            data[category]['included'] = data[category]['included'][0]
            data[category]['excluded'] = data[category]['excluded'][0]
            // console.log(data[category]['included']);
            // console.log(data[category]['excluded']);
        }



        const all_levels = await Levels.findOne({ name: query_data.system })
        console.log(all_levels.values, query_data.data_used);
        let level = 0
        for (let i of all_levels.values)
            for (let j of query_data.data_used)
                if (i.name === j)
                    level = i.level



        res.json({ data, level })
    } catch (e) {
        console.log(e);
        res.status(500).json({ data: null, msg: 'Internal Server error' })
    }




})


// app.get("/getInfo", async (req, res) => {
//     ProductInfo.find((err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         }
//         else {
//             res.status(200).send(data);
//         }
//     })
// })




app.listen(5000, () => {
    console.log("Server Started");
})

