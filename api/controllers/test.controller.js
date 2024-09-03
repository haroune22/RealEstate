import jwt from "jsonwebtoken";

export const logged_in = async (req, res) => {
  
  // const userId = req.userId
  // console.log(userId)
  res.status(200).json({ message: "Token is valid" });
};

export const admin = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not Authenticated!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token is not Valid!" });
    }
    if (!payload.isAdmin) {
      return res.status(403).json({ message: "Not authorized!" });
    }

    return res.status(200).json({ message: "You are Authenticated" });
  });
};
