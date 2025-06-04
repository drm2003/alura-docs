import io from "./server.js";

io.on("connection", (socket) => {
  console.log("Um cliente se conectou!", socket.id);

  socket.on("selecionar_documento", (nomeDocumento) => {
    // console.log(nomeDocumento);

    // criando as salas
    socket.join(nomeDocumento);
  });

  socket.on("texto_editor", ({ texto, nomeDocumento }) => {
    // envia para todos os usuários
    // io.emit("texto_editor_clientes", texto);

    // faz o envio para todos, com exceção do próprio usuário
    //socket.broadcast.emit("texto_editor_clientes", texto);

    // emite apenas para a sala
    socket.to(nomeDocumento).emit ("texto_editor_clientes", texto);
  });
});
