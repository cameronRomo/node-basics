require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./util/db");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

db.execute("SELECT * FROM products")
  .then((result) => {
    console.log("res", result);
  })
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes.router);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
