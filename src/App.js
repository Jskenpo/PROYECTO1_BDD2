const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Enable CORS
app.use(cors({
    origin: '*',
    credentials: true
}));


//routes
app.use(require('./routes/index'));


//mongodb atlas connection 
mongoose.connect('mongodb+srv://val21328:joto76fiji@cluster0.ubmwx9v.mongodb.net/Proyecto1BDD2?retryWrites=true&w=majority')
    .then(() => console.log('DB is connected'))
    .catch(err => console.error(err));

app.listen(3161);
console.log('Server on port: ', 3161);