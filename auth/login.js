const express = require("express");
const { connectToDB } = require("../mongodb");
const { generateToken } = require("./token");
const app = express();

function validateEmail(email) {
  if (email.length < 5) return false;
  return true;
}

function validatePassword(password) {
  if (password.length < 8) return false;
  return true;
}

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!validateEmail(email)) {
    res.status(400).json({ message: "Invalid emaiml format" });
    return;
  }
  if (!validatePassword(password)) {
    res.status(400).json({ message: "Invalid password format" });
    return;
  }
  try {
    const db = await connectToDB();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "No user found" });
      return;
    }

    if (user.password === password) {
      const token = generateToken({ id: user.id, email: user.email });
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = app;
