var fs = require("fs");

let counter = () => {
    fs.readFile("./File.txt", "utf8", function(err, text){
        let data = text.split('\n')
        let num = data.map(entry => {
            if (entry.length > 2){
                if (entry[5] === 'r'){
                    return Number(entry.slice(0, 4))
                }
                else{
                    return Number(entry.slice(0, 5))
                }
            }
            else{
                return entry
            }
        })
        let elves = []
        let total = 0
        num.forEach(cal => {
            if (cal === '\r'){
                elves.push(total)
                total = 0
            }
            else{
                total += cal
            }
        })
        elves.push(total)
        max = 0
        second = 0
        third = 0
        elves.forEach(elf => {
            if (elf >= max){
                third = second
                second = max
                if (elf > max){
                    max = elf
                }
            }
            else if (elf >= second){
                third = second
                if (elf > second){
                    second = elf
                }
            }
            else if (elf > third){
                third = elf
            }
        })
        console.log(max + second + third)
    });
}

counter()