const Block = require('./block');
const Transaction = require('./transaction');

class BlockChain {
    constructor() {
        this.cadena = [
            new Block('26/12/1974', 'Bloque inicial')
        ];
        this.dificultad = 2;
        this.pendingTransactions = [];
        this.recompensaMinero = 100;
    }

    getUltimoBloque() {
        return this.cadena[this.cadena.length - 1];
    }

    agregarBloque(nuevoBloque) {
        nuevoBloque.hashAnterior = this.getUltimoBloque().hash;
        nuevoBloque.minarBloque(this.dificultad);
        this.cadena.push(nuevoBloque);
    }

    minarTransaccionesPendientes(addressMinero) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.hashAnterior = this.getUltimoBloque().hash;

        block.minarBloque(this.dificultad);
        this.cadena.push(block);

        this.pendingTransactions = [new Transaction(null, addressMinero, this.recompensaMinero)];

    }

    agregarTransaccion(transaction) {
        this.pendingTransactions.push(transaction);
    }

    isValid() {
        for (let i = 1; i < this.cadena.length; i++) {
            let bloqueActual = this.cadena[i];
            let bloquePrevio = this.cadena[i - 1];

            if (bloqueActual.hash !== bloqueActual.calcularHash()) {
                console.log('actual fallo');
                return false;
            }

            if (bloqueActual.hashAnterior !== bloquePrevio.hash) {
                console.log('anterior fallo');
                return false;
            }

        }

        return true
    }

    getBalance(address) {
        let balance = 0;
        for (let block of this.cadena) {
            for (let trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }
}

module.exports = BlockChain;