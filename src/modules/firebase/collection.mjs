import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "./fbinstance.mjs";
const coleccciones = {
  pedido: {
    plantilla: {
      observacion: "",
      comida: [
        {
          comida_id: "",
          cantidad: 1,
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
    },
    /**
     * Inserta un valor a la colección pedido
     * @param {*} pedido Los datos del pedido
     */
    insertar: pedido =>
      addDoc(collection(db, "pedido"), pedido),
    setear: (pedido_id, capital, merge) =>
      setDoc(doc(db,"pedido",pedido_id), { capital: capital }, { merge: merge })
  },
};
export default coleccciones;
