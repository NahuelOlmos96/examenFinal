const {Schema, model} =require('mongoose')


const partidosSchema =new Schema({
        nombreCondidato: {
                type: String,
                require:true
        },
        partido: {
                type: Number,
                require:true
        },
        
})

module.export = model('partidos' , partidosSchema)