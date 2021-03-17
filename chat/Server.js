var express = require ('express')
var bodyParser = require('body-parser')
var app = express()
var http = require ('http').Server(app)
var io= require ('socket.io')(http)
var mongoose = require ('mongoose')

// for the porpuse of learning this credentials will remain here, however in real production enviroments they will be in a save place.
var conString = 'mongodb+srv://dbuser:1234@chatdb.cz7lb.mongodb.net/chatdb?retryWrites=true&w=majority'

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

var Message = mongoose.model('Message',{
    name: String,
    message: String
})

app.get('/messages', (req,res)=>{
    Message.find({},(err,messages)=>
        res.send(messages)
    )
})

app.get('/messages/:user', (req,res)=>{
    var user = req.params.user
    Message.find({name: user},(err,messages)=>
        res.send(messages)
    )
})
app.post('/messages', (req,res)=>{
    var message = new Message(req.body)
    message.save()
    .then(()=>
        Message.findOne({message:'courses'})
    )
    .then(censored =>{
        if (censored)
            return Message.deleteOne({_id: censored.id})
        io.emit('message',req.body)
        res.sendStatus(200)
    })
    .catch(() =>
        sendStatus(500)
    )
})

mongoose.connect(conString, {useNewUrlParser:true, useUnifiedTopology:true }, err => console.log('mongodb connection: ', err))

var server = http.listen(3000, ()=>
    console.log('server is listening to port ', server.address().port)
)