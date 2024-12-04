/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  if(transactions.length != 0){
   let categoryArray =[];
    let ansArray = []
   transactions.map((item)=>{
     if(categoryArray.includes(item.category)){
              ansArray.forEach((cartitem)=>{
                 if(cartitem.category == item.category){
                       cartitem.totalSpent += item.price;
                 }
     })
     }
     else{
       categoryArray.push(item.category);
        const cartnewObj = {
          category:item.category,
          totalSpent:item.price
        }
        ansArray.push(cartnewObj);

     }
   })
   return ansArray
  }
  return [];
}

module.exports = calculateTotalSpentByCategory;
