var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\n')
        let total = 0
        data.forEach(game => {
            let opp = game[0]
            let outcome = game[2]
            if (outcome === "Z"){ //win
                total += 6
                if (opp === "A"){ //rock
                    total += 2
                }
                else if (opp === "B"){ //paper
                    total += 3
                }
                else{ //scissor
                    total += 1
                }
            }
            else if (outcome === "Y"){ //tie
                total += 3
                if (opp === "A"){ //rock
                    total += 1
                }
                else if (opp === "B"){ //paper
                    total += 2
                }
                else{ //scissor
                    total += 3
                }
            }
            else { //lose
                if (opp === "A"){ //rock
                    total += 3
                }
                else if (opp === "B"){ //paper
                    total += 1
                }
                else{ //scissor
                    total += 2
                }
            }
        })
        console.log(total)
    });
}

counter()