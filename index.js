const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')

//import functions
const { 
 listarTarefaid, 
 listarTarefas,
 atualizarTarefa,
 removerTarefa,
 concluirTarefa,
 cadastrarTarefa } = require('./controllers/gerenciador-tarefas.js');

const { finalizarCompra, obterCidadesPorEstado } = require('./controllers/mini-ecommerce.js')

const { upload } = require('./controllers/upload.js')

const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(fileUpload({ createParentPath: true }))

// Tarefas

//get
app.get('/gerenciador-tarefas', listarTarefas)
app.get('/gerenciador-tarefas/:id', listarTarefaid )
//post 
app.post('/gerenciador-tarefas', cadastrarTarefa)
//put
app.put('/gerenciador-tarefas/:id/', atualizarTarefa )
app.put('/gerenciador-tarefas/:id/concluir', concluirTarefa)
//delete
app.delete('/gerenciador-tarefas/:id', removerTarefa)


// mini-ecommerce
app.post('/mini-ecomerce/checkout/finalizar-compra', finalizarCompra)
app.get('/mini-ecomerce/estado/:siglaEstado/cidades', obterCidadesPorEstado)

//upload
app.post('/upload', upload)


app.listen(port, () => console.log(`Servidor inicializado na porta ${port}`))