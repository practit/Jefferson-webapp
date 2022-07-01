import { collection } from "firebase/firestore";
import collections from "./collection.mjs";
const run = async () => {
	const pedidos = [];
  const ped_plantilla = collections.pedido.plantilla;
	for (let i = 0; i < 3; i++) {
    pedidos.push(
      ped_plantilla()
      );
    }
  // Test individual
  collections.pedido.add(ped_plantilla())
  // Bulk test
  const bulk_test = collections.pedido.add_batch(pedidos);

  // Testeando el set
  await collections.pedido.set("custom_pedido",ped_plantilla(), false)
  await collections.pedido.set("custom_pedido",{elpepe:true}, true)
  

	console.log(await bulk_test);
};
run();
