import { emitirTextoEditor } from "./socket-front-documento.js";


const textoEditor = document.getElementById("editor-texto");

textoEditor.addEventListener("keyup", () => {
  const conteudo = textoEditor.value;
  emitirTextoEditor(conteudo);
}
);

function atualizaTextoEditor(texto){
  textoEditor.value = texto;
}

export { atualizaTextoEditor };