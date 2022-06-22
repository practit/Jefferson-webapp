import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faPencil, faRemove, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import collections from "../modules/firebase/collection.mjs";
function PedidoBox({ PedidoData, pedId, editMode:em }) {
  /*
  Edition modes
  0 = View
  1 = Edit
  2 = Confirm Delete
   */
  const [editMode, setEditMode] = useState(0);
  useEffect(e=>{if(em) setEditMode(em)},[em])
  const [p, setP] = useState(PedidoData);
  const [edittingP, setEdittingP] = useState(p);
  const [editingData, setEdittingData] = useState(false);
  const setViewMode = (e) => {
    if (editingData) {
      const edp = {...edittingP}
      delete(edp.__editMode)
      collections.pedido.set(pedId, edp, true).then(setP(edittingP))
    };
    setEdittingData(false);
    setEditMode(0)
  };
  const setViewModeDiscard = (e) => {
    setEdittingData(false);
		setEditMode(0);
  }
  const setEditionMode = (e) => {setEdittingData(true); setEditMode(1) };
  const setDeleteMode = (e) => setEditMode(2);
  function handleInput(event, data) {
    console.log(data, event.target.value, edittingP)
    const obj = { ...edittingP }
    obj[data] = event.target.value
    setEdittingP(obj)
  }
  function handleSubmit(event) {
    event.preventDefault()
    setViewMode()
  }
  if (!p) return (<div className="PedidoBox"></div>)
  if(editMode === 0) return (<div className="PedidoBox">
    <ul className="PedidoBoxButtons">
      <li onClick={setEditionMode}><FontAwesomeIcon icon={faPencil} /></li>
      <li onClick={setDeleteMode}><FontAwesomeIcon icon={faTrashCan} /></li>
    </ul>
    <div className="PedidoBoxContent">
      <h2>{p.nombre}</h2>
      <p>{p.observacion}</p>
      <p>{moment(p.pedido_fecha).format("DD/MM/YYYY HH:MM")}</p>
    </div>
  </div>)
  if(editMode === 1) return (<div className="PedidoBox">
    <ul className="PedidoBoxButtons">
      <li>Editando pedido</li>
      <li onClick={setViewMode}><FontAwesomeIcon icon={faSave} /></li>
      <li onClick={setViewModeDiscard}><FontAwesomeIcon icon={faRemove} /></li>
    </ul>
    <div className="PedidoBoxContent">
      <form className="PedidoBoxForm" onSubmit={handleSubmit}>
        <input id={pedId + "_nombre"} type="text" className="PedidoBoxFormEl" name="Nombre" value={edittingP.nombre} onInput={(e) => handleInput(e, "nombre")} autoFocus/>
        <br />
        <textarea id={pedId + "_observacion"} type="text" className="PedidoBoxFormEl" value={edittingP.observacion} onInput={(e) => handleInput(e, "observacion")}/>
        {/* TODO: Arreglar input fecha 
        <label htmlFor={pedId + "_Fecha"} className="PedidoBoxFormEl">Fecha: </label>
        <input id={pedId + "_Fecha"} type="date" className="PedidoBoxFormEl" value={edittingP.pedido_fecha} onInput={(e) => handleInput(e, "pedido_fecha")}/> */}
        <input type="submit" className="formBtn2"/>
      </form>
      <p>{moment(edittingP.pedido_fecha).format("DD/MM/YYYY HH:MM")}</p>
    </div>
  </div>)
}

export default PedidoBox;