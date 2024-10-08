const express = require("express");
const app = express();
const { connectToDB } = require("../mongodb");
const { generateToken } = require("./token");

function validateEmail(email) {
  if (email.length < 5) return false;
  return true;
}

function validatePassword(password) {
  if (password.length < 8) return false;
  return true;
}

function validateName(name) {
  if (!name || name.length < 3) return false;
  return true;
}

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("mintu checking", name, email, password);

  if (!validateEmail(email)) {
    res.status(400).json({ message: "Invalid email format" });
    return;
  }
  if (!validateName(name)) {
    res.status(400).json({ message: "Invalid name" });
    return;
  }
  if (!validatePassword(password)) {
    res.status(400).json({ message: "Invalid password" });
    return;
  }
  try {
    const db = await connectToDB();
    const usersCollection = db.collection("users");

    const user = {
      email: email,
      name: name,
      password: password,
    };

    //check if the user already exists
    const existingEmail = await usersCollection.findOne({ email });
    if (existingEmail) {
      res.status(400).json({ message: "Email already Exists" });
      return;
    }

    //insert the new user into db
    const result = await usersCollection.insertOne(user);
    const userDetails = {
      id: result.insertId,
      email,
    };

    //generate the token with user's id and email
    const token = generateToken(userDetails);
    res.status(200).json({
      name: name,
      email: email,
      token,
    });
  } catch (error) {
    console.log("error executing query", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
