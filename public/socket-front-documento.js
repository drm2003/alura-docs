import { atualizaTextoEditor } from "./documento.js";

const socket = io();

function emitirTextoEditor(conteudo){
    socket.emit("texto_editor", conteudo);
}

socket.on("texto_editor_clientes", (texto) => {
    // console.log(texto); 
    atualizaTextoEditor(texto);
});

socket.on("disconnect", (motivo) => {
  console.log(`Servidor desconectado!
  Motivo: ${motivo}`);
});

export { emitirTextoEditor };