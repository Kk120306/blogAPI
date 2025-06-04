const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const homeRoutes = require("./routes/HomeRoutes");
const userRoutes = require("./routes/UserRoutes");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: `http://localhost:${port}`, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  }));


app.use("/api/v1/home", homeRoutes);
app.use("/api/v1/user", userRoutes);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});