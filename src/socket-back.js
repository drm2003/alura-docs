import io from "./server.js";

const documentos = [
  {
    nome: "JavaScript",
    texto: "Texto de JavaScript ..."
  },
  {
    nome: "Node",
    texto: "Texto de Node ..."
  },
  {
    nome: "Socket.io",
    texto: "Texto de Socket.io ..."
  }
]

io.on("connection", (socket) => {
  console.log("Um cliente se conectou!", socket.id);


  socket.on("selecionar_documento", (nomeDocumento) => {
    // criando as salas
    socket.join(nomeDocumento);
    
    const documento = encontraDocumento(nomeDocumento);
        // console.log(documento);
    
    if (documento) {
      socket.emit("texto_documento", documento.texto);
    }

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

function encontraDocumento(nome) {
  const documento = documentos.find((documento) => {
    return documento.nome === nome;
  });

  return documento;
}