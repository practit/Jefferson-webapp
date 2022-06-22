import { useEffect, useState } from 'react'
import Pedido from '../components/Pedido_box'
import collections from '../modules/firebase/collection.mjs'
import {nanoid} from 'nanoid'
const p = collections.pedido.plantilla;

function Pedidos() {
  const [pedidos, setPedidos] = useState();
  useEffect(() => {
    collections.pedido.get().then(e => setPedidos(e))
    
  }, []);
  const listPedidos = () => {
		const pedidosJSX = [];
		pedidos.forEach((value, key) => {
			const pedValues = { ...value, id: key };
			pedidosJSX.push(<Pedido PedidoData={pedValues} />);
    });
		return pedidosJSX;
	};
  console.log("pedidos")
  return (
    <div className="editorPedidos">
      {pedidos ? listPedidos() : <h1>Cargando Pedidos...</h1>}
		</div>
	);
}

export default Pedidos