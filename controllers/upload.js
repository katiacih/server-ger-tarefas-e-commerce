function upload (req, res) {
  try {
    if(!req.files){
      res.status(400).send({ erro: 'Nenhum arquivo encontrado.'})
    }else {
      const aguardar = new Date(new Date().getTime() + 3000) //aguarda 3 segundos
      while (aguardar > new Date()){}
      const imagem = req.files.imagem
      imagem.mv('../public/uploads/' + imagem.name)
      res.json({ path: `http://localhost:3001/uploads/${imagem.name}`})
    }
  }catch( err ){
    res.status(500).send({ erro: 'Erro ao processar requisicao.'})
  }

}
module.exports = {upload}
