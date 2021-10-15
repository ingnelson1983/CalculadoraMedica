<template>
<div class="container">

    <h1>Pacientes</h1>

    <b-alert 
    :show="dismissCountDown" 
    dismissible 
    :variant="mensaje.color" 
    @dismissed="dismissCountDown=0" 
    @dismiss-count-down="countDownChanged" > 
    {{mensaje.texto}} 
    </b-alert>


    <form @submit.prevent="editarPaciente(pacienteEditar)" v-if="editar">
        <h3>Editar Paciente</h3>
        <input type="text" class="form-control my-2" placeholder="Identificacion" v-model="pacienteEditar.identificacion">
        <input type="text" class="form-control my-2" placeholder="Nombre" v-model="pacienteEditar.nombre">
        <input type="text" class="form-control my-2" placeholder="Edad" v-model="pacienteEditar.edad">
        <input type="text" class="form-control my-2" placeholder="Peso" v-model="pacienteEditar.peso">
        <input type="text" class="form-control my-2" placeholder="Estatura" v-model="pacienteEditar.estatura">
        <input type="text" class="form-control my-2" placeholder="Tension Arterial" v-model="pacienteEditar.tensionarterial">
        <input type="text" class="form-control my-2" placeholder="Sistolica" v-model="pacienteEditar.sistolica">
        <input type="text" class="form-control my-2" placeholder="Diastolica" v-model="pacienteEditar.diastolica">

      
        <b-button class="btn-success my-2 mx-2" type="submit">Editar</b-button>
        <b-button class=" my-2" type="submit" @click="editar=false">Cancelar</b-button>

    </form>
    <form @submit.prevent="agregarPaciente()" v-if="!editar">
        <h3>Agregar un nuevo paciente</h3>


        <input type="text" class="form-control my-2" placeholder="Identificacion" v-model="paciente.identificacion">
        <input type="text" class="form-control my-2" placeholder="Nombre" v-model="paciente.nombre">
        <input type="text" class="form-control my-2" placeholder="Edad" v-model="paciente.edad">
        <input type="text" class="form-control my-2" placeholder="Peso" v-model="paciente.peso">
        <input type="text" class="form-control my-2" placeholder="Estatura" v-model="paciente.estatura">
        <input type="text" class="form-control my-2" placeholder="Tension Arterial" v-model="paciente.tensionarterial">
        <input type="text" class="form-control my-2" placeholder="Sistolica" v-model="paciente.sistolica">
        <input type="text" class="form-control my-2" placeholder="Diastolica" v-model="paciente.diastolica">



        <b-button class="btn-success my-2" type="submit">Agregar</b-button>

    </form>

    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Identificacion</th>
                <th scope="col">Paciente</th>
                <th scope="col">Edad</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in pacientes" :key="index">
                <th scope="row">{{item._id}}</th>
                <td>{{item.identificacion}}</td>
                <td>{{item.nombre}}</td>
                <td>{{item.edad}}</td>
                <td>
                    <b-button class="btn-danger mx-2" @click="eliminarPaciente(item._id)">Eliminar</b-button>
                    <b-button class="btn-warning mx-2" @click="activarEdicion(item._id)">Editar</b-button>
                </td>
            </tr>

        </tbody>
    </table>

</div>
</template>

<script>
export default {

    data() {
        return {

            pacientes: [],
            mensaje: {color: 'success', texto: ''}, 
            dismissSecs: 5, 
            dismissCountDown: 0,

            paciente:{identificacion:"",nombre:"",edad:"",peso:"",estatura:"",tensionarterial:"",sistolica:"",diastolica:""},
            editar:false,
            pacienteEditar:{}



        }

    },

    created() {

        this.listarPacientes();

    },

    methods: {

        listarPacientes() {

            this.axios.get('/paciente')
                .then(res => {
                    console.log(res.data);
                    this.pacientes = res.data;

                })
                .catch(e => {

                    console.log(e.response);

                })

        },

        agregarPaciente(){


            this.axios.post('/nuevo-paciente',this.paciente)
            .then(res=>{

                this.pacientes.push(res.data)
                this.paciente.identificacion="";
                this.paciente.nombre="";
                this.paciente.edad="";
                this.paciente.peso="";
                this.paciente.estatura="";
                this.paciente.tensionarterial="";
                this.paciente.sistolica="";
                this.paciente.diastolica="";
                this.mensaje.color="success";
                this.mensaje.texto="Paciente Agregado";
                this.showAlert();

            })
            .catch(e=>{

                console.log(e.response);

            })


        },

        eliminarPaciente(id){

            this.axios.delete(`/paciente/${id}`)
            .then(res=>{

                const index = this.pacientes.findIndex(item=> item._id===res.data._id);
                this.pacientes.splice(index, 1);
                this.mensaje.color="success";
                this.mensaje.texto="Paciente Eliminado";
                this.showAlert();


            })
            .catch(e=>{

                  console.log(e.response);

            })
        },

        activarEdicion(id){

            this.editar=true;
            this.axios.get(`/paciente/${id}`)
            .then(res=>{

                this.pacienteEditar=res.data;

            })
            .catch(e=>{

                 console.log(e.response);


            })


        },

        editarPaciente(item){
            
            this.axios.put(`/paciente/${item._id}`, item)
            .then(res=>{
                const index= this.pacientes.findIndex(n=> n._id===res.data._id);
                this.pacientes[index].identificacion=res.data.identificacion;
                this.pacientes[index].nombre=res.data.nombre;
                this.pacientes[index].edad=res.data.edad;
                this.pacientes[index].peso=res.data.peso;
                this.pacientes[index].estatura=res.data.estatura;
                this.pacientes[index].tensionarterial=res.data.tensionarterial;
                this.pacientes[index].sistolica=res.data.sistolica;
                this.pacientes[index].diastolica=res.data.diastolica;
 
                this.mensaje.color="success";
                this.mensaje.texto="Paciente Editada";
                this.showAlert();
                this.editar=false;


            })
            .catch(e=>{

                console.log(e.response);

            })



        },
        countDownChanged(dismissCountDown) { 
            this.dismissCountDown = dismissCountDown 
        }, 
        showAlert() { 
            this.dismissCountDown = this.dismissSecs 
        }

    }

}
</script>
