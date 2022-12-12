var fs = require("fs");

let counter = () => {
    let visits = {}
    let head = [0, 0] //head start
    let tail = [0, 0] //tail start
    visits["0-0"] = true
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\r\n')
        data.forEach(line => {
            let direction = line[0] //direction
            let num = Number(line.slice(2)) //how many steps
            for (let i = 0; i < num; i++){ //number of steps to do this
                let prev = [tail[0], tail[1]]
                if (direction === 'L'){ //move head once in the direction
                    head[1]--
                }
                else if (direction === 'R'){
                    head[1]++
                }
                else if (direction === 'U'){
                    head[0]--
                }
                else if (direction === 'D'){
                    head[0]++
                }
                let horizontal = head[1] - tail[1] //difference between head and tail
                let vertical = head[0] - tail[0]
                if (horizontal > 1){ //if two steps to right move tail right
                    tail[1]++
                    if (vertical === 1){ //if one step up or down
                        tail[0]++
                    }
                    else if(vertical === -1){
                        tail[0]--
                    }
                }
                else if(horizontal < -1){ //if two steps to left move tail left
                    tail[1]--
                    if (vertical === 1){ //if one step up or down
                        tail[0]++
                    }
                    else if(vertical === -1){
                        tail[0]--
                    }
                }
                else if (vertical > 1){ //if two steps up mvoe tail up
                    tail[0]++
                    if (horizontal === 1){ //if one step left or right
                        tail[1]++
                    }
                    else if(horizontal === -1){
                        tail[1]--
                    }
                }
                else if (vertical < -1){ //if two steps down move tail down
                    tail[0]--
                    if (horizontal === 1){ //if one step left or right
                        tail[1]++
                    }
                    else if(horizontal === -1){
                        tail[1]--
                    }
                }
                if (!visits[tail[0].toString() + '-' + tail[1].toString()]){ //if tail hasnt been at this point before
                    visits[tail[0].toString() + '-' + tail[1].toString()] = true
                }
            }
        })
        console.log(Object.keys(visits).length, head, tail)
    });
}

counter()