import { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento } from "./documentosDb.js";
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

  socket.on("adicionar_documento", async (nome) => {
    const documentoExiste = await (encontrarDocumento(nome)) !== null;

    if (documentoExiste) { 
      socket.emit("documento_existente", nome);
    } else {
      const resultado = await adicionarDocumento(nome);
  
       if (resultado.acknowledged) {
          io.emit("adicionar_documento_interface", nome);
      }
    }

  });

  socket.on("obter_documentos", async (devolverDocumentos) => {
    const documentos = await obterDocumentos();
    
    devolverDocumentos(documentos);
  });


  //console.log("Um cliente se conectou!", socket.id);

  // Versão 1 com o emit diretamente
  // socket.on("selecionar_documento", (nomeDocumento) => {
  //   // criando as salas
  //   socket.join(nomeDocumento);
    
  //   const documento = encontraDocumento(nomeDocumento);
  //       // console.log(documento);
    
  //   if (documento) {
  //     socket.emit("texto_documento", documento.texto);
  //   }

  // });

  // Versão 2 com o callback (devolverTexto)
  socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
    // criando as salas
    socket.join(nomeDocumento);
    
    const documento = await encontrarDocumento(nomeDocumento);
    // console.log(documento);
    
    devolverTexto(documento?.texto);

  });

  socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
    // envia para todos os usuários
    // io.emit("texto_editor_clientes", texto);

    // faz o envio para todos, com exceção do próprio usuário
    //socket.broadcast.emit("texto_editor_clientes", texto);

    // salvar documento em variável
    // const documento = encontrarDocumento(nomeDocumento);
    const atualizacao = await atualizaDocumento(nomeDocumento, texto);

    if (atualizacao.modifiedCount) {      
      // emite apenas para a sala
      socket.to(nomeDocumento).emit ("texto_editor_clientes", texto);
    }
  });

  socket.on("excluir_documento", async (nomeDocumento) => {
    const resultado = await excluirDocumento(nomeDocumento);
    
    if (resultado.modifiedCount) {
      io.emit("excluir_documento_interface", nomeDocumento);
    }
  });
});

