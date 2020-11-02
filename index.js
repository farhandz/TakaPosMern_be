const express = require('express')
const app = express()
const appRoutes = require('./routes/appRoutes')
const mongoose = require('mongoose')

// database conection
mongoose.connect("mongodb://127.0.0.1:27017/db_me", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});


const db = mongoose.connection
db.on('error', (err) => {
    console.log(err)
})
db.once('open', ()=> console.log('databse connection succesfuly'))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/v1', appRoutes)
app.use((req,res) => {
    res.status(404).json({
        status: 404,
        message: "routes not found"
    })
})

app.listen(5000, ()=> console.log('server listen on port 5000'))