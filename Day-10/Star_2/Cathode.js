var fs = require("fs");

let counter = () => {
    let signal = 1
    let cycle = 0
    let array = [40,80,120,160,200,240]
    let row = []
    let answer = []
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\r\n')
        data.forEach(line => {
            cycle++
            if (cycle === signal || cycle === signal + 1 || cycle === signal + 2){
                row.push('.')
            }
            else{
                row.push('#')
            }
            if (array.includes(cycle)){
                cycle -= 40
                process.stdout.write(row.join('') + '\n')
                row = []
            }
            if (line !== "noop"){
                cycle++
                if (cycle === signal || cycle === signal + 1 || cycle === signal + 2){
                    row.push('.')
                }
                else{
                    row.push('#')
                }
                if (array.includes(cycle)){
                    cycle -= 40
                    process.stdout.write(row.join('') + '\n')
                    row = []
                }
                let addx = line.slice(5)
                signal += Number(addx)
            }
        })
    });
}

counter()