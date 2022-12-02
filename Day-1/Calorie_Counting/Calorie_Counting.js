var fs = require("fs");

let counter = () => {
    fs.readFile("./File.txt", "utf8", function(err, text){
        let data = text.split('\n')
        let num = data.map(entry => {
            if (entry.length > 2){
                return Number(entry.slice(0, 4))
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
        max = 0
        elves.forEach(elf => {
            if (elf > max){
                max = elf
            }
        })
        console.log(max)
    });
}

counter()