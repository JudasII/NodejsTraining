var express = require ('express')

var app = express()

app.use(express.static(__dirname))

var messages = [
    {
        name:'David',
        message:'hi'
    },
    {
        name:'Juan',
        message:'hello'
    }
]
app.get('/messages', (req,res)=>{
    res.send(messages)
})
var server = app.listen(3000, ()=>
    console.log('server is listening to port ', server.address().port)
)