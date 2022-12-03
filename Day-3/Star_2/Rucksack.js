var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\n')
        let elf = 0
        let total = 0
        let rucksack = {}
        data.forEach(bag => {
            elf++
            if (elf === 1){
                for (let i = 0; i < bag.length; i++){
                    rucksack[bag[i]] = true
                }
            }
            else if(elf === 2){
                for (let i = 0; i < bag.length; i++){
                    if (rucksack[bag[i]]){
                        rucksack[bag[i]] = "checked"
                    }
                }
            }
            else{
                for (let i = 0; i < bag.length; i++){
                    if (rucksack[bag[i]] === "checked"){
                        let value = bag.charCodeAt(i)
                        if (value > 90){
                            value -= 96
                        }
                        else{
                            value -= 38
                        }
                        total += value
                        i = bag.length
                    }
                }
                elf = 0
                rucksack = {}
            }
        })
        console.log(total)
    });
}

counter()