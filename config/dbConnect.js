const mongoose = require('mongoose');
require('dotenv').config();

function dbConnect(){
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("DATABASE connection successful");
    }).catch(()=>{
        console.log("ERROR in Database connection");
    })
}

module.exports=dbConnect;