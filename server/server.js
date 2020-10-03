const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

http.listen(5000, () => {
  console.log("Server Online");
});

app.get("/", (req, res) => {
  res.json({
    msg: "Server Online",
  });
});

io.on("connection", (socket) => {
  //   console.log(socket.id);
  const id = socket.handshake.query.id;
  console.log("New User Connected", id);
  socket.join(id);

  socket.on("new-todo", (todo) => {
    // console.log("new todo");
    // socket.to(id).emit("refreshing-todo", todo);
    socket.broadcast.to(id).emit("refreshing-todo", todo);
  });
});
