import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";


const socket = io();

socket.on("documento_existente", (nome) => {
  alert(`O documento "${nome}" já existe!`);
});

socket.on("adicionar_documento_interface", (nome) => {
  inserirLinkDocumento(nome);
});

socket.emit("obter_documentos", (documentos) => {  
    documentos.forEach((documento) => {
        inserirLinkDocumento(documento.nome);
    });
});

socket.on("excluir_documento_sucesso", (nome) => {
  removerLinkDocumento(nome);
});

function emitirAdicionarDocumento(nome) {
  socket.emit("adicionar_documento", nome);
}

export { emitirAdicionarDocumento };