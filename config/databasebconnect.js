const mongoose = require('mongoose');

      const databaseconnection = () =>{
        try{
            mongoose.connect(process.env.DATABASE);
            console.log('database connected')
        }catch (error) {
            console.log('database connection error')
        }
        };
    
    
    module.exports=databaseconnection;
