var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\r\n').filter(line => {
            if (line !== ''){
                return true
            }
            return false
        }).map(line => {
            return JSON.parse(line)
        })
        data.push([[2]])
        data.push([[6]])
        data.sort((a,b) => {
            let answer = inOrder([a,b])
            if (answer){
                return -1
            }
            else{
                return 1
            }
        })
        let answer = []
        data.forEach((line, index) => {
            if (line.length === 1) {
                if (line[0].length === 1){
                    if (line[0][0] === 2 || line[0][0] === 6){
                        answer.push(index + 1)
                    }
                }
            }
        })
        console.log(answer[0] * answer[1])
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