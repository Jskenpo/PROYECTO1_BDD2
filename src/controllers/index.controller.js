const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb+srv://val21328:joto76fiji@cluster0.ubmwx9v.mongodb.net/?retryWrites=true&w=majority')
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

