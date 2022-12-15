const { triggerAsyncId } = require("async_hooks");
var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\r\n').map(line => { //input into coords
            return line.split('->').map(coord => {
                return coord.split(',')
            })
        })
        let cave = [] //make cave of empty air
        for (let i = 0; i < 200; i++){
            let line = []
            for (let j = 0; j < 200; j++){
                line.push('.')
            }
            cave.push(line)
        }
        data.forEach(rock => { //for each rock
            let next = rock[0]
            let prev
            rock.forEach(point => { //for each rock line
                prev = next
                next = point
                let prevX = prev[0] - 400
                let prevY = Number(prev[1])
                let nextX = next[0] - 400
                let nextY = Number(next[1])
                cave[nextY][nextX] = '#'
                let X = nextX - prevX
                let Y = nextY - prevY
                if (Math.abs(X) > 0){ //connect the two points
                    for (let i = 1; i < Math.abs(X); i++){
                        if (X > 0){
                            cave[prevY][prevX + i] = '#'
                        }
                        else {
                            cave[prevY][prevX - i] = '#'
                        }
                        
                    }
                }
                else{
                    for (let i = 1; i < Math.abs(Y); i++){
                        if (Y > 0){
                            cave[prevY + i][prevX] = '#'
                        }
                        else{
                            cave[prevY - i][prevX] = '#'
                        }
                    }
                }

            })
        })
        let overflow = false
        while(!overflow){
            let tracker = [0, 100]
            let stuck = false
            while (!stuck){
                if (tracker[0] === 199){
                    overflow = true
                    break
                }
                let above = cave[tracker[0] + 1][tracker[1]]
                let left = cave[tracker[0] + 1][tracker[1] - 1]
                let right = cave[tracker[0] + 1][tracker[1] + 1]
                if (above !== 'o' && above !== '#'){
                    tracker[0]++
                }
                else if (left !== 'o' && left !== '#'){
                    tracker[0]++
                    tracker[1]--
                }
                else if (right !== 'o' && right !== '#'){
                    tracker[0]++
                    tracker[1]++
                }
                else{
                    stuck = true
                    cave[tracker[0]][tracker[1]] = 'o'
                }
            }
        }
        let sand = 0
        cave.forEach(line => {
            process.stdout.write(line.join(''));
            process.stdout.write(`\n`);
            line.forEach(cell => {
                if (cell === 'o'){
                    sand++
                }
            })
        })
        console.log(sand)
    })
}

counter()