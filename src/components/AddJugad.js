import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter, Link,Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import  JugadoresService  from '../service/JugadoresService';
import Jugadores from '../components/Jugadores';
import ReactDOM from 'react-dom'
import history from './history';
import './Jugadores.css';

export default class AddJugad extends Component {

  //fotos
  photoSelected;
  file;
  //finfotos
  
    constructor(props){
        super(props)

        this.state={
            jugadores: {
                id:'',
                nombre:'',
                equipo:'',
                nacionalidad: '',
                posicion:'',
                imagen:''
            }

        }
        this.handleInput = this.handleInput.bind(this)
        this.guardarJugador = this.guardarJugador.bind(this)
        this.onPhotoSelected = this.onPhotoSelected.bind(this)
        this.photoSelected = this.state.jugadores.imagen
    }

    handleInput(e){

        
         console.log("value"+e.target.value)
        console.log("name", e.target.name);
        //para escribir datos en el estado
        const { value, name } = e.target;

        this.setState({
            jugadores: {
                ...this.state.jugadores,
                [name]:value
            }
        })
        console.log(JSON.stringify(this.state))
    }


    async componentDidMount() {
        console.log("hola añadir jugador")
        const id = this.props.id;
        console.log("el id que llega es:"+ id)
        const aid = localStorage.getItem("id")
        console.log("aid es:"+aid)

    }

    onPhotoSelected(event) {
        console.log("evento es:"+event)
        if (event.target.files && event.target.files[0]) {
            console.log("onphotoselected")
          this.file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = e => this.photoSelected = reader.result;
          console.log("foto es222: "+JSON.stringify(this.file))
          reader.readAsDataURL(this.file);
        }
    }


    guardarJugador(e) {
        e.preventDefault();

        console.log("en guardar js")
        let jugadoresService = new JugadoresService();

        const fd = new FormData();
        fd.append('nombre',this.state.jugadores.nombre);
        fd.append('equipo',this.state.jugadores.equipo);
        fd.append('posicion',this.state.jugadores.posicion);
        fd.append('nacionalidad',this.state.jugadores.nacionalidad);
        fd.append('imagen',this.file)

        console.log("state es:"+JSON.stringify(this.state))
        console.log("fd es:"+JSON.stringify(fd))
        console.log("fdddd es:"+fd.get('nombre'))
        console.log("fdddd2222 es:"+fd.get('imagen'))

        jugadoresService.saveJugador(fd)
          .then(
            res => {
                
              console.log("resulñtado es"+JSON.stringify(res));

              this.props.history.push('/jugadores')
            },
            err => {
                console.log("ERROR: ")
                console.error(err)
            }
        )
    }

    render() {

        const nombre = this.state.jugadores.nombre;

        const jugadores = this.state;
        return <div className="col-md-4 offset-md-2">
            <div className="card">
                <div className="card-body">
                    <form action="" onSubmit={this.guardarJugador}>
                        <div className="form-group">
                            <input type="text" name="nombre" placeholder="Nombre" className="form-control" onChange={this.handleInput} autoFocus/>
                        </div>
                        <div className="form-group">
                            <input type="text" name="equipo" value={jugadores.equipo} placeholder="Equipo" className="form-control" onChange={this.handleInput} autoFocus/>
                        </div>    
                        <div className="form-group">
                            <input type="text" name="nacionalidad" value={jugadores.nacionalidad} placeholder="Nacionalidad" className="form-control" onChange={this.handleInput} autoFocus/>
                        </div>    
                        <div className="form-group">
                            <input type="text" name="posicion" value={jugadores.posicion} placeholder="Posicion" className="form-control" onChange={this.handleInput} autoFocus/>
                        </div>

                        <div>
                            <span>Seleccionar imagen: </span>
                            <input type="file" name="imagen" onChange={this.onPhotoSelected} value={jugadores.imagen}/>
                           
                            
                        </div>
                        <br></br>
                        <div>
                            <button className="btn btn-success btn-block">
                            Guardar jugador
                            </button>   
                        </div>
                       
                    </form>
                </div>
            </div>
        </div>

        
    }

}