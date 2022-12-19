var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\r\n').map(line => { //change input to array of array
           let x = line.indexOf('x')
           let y = line.indexOf('y')
           let colon = line.indexOf(':')
           let sensorX = line.slice(x + 2, y - 2)
           let sensorY = line.slice(y + 2, colon)
           let half = line.slice(colon)
           x = half.indexOf('x')
           y = half.indexOf('y')
           let beaconX = half.slice(x + 2, y - 2)
           let beaconY = half.slice(y + 2)
           return [sensorX, sensorY, beaconX, beaconY]
        })
        let coverage = []
        data.forEach(pair => {
            let X = Math.abs(pair[0] - pair[2]) //x distance between sensor and beacon
            let Y = Math.abs(pair[1] - pair[3]) //y distance between sensor and beacon
            let reach = X + Y //the radius of the range between sensor and beacon
            let goal = Math.abs(2000000 - pair[1]) //y distance between sensor and goal
            let length = reach - goal //how many tiles the radius covers once it reaches the goal
            console.log("pairs",pair)
                console.log("X:", X)
                console.log("Y:", Y)
                console.log("reach:" ,reach)
                console.log("goal:" ,goal)
                console.log("length:" ,length)
            if (length > 0){
                let scope = [pair[0] - length, Number(pair[0]) + length]
                for (let i = 0; i < coverage.length; i++){
                    if (scope[0] < coverage[i][0] && scope[1] > coverage[i][1]){
                        coverage[i] = scope
                        break
                    }
                    else if (scope[0] > coverage[i][0] && scope[1] < coverage[i][1]){
                        break
                    }
                    else if (scope[0] < coverage[i][0] && scope[1] < coverage[i][1]){
                        coverage[i][0] = scope[0]
                        break
                    }
                    else if (scope[0] > coverage[i][0] && scope[1] > coverage[i][1]){
                        coverage[i][1] = scope[1]
                        break
                    }
                    else if (i === coverage.length - 1){
                        coverage.push(scope)
                    }
                }
                if (coverage.length === 0){
                    coverage.push(scope)
                }
                console.log("scope:",scope)
            }
            console.log('\n')
        })
        let answer = 0
        coverage.forEach(range => {
            answer += range[1] - range[0]
        })
        console.log(answer)
    })
}

counter()