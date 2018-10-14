const express = require('express');
const UsersController = require('../controllers/user');
const User = require('../models/user');

const router = express.Router();
const usersController = new UsersController(User);

router.get('/findAll', async(req,res) => usersController.get(req,res));
router.post('/create/', (req, res) => usersController.create(req,res));
router.put('/update/:id', (req, res) => usersController.update(req,res));
router.get('/authentication/:email/:senha', (req,res) => usersController.authentication(req,res));
module.exports = router;
