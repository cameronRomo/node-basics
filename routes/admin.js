const express = require("express");
const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send(
    `<html>
      <form action='/product' method='POST'>
        <input type='text' name='title'>
        <button type='submit'>Add Product</button>
        </input>
      </form>
    </html>`
  );
});

router.post("/product", (req, res, next) => {
  console.log("req.body", req.body);
  res.redirect("/");
});

module.exports = router;