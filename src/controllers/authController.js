const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");
const connection = require("../config/db");

// User login
function loginUser(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.json({ statusCode: 400, error: "Invalid request. Please provide username and password." });
  }
  
  const { username, password } = req.body;

  const hashedPassword = require("crypto")
    .createHash("md5")
    .update(password)
    .digest("hex");

  connection.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, hashedPassword],
    (err, results) => {
      if (err) {
        return res.json({ statusCode: 500, error: "Database error" });
      }

      if (results.length === 0) {
        return res.json({ statusCode: 401, error: "Invalid credentials" });
      }

      const user = results[0];

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        jwtConfig.jwtSecret,
        { expiresIn: "1h" }
      );

      return res.json({ statusCode: 200, id: user.id, userToken: token });
    }
  );
}

// Check if the provided token is valid
function checkToken(req, res) {
  if (req.userData) {
    res.json({ statusCode: 200, message: "Token is valid" });
  } else {
    res.json({ statusCode: 401, error: "Token is not valid" });
  }
}

module.exports = {
  loginUser,
  checkToken,
};
