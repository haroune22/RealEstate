import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "fialed to create user" });
  }
};


export const login = async (req, res) => {
  const { username, password } = req.body;

  try {

    // check if the user exists or not
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    //check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    // generate token and send it to the user
    const age = 1000 * 60 * 24 * 7 

    const token = jwt.sign({
      id: user.id,
      isAdmin: true,
    }, process.env.JWT_SECRET_KEY, { expiresIn: age })

    const {password:userPassword, ...userInfo } = user
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true, // only in production "HTTPS",
        maxAge: age,
        sameSite: "None", // Allows the cookie to be sent in all contexts
      })
      .status(200)
      .json(userInfo);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "fialed to login" });
  }
};


export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
