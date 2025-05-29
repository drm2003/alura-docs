import express from 'express';
import url from 'url';
import path from 'path';
import http from "http";
import { Server } from "socket.io";

const app = express();
const PORT = process.env.PORT || 3000;


const caminhoAtual = url.fileURLToPath(import.meta.url);

/* const diretorioPublico = path.join(caminhoAtual, '../..', 'public');*/
const diretorioPublico = path.join(path.dirname(caminhoAtual), '../public');
app.use(express.static(diretorioPublico));

const servidorHttp = http.createServer(app);

servidorHttp.listen(PORT, () => {
  console.log(`Server está rodando em http://localhost:${PORT}`);
});

const io = new Server(servidorHttp);

export default io;