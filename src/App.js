import { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Estadistica from './pages/Estadistica';
import Informacion from './pages/Informacion';
import Pedidos from './pages/Pedidos';
import Inicio from './pages/Inicio';
import Usuarios from './pages/Usuarios';
import WIP from './pages/WIP.js';
import { EDITOR_ESTADISTICA, EDITOR_INFORMACION, EDITOR_INICIO, EDITOR_PEDIDOS, EDITOR_USUARIOS, EDITOR_WIP } from './modules/constants.mjs';
function App() {
	const [availableEditors, setAvailableEditors] = useState([EDITOR_USUARIOS, EDITOR_WIP])
	const [editor, setEditor] = useState(<Usuarios setAvailableEditors={setAvailableEditors}/>)
  function selectEditor(editor) {
    switch (editor) {
      case EDITOR_INICIO:
        setEditor(<Inicio />)
        break;
      case EDITOR_PEDIDOS:
        setEditor(<Pedidos />)
        break;
      case EDITOR_ESTADISTICA:
        setEditor(<Estadistica />)
        break;
      case EDITOR_INFORMACION:
        setEditor(<Informacion />)
        break;
      case EDITOR_USUARIOS:
        setEditor(<Usuarios setAvailableEditors={setAvailableEditors}/>)
        break;
      default:
        setEditor(<WIP />)
    }
  }
  return (
    <div className="App">
      <Sidebar selectEditor={selectEditor} availableEditors={availableEditors} />
      <div className='Editor'>
        {editor}
      </div>
    </div>
  );
}

export default App;