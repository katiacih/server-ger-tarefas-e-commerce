const uuid = require('uuid')

let tarefas = [
 { id: '1', nome: 'Aprender React', concluida: true },
 { id: '2', nome: 'Finalizar curso' , concluida: false },
 { id: '3', nome: 'Criar guia flexbox', concluida: false},
 { id: '4', nome: 'terminar livro', concluida: false },
 { id: '5', nome: 'postagens da semana', concluida: false},
 { id: '6', nome: 'leitura', concluida: false }
]


// Listar by Id
function listarTarefaid (req, res) {
 const id = req.params.id;
 const tarefa = tarefas.filter(tarefa => tarefa.id === id)
 if(tarefa.length === 0) {
  res.status(404).json({ erro: 'Tarefa não encontrada'})
 }
 res.json(tarefa[0]);
}

//function auxiliar
function validateParams (req) {
 (!req.body['nome'] && !req.body['concluida']) ? false : true
}

// Listar 
function listarTarefas (req, res) {
 //capturando os parametros
 const pagina = req.query['pag'] || 1
 const ordem = req.query['ordem'] //ASC, DESC
 const filtroTarefa = req.query['filtro-tarefa']
 const itensPorPagina = req.query['itens-por-pagina'] || 3
 let tarefasRetornar = tarefas.slice(0);
 //filtros
 if(tarefasRetornar && filtroTarefa !== '') {
  tarefasRetornar = tarefasRetornar.filter(
   t => t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0
  )
 }

 //ordenar dados
 if(ordem === 'ASC'){
  tarefasRetornar.sort((t1,t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase() ? 1 : -1))
 }else if(ordem === 'DESC'){
  tarefasRetornar.sort((t1,t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase() ? 1 : -1))
 }
 
 //retornando dados
 res.json({
  totalItems:  tarefasRetornar.length,
  tarefas: tarefasRetornar.slice(0).splice((pagina - 1) * itensPorPagina, itensPorPagina),
  pagina: pagina
 })
}

// CADASTRAR
function cadastrarTarefa(req, res) {
 if(validateParams(req)){
  res.status(400).json({ erro: 'Requisicao inválida' });
 }


 const tarefa = {
  id: uuid.v4(),
  nome: req.body['nome'],
  concluida: req.body['concluida']
 }
 tarefas.push(tarefa)
 res.json(tarefa)

}

// ATUALIZAR
function atualizarTarefa(req, res) {

 if(validateParams(req)){
  res.status(400).json({ erro: 'Requisicao inválida' });
 }

 const id = req.params.id;
 tarefas = tarefas.map(tarefa => {
  if(tarefa.id === id){
   tarefa.nome = req.body['nome'];
   tarefa.concluida = req.body['concluida'];
   tarefaAtualizada = true;
  }
  return tarefa;
 })
 if(!tarefaAtualizada) {
  res.status(404).json({ erro: 'Tarefa não encontrado.'})
 }

 res.json({
  id: id,
  nome: req.body['nome'],
  concluida: req.body['concluida']
 })

}


// DELETAR
function removerTarefa(req, res) {
 
 const id = req.params.id;
 const numTarefas = tarefas.length;
 tarefas = tarefas.filter(tarefa => tarefa.id !== id)
 
 if(numTarefas === tarefas.length) {
  res.status(404).json({ erro: 'Tarefa não encontrada' });
 }

 res.json({msg: 'tarefa removida com sucesso.'})

}


// CONCLUIR TAREFA
function concluirTarefa(req, res) {
 
 const id = req.params.id;
 let tarefaConcluida = false;
 tarefas = tarefas.map(tarefa => {
  if(tarefa.id === id){
   tarefa.concluida = true;
   tarefaConcluida = true;
  }
  return tarefa;
 })
 if(!tarefaConcluida) {
  res.status(404).json({ erro: 'Tarefa não encontrado.'})
 }

 res.json({msg: 'tarefa concluida com sucesso.'})

}



module.exports = {
 listarTarefaid,
 listarTarefas,
 cadastrarTarefa,
 atualizarTarefa,
 removerTarefa,
 concluirTarefa
}