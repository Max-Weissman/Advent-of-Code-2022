var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        for (let i = 13; i < text.length; i++){
            let prev = [] //array of current letter back to 14 letters ago
            for (let j = 0; j < 14; j++){
                let current = text[i - j]
                if (!prev.includes(current)){
                    prev.push(current)
                }
                else{
                    break
                }
                if (j === 13){ //if none of the letters match output the index and end the loop
                    console.log(i + 1)
                    i = text.length
                }
            }
        }
    });
}

counter()