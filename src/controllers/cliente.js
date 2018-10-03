const md5 = require('md5');
class ClientesController {

  constructor(Cliente) {
    this.Cliente = Cliente;
  }
  //Método que faz a busca de clientes no banco de dados pelo id.
  findById(req, res) {
    return this.Filme.find({ _id: req.params.id })
        .then(filmes => res.send(filmes))
        .catch(err => res.send(err.message));
  }
  //Selecionando todos os usuários.
  get(req, res) {
    return this.Cliente.find({})
      .then(clientes => res.send(clientes))
      .catch(err => res.status(400).send(err.message));
  }
  //Selecionando usuário conforme o id passado.
  getById(req, res) {

    const { params: { id } } = req;

    return this.Cliente.find({ _id: id })
      .then(clientes => res.send(clientes))
      .catch(err => res.status(400).send(err.message));
  }
  //Método para inserção de usuários.
  create(req, res) {
    const newCliente = new this.Cliente(req.body);
    newCliente.senha = md5(newCliente.senha + global.SALT_KEY);
    newCliente.token = md5(newCliente.id + global.SALT_KEY);
    return newCliente.save()
      .then(() => res.status(201).json({ msg: 'Inserido com sucesso!' }))
      .catch(err => res.status(412).send(err.message));
  }
  //Método para fazer atualização dos dados do usuário.
  update(req, res) {
    const body = req.body;
    return this.Cliente.findById(req.params.id)
      .then(cliente => {
        cliente.nome = body.nome
        cliente.email = body.email
        cliente.filmesAlugados = body.filmesAlugados
        cliente.saldo = body.saldo
        cliente.desconto = body.desconto
        if (body.senha) {
          cliente.senha = md5(body.senha + global.SALT_KEY)
        }
        return cliente.save();
      })
      .then(() => res.sendStatus(200))
      .catch(err => res.status(422).send(err.message));
  }
  // Método para realizar a autentiação do usuário.
  authentication(req, res) {
    return this.Cliente.find({
      email: req.params.email,
      senha: (md5(req.params.senha + global.SALT_KEY))
    })
      .then(clientes => res.send(clientes))
      .catch(err => res.status(400).send(err.message));
  }
}
module.exports = ClientesController;
