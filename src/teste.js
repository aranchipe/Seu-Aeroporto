import connect from './libs/mongodb';

async function adicionarPropriedade() {
  const { db } = await connect();

  try {
    const collection = db.collection('entidade');

    const resultado = await collection.updateMany(
      {}, // Filtro vazio para selecionar todos os documentos
      {
        $set: { path: 'restaurants' }, // Define o valor da nova propriedade
      },
    );

    console.log(`${resultado.modifiedCount} documentos foram atualizados.`);
  } catch (error) {
    console.error('Erro ao atualizar os documentos:', error);
  }
}

adicionarPropriedade();
