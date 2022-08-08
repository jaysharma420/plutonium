// const { size } = require('lodash');
const lodash = require('lodash');

let printDate = function(){
    console.log("today's date is :- ",new Date().toDateString());
}
let printMonth = function(){
    var arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    console.log("current month is :- ",arr[new Date().getMonth()]);
}
let getBatchInfo = function(){
    console.log("Plutonium, W3D3, the topic for today is Nodejs module system");
}

let chuk = function(){
    var arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var odd = [1,3,5,7,9,11,13,15,17,19]
var t = lodash.chunk(arr,[size=3])
let jk = lodash.tail(odd)
let first = [1,2,3]
let second = [4,2,3]
let third = [4,5,3]
let fourth = [4,5,6]
let fifth = [6,7,8]
let sixth = lodash.union(first,second,third,fourth,fifth)
let st = lodash.fromPairs( [["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]])

console.log(st);
console.log(sixth);
console.log(jk);
console.log(t);
}
module.exports.printDate = printDate
module.exports.printMonth = printMonth
module.exports.getBatchInfo = getBatchInfo
module.exports.chuk = chuk