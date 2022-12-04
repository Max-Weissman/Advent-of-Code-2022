var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\n')
        let total = 0
        data.forEach(pair => {
            let comma
            for (let i = 0; i < pair.length; i++){
                if (pair[i] === ","){
                    comma = i
                }
            }
            let one = pair.slice(0, comma) //seperate the two elves sections
            let two = pair.slice(comma + 1)
            let oneth
            let twoth
            for (let i = 0; i < one.length; i++){ //seperate the numbers in the ranges in upper and lower limit
                if (one[i] === "-"){
                    oneth = i
                }
            }
            for (let i = 0; i < two.length; i++){
                if (two[i] === "-"){
                    twoth = i
                }
            }
            oneLower = Number(one.slice(0, oneth))
            oneUpper = Number(one.slice(oneth + 1))
            twoLower = Number(two.slice(0, twoth))
            twoUpper = Number(two.slice(twoth + 1))
            if ((oneLower <= twoLower && oneUpper >= twoUpper) || (oneLower >= twoLower && oneUpper <= twoUpper)){ //if one section encompasses the other
                total++
            }
            else if ((oneLower <= twoLower && oneUpper >= twoLower) || (oneLower <= twoUpper && oneUpper >= twoUpper)){ //if the sections overlap at all
                total++
            }
        })
        console.log(total)
    });
}

counter()