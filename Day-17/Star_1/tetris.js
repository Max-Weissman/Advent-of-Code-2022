var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let room = []
        for (let i = 0; i < 10000; i++){
            room.push(Array(8).join('.').split(''))
        }
        let one = [[0,0], [0,1], [0,2], [0,3]]
        let two = [[-2,1], [-1,0], [-1,1], [-1,2], [0,1]]
        let three = [[-2,2], [-1,2], [0,0], [0,1], [0,2]]
        let four = [[-3,0], [-2,0], [-1,0], [0,0]]
        let five = [[-1,0], [-1,1], [0,0], [0,1]]
        let shape = [one, two, three, four, five]
        let wind = 0
        for (let i = 0; i < 2022; i++){
            let start = findTop(room) - 3 //how high up rock starts
            let reference = shape[i % 5] //which shape
            let rock = []
            reference.forEach(dot => { //2D drawing of the rock
                height = dot[0] + start - 1
                left = dot[1] + 2
                rock.push([height,left])
            })
            
            let motion = true
            while (motion){
                if (text[wind % text.length] === '>'){
                    let wall = false
                    rock.forEach(dot => {
                        if (!room[dot[0]][dot[1] + 1] || room[dot[0]][dot[1] + 1] === '#'){ //if hit wall or other rock
                            wall = true
                        }
                    })
                    if (!wall){
                        rock.forEach(dot => { //move right
                            dot[1]++
                        })
                    }
                }
                else{
                    let wall = false
                    rock.forEach(dot => {
                        if (!room[dot[0]][dot[1] - 1] || room[dot[0]][dot[1] - 1] === '#'){ //if hit wall or other rock
                            wall = true
                        }
                    })
                    if (!wall){
                        rock.forEach(dot => { //move left
                            dot[1]--
                        })
                    }
                }
                wind++
                rock.forEach(dot => {
                    if (!room[dot[0] + 1]){ //if hit floor
                        motion = false
                    }
                    else if (room[dot[0] + 1][dot[1]] === '#'){ //if hit other rock
                        motion = false
                    }
                })
                if (motion){ //if still moving move down
                    rock.forEach(dot => {
                        dot[0]++
                    })
                }
            }
            rock.forEach(dot => {
                room[dot[0]][dot[1]] = '#'
            })
        }
        room.forEach(row => {
            console.log(row.join())
        })
        console.log(10000 - findTop(room))
    })
}

let findTop = (room) => {
    for (let i = 0; i < room.length; i++){
        let row = room[i]
        if (row.includes('#')){
            return i
        }
    }
    return 10000
}
counter()