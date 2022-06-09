import collections from './collection.mjs';
const run = async () => console.log(await collections.pedido.add(collections.pedido.plantilla()))
run()