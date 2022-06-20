import { useState } from 'react';
import './App.css';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import Sidebar from './components/sidebar';
import Estadistica from './pages/Estadistica';
import Informacion from './pages/Informacion';
import Pedidos from './pages/Pedidos';
import Inicio from './pages/Inicio';
import Usuarios from './pages/Usuarios';
import WIP from './pages/WIP.js';
import { faGem, faHeart } from '@fortawesome/free-solid-svg-icons';
function App() {
  const [editor, setEditor] = useState(<Inicio />)
  function selectEditor(editor) {
    switch (editor) {
      case "Inicio":
        setEditor(<Inicio />)
        break;
      case "Pedidos":
        setEditor(<Pedidos />)
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
  console.log("App")
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