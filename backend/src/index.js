const express = require('express')
const mongoose = require('mongoose')
//Basicamente dá autorização para acessar o backend da nossa app através do html externo ou react
const cors = require('cors')
//Obs: nodemon -D não precisa reiniciar o servidor toda vez que for feita uma alteração
//só configurar o start no packge.json e dar um yarn start
const app = express()

//trabalhando com tempo real
const server = require('http').Server(app)
//habilita q nosso server ouça o protocolo ws além do http
const io = require('socket.io')(server)

//conectando à minha database- não relacional (mlab.com)
mongoose.connect('mongodb://goweek:goweek123@ds061238.mlab.com:61238/goweek-backend', {
    useNewUrlParser: true
})
// Criando sintaxe de middle (interceptador)
app.use((req, res, next)=>{
    //criando uma nova variável dentro do req, que será acessível em todos os locais que a gente usa o req
    req.io = io
    return next()
})
app.use(cors())
//Basicamente ta dizendo para o express que eu irei utilizar json para todas as requisições
app.use(express.json())
app.use(require('./routes'))

//mudei para server ou invés do app para acessar protocolo tanto ws como http
server.listen(3000, () =>{
    console.log('Server started on port 3000..')
})