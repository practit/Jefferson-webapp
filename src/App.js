import logo from './jefferson_logo.png';
import react_logo from './react_logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Trabajo en proceso...
        </h1>
        <p className='con-amors'>Con ❤ y <img src={react_logo} className="App-logo-pequenio" alt="react logo" />
        </p>
      </header>
    </div>
  );
}

export default App;
