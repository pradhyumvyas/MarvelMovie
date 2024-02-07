const express = require('express');
const cookieParser = require('cookie-parser');

const expressApp = express();

expressApp.use(express.json({
   limit: "16kb"
}));

expressApp.use(express.urlencoded({ extended: true }));

expressApp.use(cookieParser());

expressApp.use("/api/v1/users", require("./routes/user.routes.ts"));
// app.use("api/v1/marvel", require("./routes/marvel.routes.ts"));

module.exports = expressApp;