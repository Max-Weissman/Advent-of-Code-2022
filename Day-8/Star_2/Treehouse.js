var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\r\n')
        let max = 0
        for (let i = 0; i < data.length; i++){
            let row = data[i]
            for (let j = 0; j < row.length; j++){
                let height = data[i][j]
                let right = j
                let left = j
                let up = i
                let down = i
                let rightCounter = 0
                let leftCounter = 0
                let upCounter = 0
                let downCounter = 0
                while (right < row.length - 1){
                    right++
                    if (data[i][right] >= height){
                        right = Infinity
                    }
                    rightCounter++
                }
                while (left > 0){
                    left--
                    if (data[i][left] >= height){
                        left = -1
                    }
                    leftCounter++
                }
                while (up > 0){
                    up--
                    if (data[up][j] >= height){
                        up = -1
                    }
                    upCounter++
                }
                while (down < data.length - 1){
                    down++
                    if (data[down][j] >= height){
                        down = Infinity
                    }
                    downCounter++
                }
                let scene = upCounter * downCounter * rightCounter * leftCounter
                if (scene > max){
                    max = scene
                }
            }
        }
        console.log(max)
    });
}

counter()