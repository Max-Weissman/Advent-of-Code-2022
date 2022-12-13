var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\r\n\r\n')
        data = data.map(pair => { //split data into the pairs and convert to JSON
            let split = pair.split('\n')
            let left = JSON.parse(split[0])
            let right = JSON.parse(split[1])
            return [left,right]
        })
        let sum = 0
        data.forEach((pair, index) => { //for each pair check if in order
            if (inOrder(pair)){
                sum += index + 1
            }
        })
        console.log(sum)
    })
}

function inOrder(pair){
    let left = pair[0]
    let right = pair[1]
    if (!Array.isArray(left)){ //if either not an array, convert to an array
        left = [left]
    }
    if (!Array.isArray(right)){
        right = [right]
    }
    let tracker = 0
    for (let i = 0; i < left.length; i++){
        tracker++
        if (right[i] === undefined){ //if left longer than right
            return false
        }
        else if (Array.isArray(left[i]) || Array.isArray(right[i])){ //if any item in array is an array
            let passLeft = left
            let passRight = right
            if (Array.isArray(left[i])){
                passLeft = left[i]
            }
            if (Array.isArray(right[i])){
                passRight = right[i]
            }
            let answer = inOrder([passLeft, passRight])
            if (answer === 'neutral'){ //they were identical arrays
                continue
            }
            else if (answer){ //in order
                return true
            }
            else{ //not in order
                return false
            }
        }
        else if (left[i] === right[i]){ //the same
            continue
        }
        else if (left [i] > right[i]){ //out of order
            return false
        } 
        else{ //in order
            return true
        }
    }
    if (tracker < right.length){ //if right longer than left
        return true
    }
    return 'neutral'
}

counter()