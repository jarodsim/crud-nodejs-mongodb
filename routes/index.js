var express = require('express');
var router = express.Router();

/* GET pagina index (das tabelas). */
router.get('/', function (req, res, next) {
  //pra executar a função que varre o banco de dados e retorna os dados na array "docs"
  global.db.findAll((e, docs) => {
    if (e) {
      return console.log(e)
    }
    res.render('index', { docs });
  })

});


/*GET pagina de cadastro de novo produto*/
router.get('/cadastro', function (req, res, next) {
  res.render('cadastro', { action: "/cadastro" });
});




/*POST da pagina de cadastro*/
router.post('/cadastro', function (req, res, next) {
  const nome = req.body.nome;
  const quantidade = parseInt(req.body.quantidade);
  const descricao = req.body.descricao;

  //add ao banco
  global.db.insert({ nome, quantidade, descricao }, (err, result) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/?cadastro=true');
  })

})

/*GEt edit pag */
router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id
  global.db.findOne(id, (e, doc) => {
    if (e) { return console.log(e) }
    console.log(doc.nome)
    res.render('edit', { title: 'Edição de Cliente', doc: doc, action: '/edit/' + doc._id })
  })
})

/*POST para página de edição de produto*/
router.post('/edit/:id', function (req, res) {
  const id = req.params.id
  const nome = req.body.nome;
  const quantidade = parseInt(req.body.quantidade);
  const descricao = req.body.descricao;

  global.db.update(id, { nome, quantidade, descricao }, (e, result) => {
    if (e) { return console.log(e) }
    res.redirect('/?edit=true')
  })
})




/*GET para deletar*/
router.get('/excluir/:id', function (req, res, next) {
  let id = req.params.id

  global.db.deleteOne(id, (e, r) => {
    if (e) { return console.log(e) }
    res.redirect('/?excluir=true');
  })

})
module.exports = router;
