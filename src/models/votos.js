const {Schema, model} =require('mongoose')



const vostosSchema = new Schema({
        _id:{
                type:Number,
                require:true
        } ,
        votosTotal: {
                type: Number,
                require:true
        },
        porcentajevotos: {
                type: Number,
                require:true
        },
        
})

 

module.exports = model('votos' , vostosSchema)