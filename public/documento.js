import { emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";


const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

const tituloDocumento = document.getElementById("titulo-documento");

tituloDocumento.textContent = nomeDocumento || "Documento sem título";

selecionarDocumento(nomeDocumento);

const textoEditor = document.getElementById("editor-texto");

textoEditor.addEventListener("keyup", () => {
  const conteudo = textoEditor.value;
  emitirTextoEditor({
    texto: conteudo,
    nomeDocumento: nomeDocumento
  });
}
);

function atualizaTextoEditor(texto){
  textoEditor.value = texto;
}

export { atualizaTextoEditor };