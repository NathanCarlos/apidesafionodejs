const express = require('express');
const filmesRoute = require("./filmes");
const clientesRoute = require("./cliente");
const router = express.Router();


//minha frase ${meu_parametro} minha frase continua'

router.use('/filmes', filmesRoute);
router.use('/clientes', clientesRoute);
router.get('/',(req,res) => res.send({}));



module.exports = router;


