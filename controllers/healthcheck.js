const db = require("../models/index.js");

const healthcheck = (db) => {
  return async (req, res) => {
    try {
      await db.sequelize.authenticate();
      await db.sequelize.close();
      res.status(200).json({ status: "Sucessfully connected" });
    } catch (error) {
      await db.sequelize.close();
      res.status(500).json({ status: "failed to connect" });
    }
  };
};

module.exports = healthcheck;
