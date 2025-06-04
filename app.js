const express = require('express');

const homeRoutes = require("./routes/HomeRoutes");
const userRoutes = require("./routes/UserRoutes")

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/home", homeRoutes);
app.use("/api/v1/user", userRoutes);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});