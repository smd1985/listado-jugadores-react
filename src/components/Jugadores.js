import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import  JugadoresService  from '../service/JugadoresService';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AddJugad from './AddJugad'


import './Jugadores.css';

export default class Jugadores extends Component {


    state = {
        jugadores: [],
        id:''
    }

    async componentDidMount() {
       const res = await axios.get('http://localhost:3000/api/jugadores');
       console.log("resultado es:"+JSON.stringify(res))
       this.setState({jugadores: res.data})
    }

    borrarJugador(id) {

        let jugadoresService = new JugadoresService();

        jugadoresService.deleteJugador(id)
          .then(
            res => {
              console.log(res);
              this.getJugadores();
            },
            err => console.error(err)
          )
      }

      getJugadores() {
        let jugadoresService = new JugadoresService();
        jugadoresService.getJugadores()
          .then(
            res => {
                this.setState({jugadores: res.data})
            },
            err => console.error(err)
          );
      }

    render() {
        console.log(this.state.jugadores)

                    const data =    this.state.jugadores.map( (j,ind) => {
                        return <div className="col-md-4">
                        <div className="card mt-4">

                            <div className="card-header">
                                <div class="container">
                                    <div class="row align-items-start">
                                        <div className="col">{j.nombre}</div>

                                        <div className="badge badge-pill badge-info">
                                            {j.posicion}
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div>
                                <img src={"http://localhost:3000/"+j.imagen} alt="logo" width="350" height="250"></img>
                            </div>
    
                            <div className="card-body">
                                {j.nacionalidad} 
                            </div>
                            <div className="card-footer">
                                
                                <button className="btn btn-danger mr-2" onClick={this.borrarJugador.bind(this,j.id)}>
                                    Eliminar 
                                </button>

                            </div>                    
                        </div>
                    </div>
   

                    })

                    return (
                        <div className="Navegacion">
                                   
                            <div className="container">
                                <div className="row mt-4">
                                    <div className="col-md-4 text-center">
                                    </div>
                                </div>
                            </div> 
            
                            <div className="container">
                                <div className="row mt-4 ">
                                    { data }
                                </div>
                            </div>
                        </div>
                      );

                    

    }

}