require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/db");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes.router);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize
  .sync()
  .then((result) => {
    // console.log("sync result >", result)
    app.listen(3000);
  })
  .catch((err) => console.error(err));
