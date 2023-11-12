const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 8000; // You can change the port as needed

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/users");
const faqRoutes= require("./src/routes/faq");
// Use the defined routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", faqRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
