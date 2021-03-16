var express = require ('express')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

var messages = [
    {
        name:'David',
        message:'hi'
    },
    {
        name:'Juan',
        message:'hello'
    }]

app.get('/messages', (req,res)=>{
    res.send(messages)
})

app.post('/messages', (req,res)=>{
    messages.push(req.body)
    res.sendStatus(200)
})
var server = app.listen(3000, ()=>
    console.log('server is listening to port ', server.address().port)
)