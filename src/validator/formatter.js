let trim = function(str){
console.log("string after trim is :-",str.trim());
}
let changetoLowerCase = function(lr){
    console.log("given string in lower case is that :- ",lr.toLowerCase());
}

let changeToUpperCase= function(pq){
    console.log("given string in upper  case is that :- ",pq.toUpperCase());  
}


module.exports.trim=trim
module.exports.changetoLowerCase = changetoLowerCase
module.exports.changeToUpperCase = changeToUpperCase