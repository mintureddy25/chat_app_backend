const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  //get token from the headers or query params
  const token = req.headers.token;
  if (!token) {
    res.status(401).json({ message: "Missing token" });
  }

  try {
    //verify token and decode it
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; //attach the decoded user details to user request

    next(); //proceed to next if it is verified
  } catch (error) {
    console.error("Error verifying token", error);
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { verifyToken };
