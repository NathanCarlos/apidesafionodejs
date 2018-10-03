/*
Regras: 
- filmes em lançamento (até 6 meses) - R$ 14,99 (Regra 1)
- filmes até 18 meses do lançamento - R$ 7,99 (Regra 2)
- filmes de 1,5 a 4 anos o lançamento - R$ 3,99 (Regra 3)
- filmes acima de 4 anos lançados - R$ 1,99 (Regra 4)
*/
class FilmesController {
    //Construtor para ser obrigado a passar um objeto filme.
    constructor(Filme) {
        this.Filme = Filme;
    }
    //Método para inserir novos filmes.
    create(req, res) {
        //Váriável criada para receber os parâmetros enviados pelo método post das rotas filmes.
        const newFilme = new this.Filme(req.body);
        return newFilme.save()
            .then(() => res.status(201).json({ msg: "Inserido com sucesso!" }))
            .catch(err => res.status(412).send(err.message));
    }
    //Método que faz a busca de filmes no banco de dados pelo id.
    searchById(req, res) {
        return this.Filme.find({ _id: req.params.id })
            .then(filmes => res.send(filmes))
            .catch(err => res.send(err.message));
    }
    //Método para realizar a busca de todos os filmes.
    searchAll(req, res) {
        return this.Filme.find({})
            .then(filmes => res.send(filmes))
            .catch(err => res.send(err.message));
    }
    //Método para realizar a busca de filmes que estão em lançamento. (Até 6 meses da data de lançamento)
    searchNews(req, res) {
        return this.Filme.find({ dataLancamento: { $gte: `${this.returnDataLancamentos()}` } })
            .then(filmes => { res.send(filmes) })
            .catch(err => res.send(stringPesquisa))
    }
    /*
    //Método que realiza a pesquisa no banco de dados procurando os filmes que estão até 18 meses depois de passar os 6 meses do lançamento.
    //Método comentado pois só foi utilizado para fins de teste.
    searchDezoitoMeses(req,res){
        return this.Filme.find({ dataLancamento: {$gte: `${this.returnDezoitoMeses()}`, $lte: `${this.returnDataLancamentos()}`}})
        .then(filmes => {
            res.send(filmes)
        })
        .catch(err => res.send(err.message))
                // db.getCollection('filmes').find({ dataLancamento:{$gt: ISODate('2018-05-06'), $lt: ISODate('2018-06-07')}});
    }
    */

    /*
    //Método que realiza a pesquisa no banco de dados procurando os filmes que estão de 18 meses até 4 anos do lançamento no banco de dados.
    //Método comentado pois só é utilizado para fins de teste.
    searchQuatroAnos(req,res){
        return this.Filme.find({ dataLancamento: {$gte: `${this.returnQuatroAnos()}`, $lt: `${this.returnDezoitoMeses()}`}})
        .then(filmes => {
            res.send(filmes)
        })
        .catch(err => res.send(err.message))
    }*/

    /* Método comentado pois só é utilizado para fins de teste.
    //Método que realiza a pesquisa no banco de dados procurando os filmes que estão a mais de 4 anos no banco.
    searchMaisQuatroAnos(req,res){
        return this.Filme.find({ dataLancamento: {$lt: `${this.returnQuatroAnos()}`} })
        .then(filmes => {
            res.send(filmes)
        })
        .catch(err => res.send(err.message))
    }
    */

    //Método responsável por retornar a data dos filmes em lançamento. por exemplo ele verifica a data atual e tira 6 meses dessa data.
    //Regra 1.
    returnDataLancamentos() {
        //Jogando dados da data atual em uma variável.
        let dataAtual = new Date();
        //Jogando o mês atual menos 6 na variável CalculoMesLancamento.
        const CalculoMesLancamento = dataAtual.setMonth((dataAtual.getMonth() - 6));
        //Utilizando comando do mongodb e enviando a string de pesquisa para obter resposta.
        return CalculoMesLancamento;
    }
    //Método responsável por retornar a data de pesquisa de filmes que são maiores que a data de lançamento em 18 meses.
    //Regra 2.
    returnDezoitoMeses() {
        //Colocando a data atual na variável dataAtual.
        let dataAtual = new Date();
        //Colocando na variável filmesDepoisLancamento a dataAtual - 18 meses.
        const filmesDepoisLancamento = dataAtual.setMonth((dataAtual.getMonth() - 18));
        let stringPesquisa = filmesDepoisLancamento;
        return stringPesquisa;
    }
    //Método responsável por retornar a data de pesquisa de filmes que são maiores que a data de 18 meses e menor que 4 anos.
    //Regra 3 e 4.
    returnQuatroAnos() {
        let dataAtual = new Date();
        //Colocano na variável a data atual - 48 meses.
        const filmesDepoisDezoitoMeses = dataAtual.setMonth((dataAtual.getMonth() - 48));
        let stringPesquisa = filmesDepoisDezoitoMeses;
        return stringPesquisa;
    }
    //Método reponsável por fazer update na Regra 1.
    updateLancamentos() {
        this.Filme.updateMany({ dataLancamento: { $gt: `${this.returnDataLancamentos()}` } }, { $set: { "valorLocacao": 14.99 } })
            .then(() => console.log('Preços Conforme Regra 1 Atualizados!'))
            .catch(err => console.log(err.message));
    }
    //Método que faz atualização do preço dos produtos conforme regra 1.
    updateRegra2() {
        this.Filme.updateMany({ dataLancamento: { $gte: `${this.returnDezoitoMeses()}`, $lte: `${this.returnDataLancamentos()}` } }, { $set: { "valorLocacao": 7.99 } })
            .then(() => console.log('Preços Conforme Regra 2 Atualizados!'))
            .catch(err => console.log(err.message));
    }
    //Método que faz atualização do preço dos produtos conforme regra 3.
    updateRegra3() {
        this.Filme.updateMany({ dataLancamento: { $gte: `${this.returnQuatroAnos()}`, $lt: `${this.returnDezoitoMeses()}` } }, { $set: { "valorLocacao": 3.99 } })
            .then(() => console.log('Preços Conforme Regra 3 Atualiados!'))
            .catch(err => console.log(err.message));
    }
    //Método que faz atualização do preço dos produtos conforme regra 4.
    updateRegra4() {
        this.Filme.updateMany({ dataLancamento: { $lt: `${this.returnQuatroAnos()}` } }, { $set: { "valorLocacao": 1.99 } })
            .then(() => console.log('Preços Conforme Regra 4 Atualizados!'))
            .catch(err => console.log(err.message));
    }
    //Método que faz atualização dos campos dos filmes conforme o corpo recebido.
    update(req, res) {
        const body = req.body;
        return this.Filme.searchById(req.params.id)
            .then(filme => {
                filme.tipo = body.tipo
                filme.nome = body.nome
                filme.sinopse = body.sinopse
                filme.genero = body.genero
                filme.atores = body.atores
                filme.dataLancamento = body.dataLancamento
                filme.quantidade = body.quantidade
                filme.imagem = body.imagem
                filme.tempoMinimoLocacao = body.tempoMinimoLocacao
                filme.tempoMaximoLocacao = body.tempoMaximoLocacao
                filme.valorLocacao = body.valorLocacao
                return filme.save()
            })
            .then(() => res.sendStatus(200))
            .catch(err => res.status(422).send(err.message))
    }
}
module.exports = FilmesController;