const express = require('express');
//Importando filmescontroller.
const FilmesController = require('../controllers/filmes');
//Importando filmes.
const Filme = require('../models/filmes');
//Módulo do node para poder criar uma rotina.
const cron = require('node-cron');

const router = express.Router();
const filmesController = new FilmesController(Filme);

router.post('/create/', (req,res) => filmesController.create(req,res));
router.get('/searchAll/', (req,res) => filmesController.searchAll(req,res));
router.get('/searchNews/', (req,res) => filmesController.searchNews(req,res));
router.get('search/id:',(req,res) => filmesController.searchById(req,res))
// router.get('/searchDezoitoMeses/', (req,res) => filmesController.searchDezoitoMeses(req,res));
// router.get('/searchQuatroAnos', (req,res) => filmesController.searchQuatroAnos(req,res));
// router.get('/searchMaisQuatroAnos', (req,res) => filmesController.searchMaisQuatroAnos(req,res));
router.put('/update/:id', (req,res) => filmesController.update(req,res));

/*Rotina que executa os métodos de update em filmes no banco de dados todos os dias ás 00:00:01.
O primeiro parâmetro são os segundos, no caso 1, o segundo parâmetro são os minutos no caso 0.
O Terceiro parâmetro são as horas, no caso meia noite(0).
Se quiser conhecer um pouco mais sobre o node-cron é só abrir o link abaixo:
https://www.npmjs.com/package/node-cron
*/
cron.schedule('1 0 0 * * *', () =>{
    filmesController.updateLancamentos();
    filmesController.updateRegra2();
    filmesController.updateRegra3();
    filmesController.updateRegra4();
}).start();

module.exports = router;