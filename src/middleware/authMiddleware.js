// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.json({ statusCode: 401, error: "Authentication failed" });
  }

  jwt.verify(token, jwtConfig.jwtSecret, (err, decoded) => {
    if (err) {
      return res.json({ statusCode: 401, error: "Authentication failed" });
    }

    req.userData = decoded;
    next();
  });
}

module.exports = {
  verifyToken,
};
