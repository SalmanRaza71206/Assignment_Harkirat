let counter = 0;

function counterstate(){
    counter++
console.log(counter)
setTimeout(counterstate,1000)
}
counterstate()



