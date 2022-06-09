import { doc } from "firebase/firestore";
import { db } from "./fbinstance.mjs";

class Comida {
	constructor(obj) {
		this.nombre = obj.nombre;
		this.cantidad = obj.cantidad;
		this.precio = obj.precio;
    this.id = obj.id;
    if (obj.firebase) this.firebase = obj.firebase;
    if (!this.firebase.doc) this.firebase.doc = doc(db, "Comida", this.id);
  }
}
class Pedido{
  constructor(obj) {
    this.observacion = obj.observacion;
    
    if (obj.Comida) 
      
  }
}
export {
  Comida,
  Pedido
}