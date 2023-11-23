const express = require("express");
const db = require("./models/index.js");

const app = express();

app.get("/healthcheck", async (req, res) => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.close();
    res.status(200).send(JSON.stringify({ status: "Sucessfully connected" }));
  } catch (error) {
    await db.sequelize.close();
    res.status(500).send(JSON.stringify({ status: "failed to connect" }));
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
