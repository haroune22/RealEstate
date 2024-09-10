
import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("first connection")
});

io.listen(4000, ()=> {
    console.log("listening on port 3000")
});
