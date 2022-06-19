import { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Estadistica from './pages/Estadistica';
import Informacion from './pages/Informacion';
import Inicio from './pages/Inicio';
import Usuarios from './pages/Usuarios';
import WIP from './pages/WIP.js';
function App() {
  const [editor, setEditor] = useState(<WIP />)
  function selectEditor(editor) {
    switch (editor) {
      case "Inicio":
        setEditor(<Inicio />)
        break;
      case "Estadistica":
        setEditor(<Estadistica />)
        break;
      case "Informacion":
        setEditor(<Informacion />)
        break;
      case "Usuarios":
        setEditor(<Usuarios />)
        break;
      default:
        setEditor(<WIP />)
    }
  }
  return (
    <div className="App">
      <Sidebar selectEditor={selectEditor} />
      <div className='Editor'>
        {editor}
      </div>
    </div>
  );
}

export default App;