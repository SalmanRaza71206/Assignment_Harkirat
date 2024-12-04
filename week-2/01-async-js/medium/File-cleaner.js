const str = 'hello  my    name   is       raman';
let ans = '';
let i=0;
while(i<str.length){              // hello 
    if(str[i] != ' '){
        ans+=str[i];
        Space_found=false;
       
    }
    if(Space_found == false && str[i] == ' '){
        Space_found=true;
        ans+=' '
    }
    i++;
}
console.log(ans)