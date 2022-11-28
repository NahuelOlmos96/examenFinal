
const {Schema, model} =require('mongoose')



const votantesSchema =new Schema({
        nombre: {
                type: String,
                require:true
        },
        dni: {
                type: Number,
                require:true
        },
        sexo: {
                type: String,
                require:true
        },
        voto: {
                type:String,
                default:false
        }
       
})

module.exports = model('votantes' , votantesSchema)