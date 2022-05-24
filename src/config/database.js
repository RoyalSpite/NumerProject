const moongoose = require('mongoose')

const { MONGO_URI } = process.env

exports.connect = () =>{

    moongoose.connect(MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() =>{
        console.log("connected")
    })
    .catch((error) =>{
        console.log('error')
        console.error(error)
        process.exit(1)
    })

}