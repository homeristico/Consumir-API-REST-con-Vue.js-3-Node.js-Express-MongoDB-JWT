const express = require('express');
const mongoose = require('mongoose');
//const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();


// cors
const cors = require('cors');
let corsOptions = {
    origin:'*', //Reemplazar con dominio
    optionsSuccesStatus: 200  // some legacy browsers
}

app.use(cors(corsOptions));

//capturar el body
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//capturar el body
// app.use(bodyparser.urlencoded({extended: false}));
// app.use(bodyparser.json());

//conexion a base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.twf2c.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
    mongoose.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => console.log('base de datos conectaad'))
    .catch(e => console.log('error db: ', e))


//middleware
// const verifyToken = require('./middlewares/validate-token');

//importar rutas
const authRoutes = require('./routes/auth');


//rutas
app.use('/api/user', authRoutes);

app.get('/', (req, res) => {
    res.json({
        estado:true,
        mensaje: 'funciona'
    });
});


// iniciar server

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor corriendo en: ${PORT}`)
});