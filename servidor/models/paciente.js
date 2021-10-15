import  mongoose  from "mongoose";
const Schema=mongoose.Schema;

//se crea el esquema (tabla)

const pacienteShema=new Schema({
    identificacion:{type:String},
    nombre:{type:String, required:[true,'Nombre obligatorio']},
    edad:{type:String},
    peso:{type:String},
    estatura:{type:String},
    tensionarterial:{type:String},
    sistolica:{type:String},
    diastolica:{type:String}
  


});

//convertir a modelo
const Paciente=mongoose.model('Paciente',pacienteShema);
export default Paciente;