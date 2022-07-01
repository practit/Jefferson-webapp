import { useEffect, useState } from 'react'
import Pedido from '../components/Pedido_box'
import collections from '../modules/firebase/collection.mjs'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import {nanoid} from 'nanoid'

function Pedidos() {
  const [pedidos, setPedidos] = useState();
  useEffect(() => {
    collections.pedido.get().then(e => setPedidos(e))
  }, []);
  const listPedidos = () => {
		const pedidosJSX = [];
		pedidos.forEach((value, key) => {
      const pedValues = { ...value };
			pedidosJSX.push(<Pedido key={key} pedId={key} PedidoData={pedValues} editMode={value.__editMode} />);
    });
    console.log(pedidosJSX)
		return pedidosJSX;
  };
  function newPedido(event) {
    const newMap = new Map(pedidos)
    newMap.set(nanoid(), collections.pedido.plantilla({__editMode:1}));
    setPedidos(newMap)
  }
  return (
    <div className="editorPedidos">
      <button className='formBtn' onClick={newPedido}><FontAwesomeIcon icon={faPlus}/></button>
      {pedidos ? listPedidos() : <h1>Cargando Pedidos...</h1>}
		</div>
	);
}

export default Pedidos