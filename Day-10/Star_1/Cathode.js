var fs = require("fs");

let counter = () => {
    let signal = 1
    let cycle = 0
    let product = 0
    let array = [20,60,100,140,180,220]
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\r\n')
        data.forEach(line => {
            cycle++
            if (array.includes(cycle)){
                product += signal * cycle
            }
            if (line !== "noop"){
                cycle++
                if (array.includes(cycle)){
                    product += signal * cycle
                }
                let addx = line.slice(5)
                signal += Number(addx)
            }
        })
        console.log(product)
    });
}

counter()