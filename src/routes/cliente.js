const express = require('express');
const ClientesController = require('../controllers/cliente');
const Cliente = require('../models/cliente');

const router = express.Router();
const clientesController = new ClientesController(Cliente);

router.post('/create/', (req, res) => clientesController.create(req,res));
router.put('/update/:id', (req, res) => clientesController.update(req,res));
router.get('/authentication/:email/:senha', (req,res) => clientesController.authentication(req,res));
module.exports = router;