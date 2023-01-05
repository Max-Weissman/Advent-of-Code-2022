var fs = require("fs");
const path = require("path");

function pathSolve(grid){
    let checked = {'0-0': true}
    let queue = [[0,0]]
    while(queue.length > 0){
        let directions = []
        let current = queue.shift()
        if (grid[current[0]][current[1]] === 'z'){
            return true
        }
        if (grid[current[0] + 1]){ //not past the array of data
            if (!(checked[(current[0] + 1).toString() + '-' + current[1].toString()])){ //not checked yet 
                if (grid[current[0]].charCodeAt(current[1]) - grid[current[0] + 1].charCodeAt(current[1]) > -2){ //within a step
                    directions.push([1, 0]) //down
                }
            }
        }
        if (grid[current[0] - 1]){ //not past the array of data
            if (!(checked[(current[0] - 1).toString() + '-' + current[1].toString()])){ //not checked yet 
                if (grid[current[0]].charCodeAt(current[1]) - grid[current[0] - 1].charCodeAt(current[1]) > -2){ //within a step
                    directions.push([-1, 0]) //up
                }
            }
        }
        if (grid[current[0]][current[1] + 1]){ //not past the array of data
            if (!(checked[current[0].toString() + '-' + (current[1] + 1).toString()])){ //not checked yet 
                if (grid[current[0]].charCodeAt(current[1]) - grid[current[0]].charCodeAt(current[1] + 1) > -2){ //within a step
                    directions.push([0, 1]) //right
                }
            }
        }
        if (grid[current[0]][current[1] - 1]){ //not past the array of data
            if (!(checked[current[0].toString() + '-' + (current[1] - 1).toString()])){ //not checked yet 
                if (grid[current[0]].charCodeAt(current[1]) - grid[current[0]].charCodeAt(current[1] - 1) > -2){ //within a step
                    directions.push([0, -1]) //left
                }
            }
        }
        directions.forEach(direction => {
            checked[(current[0] + direction[0]).toString() + '-' + (current[1] + direction[1]).toString()] = true
            queue.push([current[0] + direction[0],current[1] + direction[1]])
        })
    }
    return false
}

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\r\n')
        for (let h = 0; h < data.length ; h++){
            let i = h + 12
            if (i >= data.length){
                i = i - data.length
            }
            for (let g = 0; g < data[i].length / 2; g+= 0.5){
                let j = Math.floor(g)
                if (g.toString().slice(-2) === '.5'){
                    j = data[i].length - j - 1
                }
                if (i === 0 && j === 0){
                    continue
                }
                let letter = data[i][j]
                data[i] = data[i].slice(0, j) + '~' + data[i].slice(j + 1)
                if (!pathSolve(data)){
                    data[i] = data[i].slice(0, j) + letter + data[i].slice(j + 1)
                }
            }
        }
        let string = data.join('').split('')
        let answer = string.filter(letter => {
            if (letter === '~'){
                return false
            }
            else{
                return true
            }
        })
        console.log(data)
        console.log(answer.length)
    })
}

counter()