const md5 = require('md5');
class UsersController {

  constructor(User) {
    this.User = User;
  }
  //Método que faz a busca de usuários no banco de dados pelo id.
  findById(req, res) {
    return this.User.find({ _id: req.params.id })
        .then(filmes => res.send(filmes))
        .catch(err => res.send(err.message));
  }
  //Selecionando todos os usuários.
  async get(req, res) {
    try
    {
      let resultado = await this.User.find({});
      return res.status(200).send(resultado);
    }
    catch(e)
    {
      res.status(400).send(e.message);
    }
  }
  //Método para inserção de usuários.
  create(req, res) {
    const newUser = new this.User(req.body);
    newUser.senha = md5(newUser.senha + global.SALT_KEY);
    newUser.token = md5(newUser.id + global.SALT_KEY);
    return newUser.save()
      .then(() => res.status(201).json({ msg: 'Inserido com sucesso!' }))
      .catch(err => res.status(412).send(err.message));
  }
  //Método para fazer atualização dos dados do usuário.
  update(req, res) {
    const body = req.body;
    return this.User.findById(req.params.id)
      .then(user => {
        user.nome = body.nome
        user.email = body.email
        user.filmesAlugados = body.filmesAlugados
        user.saldo = body.saldo
        user.desconto = body.desconto
        if (body.senha) {
          user.senha = md5(body.senha + global.SALT_KEY)
        }
        return user.save();
      })
      .then(() => res.sendStatus(200))
      .catch(err => res.status(422).send(err.message));
  }
  // Método para realizar a autentiação do usuário.
  authentication(req, res) {
    return this.User.find({
      email: req.params.email,
      senha: (md5(req.params.senha + global.SALT_KEY))
    })
      .then(users => res.send(users))
      .catch(err => res.status(400).send(err.message));
  }
}
module.exports = UsersController;
