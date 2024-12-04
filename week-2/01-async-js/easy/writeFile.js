const fs = require('node:fs/promises')

const writefilejs = async() =>{
    try{
        let content = 'Added successfully'
 await fs.writeFile('file.txt',content)
    }
    catch(err){
        console.log(err)
    }
}
writefilejs()