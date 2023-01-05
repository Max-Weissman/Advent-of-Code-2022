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
        let coords = []
        data.forEach(pair => {
            let X = Math.abs(pair[0] - pair[2]) //x distance between sensor and beacon
            let Y = Math.abs(pair[1] - pair[3]) //y distance between sensor and beacon
            let reach = X + Y //the radius of the range between sensor and beacon
            coords.push([reach, Number(pair[0]), Number(pair[1])]) //add the radius of each sensor with their coords
        })
        let answer
        console.log(coords)
        checkLine(coords)
        console.log(answer)
    })
}

function checkLine(coords){
    for (let i = 0; i <= 40000; i++){ //for every y line
        let coverage = []
        coords.forEach(range => {
            let radius = range[0]
            let x = range[1]
            let y = range[2]
            let distance = Math.abs(i - y) //y distance from sensor to this line
            let length = radius - distance //remaining radius once reaching this line
            if (length > 0){
                let left = x - length
                let right = x + length
                for (let i = 0; i < coverage.length; i++){
                    if (left < coverage[i][0] && right > coverage[i][1]){
                        coverage[i] = [left, right]
                        break
                    }
                    else if (left > coverage[i][0] && right < coverage[i][1]){
                        break
                    }
                    else if (left < coverage[i][0] && right < coverage[i][1]){
                        coverage[i][0] = left
                        break
                    }
                    else if (left > coverage[i][0] && right > coverage[i][1]){
                        coverage[i][1] = right
                        break
                    }
                    else if (i === coverage.length - 1){
                        coverage.push([left, right])
                    }
                }
                if (coverage.length === 0){
                    coverage.push([left, right])
                }
            }
        })
    }
    
}

counter()