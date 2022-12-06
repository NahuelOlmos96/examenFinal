const {Schema, model} =require('mongoose')



const votantesSchema = new Schema({
        _id:{
                type:Number,
                require:true
        } ,
        nombrePartido: {
                type: String,
                require:true
        },
        nombreCandidato: {
                type: String,
                require:true
        },
        img: {
                type: String,
                require:true
        },
        numvotos: {
                type: Number,
                require:true
        },
        porcentajevotos:{
                type: Number,
                require:true
        }

})



module.exports = model('candidatos' , votantesSchema)