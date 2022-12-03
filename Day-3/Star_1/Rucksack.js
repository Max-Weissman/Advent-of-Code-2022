var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\n')
        let total = 0
        data.forEach(bag => {
            let one = bag.slice(0, bag.length / 2)
            let two = bag.slice(bag.length / 2)
            let first = {}
            for (let i = 0; i < one.length; i++){
                first[one[i]] = true
            }
            for (let i = 0; i < two.length; i++){
                if (first[two[i]]){
                    let value = two.charCodeAt(i)
                    if (value > 90){
                        value -= 96
                    }
                    else{
                        value -= 38
                    }
                    total += value
                    i = two.length
                }
            }
        })
        console.log(total)
    });
}

counter()