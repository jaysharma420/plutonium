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
module.exports.printDate = printDate
module.exports.printMonth = printMonth
module.exports.getBatchInfo = getBatchInfo