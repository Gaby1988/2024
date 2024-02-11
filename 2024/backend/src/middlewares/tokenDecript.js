const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenDecript = (req, res, next) => {
  try {
    const { token } = req.body;
    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    console.info(req.payload);
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = tokenDecript;
