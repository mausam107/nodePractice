const path = require("path");
const http = require("http");

const express = require("express");

const rootdir = require("./utill/path");

const errorcontroller= require('./controllers/error')

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(adminRoutes);

app.use(shopRoutes);

app.use(errorcontroller.get404);

app.listen(3000, console.log("This is now connected!"));
