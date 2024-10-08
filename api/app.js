import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import usersRoute from "./routes/user.route.js";
import postsRoute from "./routes/post.route.js";
import messegesRoute from "./routes/messeges.route.js";
import chatRoute from "./routes/chat.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/messeges", messegesRoute);
app.use("/api/chats", chatRoute);

app.listen(8800, () => {
  console.log("server listening on 8800");
});
