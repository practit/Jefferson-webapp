import { addDoc, collection, doc, setDoc, writeBatch } from "firebase/firestore";
import { db } from "./fbinstance.mjs";
const collections = {
  pedido: {
    /**
     * Devuelve la estructura normal de un documento de pedido
		 * @param {*} obj Datos
     * @returns Plantilla de pedido
     */
    plantilla: (obj) => {
      return {
				observacion: "",
				comida: [
					{
						comida_id: "",
						nombre:"",
						cantidad: 1,
						precio: 0,
						
					},
				],
				direccion: {
					barrio_id: "",
					precio: 0,
				},
				estado: {
					cancelado: false,
					enviado: false,
					pagado: false,
					preparado: false,
				},
				nombre: "",
				pedido_fecha: new Date(),
				...obj
			};
    },
    /**
     * Inserta un valor a la colección pedido
     * @param {*} pedido Los datos del pedido
     */
    add: pedido =>
			addDoc(collection(db, "pedido"), pedido),
		/**
		 * Inserta varios valores a la colección pedido
		 * @param {Array<*>} pedidos Array de pedidos
		 */
		add_batch: pedidos => {
			const batch = writeBatch(db);
			for (let pedido of pedidos) {
				batch.set(
					doc(
						collection(db, "pedido")
					), pedido);
			}
			return batch.commit();
		},
		/**
		 * Setea un valor que puede o no existir en la colección pedidos
		 * @param {String} pedido_id Id del pedido
		 * @param {*} pedido Datos del pedido
		 * @param {Boolean} merge Unir con datos existentes, en caso de false reemplazar todo el documento
		 * @returns 
		 */
		set: (pedido_id, pedido, merge) =>
			setDoc(doc(db,"pedido",pedido_id), pedido, { merge: merge })
			
  },
};
export default collections;
