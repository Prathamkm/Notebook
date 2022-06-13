const mongoose= require('mongoose');

const mongoURI = "mongodb://localhost:27017"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("conected to mongoose sucessfully");
    })
}

module.exports = connectToMongo;