var fs = require("fs");

let counter = () => {
    let visits = {}
    let rope = []
    for (let i = 0; i < 10; i++){
        rope.push([0,0])
    }
    visits["0-0"] = true
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\r\n')
        data.forEach(line => {
            let direction = line[0] //direction
            let num = Number(line.slice(2)) //how many steps
            for (let i = 0; i < num; i++){ //number of steps to do this
                if (direction === 'L'){ //move head once in the direction
                    rope[0][1]--
                }
                else if (direction === 'R'){
                    rope[0][1]++
                }
                else if (direction === 'U'){
                    rope[0][0]--
                }
                else if (direction === 'D'){
                    rope[0][0]++
                }
                for (let j = 0; j < rope.length - 1; j++){
                    let horizontal = rope[j][1] - rope[j + 1][1] //difference between head and tail
                    let vertical = rope[j][0] - rope[j + 1][0]
                    if (horizontal > 1){ //if two steps to right move tail right
                        rope[j + 1][1]++
                        if (vertical === 1){ //if one step up or down
                            rope[j + 1][0]++
                        }
                        else if(vertical === -1){
                            rope[j + 1][0]--
                        }
                    }
                    else if(horizontal < -1){ //if two steps to left move tail left
                        rope[j + 1][1]--
                        if (vertical === 1){ //if one step up or down
                            rope[j + 1][0]++
                        }
                        else if(vertical === -1){
                            rope[j + 1][0]--
                        }
                    }
                    else if (vertical > 1){ //if two steps up mvoe tail up
                        rope[j + 1][0]++
                        if (horizontal === 1){ //if one step left or right
                            rope[j + 1][1]++
                        }
                        else if(horizontal === -1){
                            rope[j + 1][1]--
                        }
                    }
                    else if (vertical < -1){ //if two steps down move tail down
                        rope[j + 1][0]--
                        if (horizontal === 1){ //if one step left or right
                            rope[j + 1][1]++
                        }
                        else if(horizontal === -1){
                            rope[j + 1][1]--
                        }
                    }
                }
                if (!visits[rope[9][0].toString() + '-' + rope[9][1].toString()]){ //if tail hasnt been at this point before
                    visits[rope[9][0].toString() + '-' + rope[9][1].toString()] = true
                }
            }
        })
        console.log(Object.keys(visits).length)
    });
}

counter()