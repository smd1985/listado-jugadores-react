import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

//Components
import Navegacion from './components/Navegacion'
import Jugadores from './components/Jugadores';
import Inicio from './components/Inicio';
import AddJugad from './components/AddJugad'

function App() {
  return (
    <div className="App">

    
    <Router>
    <div>
      <Navegacion />
      <Route exact path="/" render={props => (
        
          <Inicio/>
        
      )}>
      </Route>
      <Route path="/jugadores" component={Jugadores}/>
      <Route path="/addJugador" component={AddJugad}/>
      
    </div>
  </Router>
  </div>
  );
}

export default App;
