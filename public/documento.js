const socket = io();

const textoEditor = document.getElementById("texto-editor");

textoEditor.addEventListener("keyup", () => {
    console.log("Tecla pressionada no editor de texto");
    
  const conteudo = textoEditor.value;
  socket.emit("texto-modificado", conteudo);
}
);