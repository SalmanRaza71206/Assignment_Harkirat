/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let newstr = str.replace(/[^\w]|_/g, '').toLowerCase()
  console.log(newstr)
  let l=0;
  let h= newstr.length-1;
while(l<=h){
    if(newstr[l] != newstr[h]){
      return false;
    }
 
    l++;
    h--;
  }
  return true;
}
isPalindrome('race car')
module.exports = isPalindrome;
