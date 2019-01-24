const SHA256 = require('crypto-js').SHA256;

class Block {
    constructor(timeStamp, transactions, hashAnterior = '') {
        this.timeStamp = timeStamp;
        this.transactions = transactions;
        this.hashAnterior = hashAnterior;
        this.indice = 0;
        this.hash = this.calcularHash();
    }

    calcularHash() {
        return SHA256(this.timeStamp + this.hashAnterior + JSON.stringify(this.transactions) + this.indice).toString();
    }

    minarBloque(dificultad) {
        while (this.hash.substring(0, dificultad) !== Array(dificultad + 1).join('0')) {
            this.indice++;
            this.hash = this.calcularHash();
        }
        console.log('bloque minado: ' + this.hash);
    }
}

module.exports = Block;