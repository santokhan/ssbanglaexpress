const express = require("express");
const fs = require("fs");
const port = 3000;
const app = express();
const path = require("path");

app.use("/", express.static(path.join(__dirname, "client")));
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
