const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const homeRoutes = require("./routes/HomeRoutes");
const userRoutes = require("./routes/UserRoutes");
const authRoutes = require("./routes/AuthRoutes");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));


app.use("/api/v1/home", homeRoutes); // no Auth routes 
app.use("/api/v1/user", userRoutes); // user creation and login/logout
app.use("/api/v1/blog", authRoutes); // For routes where users interact with their posts or admins

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});