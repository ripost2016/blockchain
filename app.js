const Block = require('./block');
const BlockChain = require('./blockChain');
const Transaction = require('./transaction');

// let b1 = new Block(Date.now(), {
//     amount: 100
// });

// let b2 = new Block(Date.now(), {
//     amount: 500
// });

// let neoCoin = new BlockChain();

// neoCoin.agregarBloque(b1);
// neoCoin.agregarBloque(b2);

// Versión con transacciones

let t1 = new Transaction('neoland-address', 'ricardo-address', 100);
let t2 = new Transaction('neoland-address', 'pepe-address', 200);


let neoCoin = new BlockChain();

neoCoin.agregarTransaccion(t1);
neoCoin.agregarTransaccion(t2);

neoCoin.minarTransaccionesPendientes('ricardo-address');
neoCoin.minarTransaccionesPendientes('neoland-address');


console.log(JSON.stringify(neoCoin, null, 4));

console.log('Balance de Ricardo: ' + neoCoin.getBalance('ricardo-address'));
console.log('Balance de Ricardo: ' + neoCoin.getBalance('neoland-address'));

console.log(neoCoin.isValid());