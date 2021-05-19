
const PORT = 3000

var express = require('express')
var app = express()
var mysql = require('mysql')
var myConnection = require('express-myConnection')
var bodyParser = require('body-parser')

var config = require('./db')
var dbOptions = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.db
}

var routes = require('./routes/index')
var publicDir = ('./public/')

app.use(express.static(publicDir))
app.use(myConnection(mysql, dbOptions, 'pool'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/", routes)

app.listen(PORT, () => {
    console.log('Running on Port: ' + PORT)
})