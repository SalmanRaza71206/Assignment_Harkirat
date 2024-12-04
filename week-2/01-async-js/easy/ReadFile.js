const { readFile } = require('node:fs/promises')

const fs = require('node:fs').promises

// Reading the file Asynchronously

fs.readFile('file.txt','utf-8',(err,data)=>{
    if(err){
        console.log(err)
    }
    else {console.log(data)}
})


//Reading the file Synchronously
try{
let data = fs.readFileSync('file.txt','utf-8')
console.log(data)
}catch(err){
    console.log(err)
}
console.log("hello")


//Reading file Asynchronously with new method  async and await with promise

async function readfilecall() {
    try{
    let data = await readFile('file.txt','utf-8')
    console.log(data.trim())
    } catch(err){
        console.log(err)
    }
}
readfilecall()