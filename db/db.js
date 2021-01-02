const mongoose = require('mongoose');

//db configuration
const db = require('../config/keys').MongoURI
//connect to
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>console.log('Mongo DB connected'))
.catch(err=>  console.error(err)  )