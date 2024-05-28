
const fs = require("fs");


const str = "Suzy	Wellington	9"; 
const line2SQL = (str) => str.split(/\s+/).map(w => !Number.isInteger(parseInt(w)) ? "'"+w+"'" : w).join(", ");

console.log(line2SQL(str))
let data = [];
fs.readFileSync('sql_insert.txt', 'utf-8')
            .split(/\r?\n/)
            .forEach(function(line){
                data.push("("+line2SQL(line)+")");
            })
console.log(data);