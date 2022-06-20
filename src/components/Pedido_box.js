import { faPencil, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PedidoBox({ PedidoData: p }) {
  if (!p) return (<div className="PedidoBox"></div>)
  return (<div className="PedidoBox">
    <ul className="PedidoBoxButtons">
      <li><FontAwesomeIcon icon={faPencil} /></li>
      <li><FontAwesomeIcon icon={faRemove} /></li>
    </ul>
    <span>id: {p.id}</span>
    <p>{p.observacion}</p>
  </div>)
}

export default PedidoBox;