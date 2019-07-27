const express = require("express");
const app = express();
const path = require("path");
const Router = require("./routes/routes");

app.use(express.static("public"));
app.use(Router);

app.listen(3000, () => {
  console.log("App starting now...");
});
