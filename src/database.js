const mongoose = require('mongoose')

const MONGODB_URI = process.env.mongodb_uri;

mongoose.connect(MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser:true,
        

})
        .then(db => console.log('base de datos conectada'))
        .catch(err => console.log(err));