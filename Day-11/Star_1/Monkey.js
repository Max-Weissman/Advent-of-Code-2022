var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\r\n\r\n').map(monkey => monkey.split('\r\n'))
        let items = []
        data.forEach(monkey => {
            let info = {}
            info['item'] = monkey[1].slice(18).split(', ').map(num => Number(num))
            info['operation'] = monkey[2].slice(-3).split(' ')
            info['test'] = Number(monkey[3].slice(21))
            info['true'] = Number(monkey[4].slice(-1))
            info['false'] = Number(monkey[5].slice(-1))
            info['counter'] = 0
            items.push(info)
        })
        for (let i = 0; i < 20; i++){
            items.forEach((monkey, index) => {
                while(monkey.item.length > 0){
                    monkey['counter']++
                    let response = false
                    let num = monkey['item'][0]
                    if (monkey['operation'][0] === 'old'){
                        monkey.item[0] = Math.floor(monkey['item'][0] * monkey['item'][0] / 3)
                        if (monkey.item[0] % monkey['test'] === 0){
                            response = true
                        }
                    }
                    else if (monkey['operation'][0] === '+'){
                        monkey.item[0] = Math.floor((monkey['item'][0] + Number(monkey['operation'][1])) / 3)
                        if (monkey.item[0] % monkey['test'] === 0){
                            response = true
                        }
                    }
                    else{
                        monkey.item[0] = Math.floor(monkey['item'][0] * Number(monkey['operation'][1]) / 3)
                        if (monkey.item[0] % monkey['test'] === 0){
                            response = true
                        }
                    }
                    let thrown = monkey.item[0]
                    monkey.item.shift()
                    if (response){
                        items[monkey['true']]['item'].push(thrown)
                    }
                    else{
                        items[monkey['false']]['item'].push(thrown)
                    }
                    
                }
            })
        }
        items.sort((a,b) => b.counter - a.counter)
        console.log(items[0].counter * items[1].counter)
    });
}

counter()