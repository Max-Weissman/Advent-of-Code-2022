var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\r\n')
        let counter = 0
        for (let i = 0; i < data.length; i++){
            let row = data[i]
            for (let j = 0; j < row.length; j++){
                let height = data[i][j]
                let right = j
                let left = j
                let up = i
                let down = i
                let counted = false
                while (right < row.length - 1){
                    right++
                    if (data[i][right] >= height){
                        right = Infinity
                    }
                }
                if (right !== Infinity){
                    counter++
                    counted = true
                }
                while (left > 0 && !counted){
                    left--
                    if (data[i][left] >= height){
                        left = -1
                    }
                }
                if (left !== -1 && !counted){
                    counter++
                    counted = true
                }
                while (up > 0  && !counted){
                    up--
                    if (data[up][j] >= height){
                        up = -1
                    }
                }
                if (up !== -1 && !counted){
                    counter++
                    counted = true
                }
                while (down < data.length - 1 && !counted){
                    down++
                    if (data[down][j] >= height){
                        down = Infinity
                    }
                }
                if (down !== Infinity && !counted){
                    counter++
                    counted = true
                }
            }
        }
        console.log(counter)
    });
}

counter()