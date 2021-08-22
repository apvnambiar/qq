const mongoose = require('mongoose')

const DB = process.env.DATABASE;
//mongodb connecting with promise
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log('connection succes')
}).catch((err)=>console.log('no connection'))
