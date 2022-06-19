import './App.css';
import WIP from './pages/WIP.js'
import Usuarios from './pages/Usuarios.js'
import Sidebar from './components/sidebar'
import { useState } from 'react';
function App() {
  const [editor, setEditor] = useState(<WIP />)
  function selectEditor(editor) {
    switch (editor) {
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