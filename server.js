const express = require("express");
const app = express();
cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

// Set the default timezone to West African Time (Africa/Lagos)
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Africa/Lagos");

const userLogin = require("./auth/login");
const userSignup = require("./auth/signup");
const userApis = require("./controllers/user");




app.use(userLogin);
app.use(userSignup);
app.use('/user', userApis);




// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
