const express = require('express');
const filmesRoute = require("./filmes");
const usersRoute = require("./users");
const router = express.Router();


//minha frase ${meu_parametro} minha frase continua'

router.use('/filmes', filmesRoute);
router.use('/users', usersRoute);
router.get('/',(req,res) => res.send({}));



module.exports = router;


