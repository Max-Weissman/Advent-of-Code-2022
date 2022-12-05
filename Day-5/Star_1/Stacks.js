var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\n')
        let rows = data.slice(0, 8).map(row => { //split the rows of crates into each box
            let array = []
            for (let i = 0; i < row.length; i += 4){
                array.push(row.slice(i, i + 4))
            }
            return array
        })
        let crates = Array(9).join('.').split('.') //put each row of crates into the proper column
        rows.forEach(row => {
            row.forEach((box,index) => {
                if (box[0] === '['){
                    crates[index] += box[1]
                }
            })
        })
        let inputs = data.slice(10) //grab the orders
        inputs.forEach(input => {
            let num
            let from
            let to
            if (input[6] !== ' '){
                num = Number(input[5] + input[6])
                from = Number(input[13]) - 1
                to = Number(input[18]) - 1
            }
            else{
                num = Number(input[5])
                from = Number(input[12]) - 1
                to = Number(input[17]) - 1
            }
            let take = crates[from].slice(0, num).split('') //take off that many crates
            take.forEach(taken => {
                crates[to] = taken + crates[to] //add them in reverse order to the top of the stack
            })
            crates[from] = crates[from].slice(num) //remove them from the initial stack
        })
        let answer = ''
        crates.forEach(stack => {
            answer += stack[0]
        })
        console.log(answer)
    });
}

counter()