/**
 * * @dev NodeJS's Crypto Module
 */
const crypto = require('crypto')

class Block{
    constructor(data, prevHash = ""){
        this.timestamp = Date.now();
        this.data = data;
        this.prevHash = prevHash,
        this.hash = this.computeHash();
    }

    computeHash() { 
        let strBlock = this.prevHash + this.timestamp + JSON.stringify(this.data) 
        return crypto.createHash("sha256").update(strBlock).digest("hex") 
    }
}

class BlockChain { 
    constructor() {
        this.blockchain = [this.startGenesisBlock()] 
    }

    startGenesisBlock() {
        return new Block({}) 
    }

    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1] 
    }

    addNewBlock(newBlock) {
        newBlock.prevHash = this.obtainLatestBlock().hash 
        newBlock.hash = newBlock.computeHash() 
        this.blockchain.push(newBlock) 
    }

    checkChainValidity() { 
        for(let i = 1; i < this.blockchain.length; i++) { 
            const currBlock = this.blockchain[i]
            const prevBlock = this.blockchain[i -1]
            
            if(currBlock.hash !== currBlock.computeHash()) 
                return false
          
            if(currBlock.prevHash !== prevBlock.hash)
              return false
        }
        return true 
    }
}


let a = new Block({from: "Joe", to: "Jane"})
let b = new Block({from: "Jane", to: "Joe"})

let chain = new BlockChain() 
chain.addNewBlock(a) 
chain.addNewBlock(b) 
// console.log(chain) 
// console.log("Validity: " + chain.checkChainValidity())