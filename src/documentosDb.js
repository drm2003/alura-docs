import { getDocumentosColecao } from "./dbConnect.js";

function adicionarDocumento(nome) {
  const documentosColecao = getDocumentosColecao();

  const resultado = documentosColecao.insertOne(
    {
      nome: nome,
      texto: ""
    }
  );
  return resultado;
}

function obterDocumentos() {
  const documentosColecao = getDocumentosColecao();
  
  // Obtém todos os documentos da coleção
  const documentos = documentosColecao.find().toArray();
  
  if (!documentos || documentos.length === 0) {
    console.error("Nenhum documento encontrado.");
    return [];
  }

  return documentos;
}

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

function excluirDocumento(nome) {
  const documentosColecao = getDocumentosColecao();
  
  // Exclui o documento do banco de dados
  const resultado = documentosColecao.deleteOne({ nome: nome });

  if (resultado.deletedCount === 0) {
    console.error(`Erro ao excluir o documento "${nome}".`);
    return null;
  }

  return resultado;
}

export { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento };