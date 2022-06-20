import { useState } from 'react'
import Pedido from '../components/Pedido_box'
import collections from '../modules/firebase/collection.mjs'
import {nanoid} from 'nanoid'
const p = collections.pedido.plantilla;
const pedidos_demo = [
  p({id:nanoid(), observacion:"Que esté caliente"}),
  p({id:nanoid(), observacion:""}),
  p({id:nanoid(), observacion:""}),
]
function Pedidos() {
  const [pedidos, setPedidos] = useState(pedidos_demo);
  console.log(pedidos)

  console.log("pedidos")
  return (
    <div className="editorPedidos">
      {pedidos.map(e =>
        <Pedido
          PedidoData={e}
        />)}
    </div>
  )
}

export default Pedidos