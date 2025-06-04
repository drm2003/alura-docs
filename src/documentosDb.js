import { getDocumentosColecao } from "./dbConnect.js";

function encontrarDocumento(nome) {
  const documento = getDocumentosColecao().findOne({ nome: nome });
  if (!documento) {
    console.error(`Documento com nome "${nome}" não encontrado.`);
    return null;
  }

  return documento;
}


function atualizaDocumento(nomeDocumento, texto) {
  const documentosColecao = getDocumentosColecao();
  
  // Atualiza o documento no banco de dados
  const atualizacao = documentosColecao.updateOne(
    { nome: nomeDocumento },
    { $set: { texto: texto } }
  );

  if (atualizacao.modifiedCount === 0) {
    console.error(`Erro ao atualizar o documento "${nomeDocumento}".`);
    return null;
  }

  // Retorna o documento atualizado
  return atualizacao;
}

export { encontrarDocumento, atualizaDocumento };