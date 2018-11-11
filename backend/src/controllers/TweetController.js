//Aqui é feito ações de CRUD, mas nossa aplicação só irá utilizar listagem e criação
const Tweet = require('../models/Tweet')


module.exports = {
    async index(req, res){
        // '-' na frente do sort, ordena por ordem de criação ao contrário
        const tweets = await Tweet.find({ }).sort('-createdAt')

        //Voltando em uma estrutura de dados reconhecida pelo react (json)
        return res.json(tweets)
    },
    async store(req, res){
        const tweet = await Tweet.create(req.body)
        //todo mundo q tiver conectado na nossa aplicação vai ser receber um evento(tweet), a gente pode consumir esses dados e assim atualizar a app
        req.io.emit("tweet", tweet)

        return res.json(tweet)
    }
}