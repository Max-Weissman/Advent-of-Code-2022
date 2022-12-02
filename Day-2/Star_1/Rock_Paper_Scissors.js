var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\n')
        let total = 0
        data.forEach(game => {
            let opp = game[0]
            let me = game[2]
            if (me === "X"){ //convert to same code
                me = "A"
            }
            else if (me === "Y"){
                me = "B"
            }
            else {
                me = "C"
            }
            if (me === "A"){ //rock
                total++
                if (opp === "A"){ //draw
                    total += 3
                }
                else if (opp === "C"){ //win
                    total += 6
                }
            }
            else if (me === "B"){ //paper
                total += 2
                if (opp === "B"){ //draw
                    total += 3
                }
                else if (opp === "A"){ //win
                    total += 6
                }
            }
            else { //scissor
                total += 3 
                if (opp === "C"){ //draw
                    total += 3
                }
                else if (opp === "B"){ //win
                    total += 6
                }
            }
            console.log(total, opp, me)
        })
        console.log(total)
    });
}

counter()