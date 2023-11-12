const connection = require("../config/db");
// Get list of users
function getUsers(req, res) {
    res.send("Hello, this is your API!");
}

// Get user profile
function getUserProfile(req, res) {
  const id = req.userData.userId;
  const sql = "SELECT * FROM `users` WHERE `id` = " + id;
  
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.json({ statusCode: 500, error: "Internal Server Error" });
      return;
    }

    res.json(...results);
  });
}



module.exports = {
  getUsers,
  getUserProfile,
};
