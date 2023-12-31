const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/db");
// user
const { userrouter } = require("./routes/user.routes");
// auth
const { auth } = require("./middleware/auth.middleware");
// Dash
const { dashRouter } = require("./routes/dashboard.route");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
     res.send("please login");
   });
// user
app.use("/users", userrouter);

// app.use(auth);
// Dash
app.use("/employees", dashRouter);

app.listen(process.env.port, async () => {
    try {
        await connection
        
        console.log(`Server is running at port ${process.env.port}`);
        console.log("Connected to DB");
    } catch (error) {
        console.log(error.message);
    }
})