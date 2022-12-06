var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        for (let i = 3; i < text.length; i++){
            let one = text[i]
            let two = text[i - 1]
            let three = text[i - 2]
            let four = text[i - 3]
            if (![two,three,four].includes(one) && ![three, four].includes(two) && three !== four){
                console.log(i + 1)
                break
            }
        }
    });
}

counter()