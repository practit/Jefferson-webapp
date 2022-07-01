import { arrayRemove, doc } from "firebase/firestore";
import { db } from "./fbinstance.mjs";
class Barrio{
  constructor(obj){
    this.id = obj.id;
    this.nombre = obj.nombre;
    if (obj.firebase) this.firebase = obj.firebase;
    if (this.firebase && !this.firebase.doc) this.firebase.doc = doc(db, "Barrio", this.id);
  }
}
class Comida {
	constructor(obj) {
		this.nombre = obj.nombre;
		this.cantidad = obj.cantidad;
		this.precio = obj.precio;
    this.id = obj.id;
    if (obj.firebase) this.firebase = obj.firebase;
    if (this.firebase && !this.firebase.doc) this.firebase.doc = doc(db, "Comida", this.id);
  }
}
class Pedido{
  /**
   * 
   * @param {Object} obj Pedido Simplificado
   * @param {String} obj.id Id del pedido, nulo si es nuevo
   * @param {Array<Comida>} obj.comida Array de comida (Pueden o no ser instancias de Comida)
   * @param {String} obj.observacion Observación escrita 
   * @param {Barrio} obj.direccion Barrio (Puede o no ser instancia de Barrio)
   * @param {Object} obj.firebase Objeto Personalizado de firebase
   */
  constructor(obj) {
    this.id = obj.id || null
    this.comida = []
    this.observacion = obj.observacion;
    if (Array.isArray(obj.comida))
      obj.comida.map(e => this.comida.push(e instanceof Comida ? e : new Comida(e)));
    if (obj.direccion) 
      this.direccion = obj.direccion instanceof Barrio ?
        obj.direccion : new Barrio(obj.direccion);
    if (obj.firebase) this.firebase = obj.firebase;
    if (this.firebase && !this.firebase.doc) this.firebase.doc = doc(db, "Pedido", this.id);
    }
}
export {
  Comida,
  Pedido,
  Barrio
}
const mipedido = new Pedido({
  observacion: "Marselo, agachate y conoselo",
  comida: [{
    nombre: "Lomopisa",
    cantidad: 2,
    precio: 69.420,
    id : 1
  },{
    nombre: "milawesa",
    cantidad: 1,
    precio: 123.456,
    id : 3
  }
],
direccion:{id:12, nombre:"kul"}
})

console.log(mipedido)