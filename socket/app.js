import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("newUser", (data) => {
    console.log("Data received from client:", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

io.listen(4000);
