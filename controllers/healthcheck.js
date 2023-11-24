const db = require("../models/index.js");

const healthcheck = async (res, req) => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.close();
    res.status(200).send(JSON.stringify({ status: "Sucessfully connected" }));
  } catch (error) {
    await db.sequelize.close();
    res.status(500).send(JSON.stringify({ status: "failed to connect" }));
  }
};

module.exports = healthcheck;
