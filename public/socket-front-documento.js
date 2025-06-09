import { atualizaTextoEditor } from "./documento.js";

const socket = io();

// com a função callback, é possível fazer o encaminhamento do texto para o back
function selecionarDocumento(nome) {
  socket.emit("selecionar_documento", nome, (texto) => {
    atualizaTextoEditor(texto);
  });
}

function emitirTextoEditor(dados){
    socket.emit("texto_editor", dados);
}

// com a callback, não precisa mais desse
// socket.on("texto_documento", (texto) => {
//   atualizaTextoEditor(texto);
// });

socket.on("texto_editor_clientes", (texto) => {
    // console.log(texto); 
    atualizaTextoEditor(texto);
});

socket.on("disconnect", (motivo) => {
  console.log(`Servidor desconectado!
  Motivo: ${motivo}`);
});

function emitirExcluirDocumento(nome) {
  socket.emit("excluir_documento", nome);
}

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };