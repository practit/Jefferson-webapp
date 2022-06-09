import coleccion from './collection.mjs';
const pedido = {
  observacion: "pizza",
  comida: [
    {cantidad: 2,
    comida_id: "as"
    }
  ], direccion: {
    barrio_id: "/jefferson-abd10/comida",
    precio:2023
  },
  estado: {
    pagado : true
  },
  nombre: "Juan otra vez",
  pedido_fecha: new Date()
}
const run = async () => console.log(await coleccion.pedido.insertar(coleccion.pedido.plantilla()))
run()