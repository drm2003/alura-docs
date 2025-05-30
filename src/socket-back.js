import io from "./server.js";

io.on("connection", (socket) => {
  console.log("Um cliente se conectou!", socket.id);

  socket.on("texto_editor", (texto) => {
    // envia para todos os usuários
    // io.emit("texto_editor_clientes", texto);

    // faz o envio para todos, com exceção do próprio usuário
    socket.broadcast.emit("texto_editor_clientes", texto);
  });
});
