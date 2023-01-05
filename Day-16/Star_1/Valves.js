var fs = require("fs");

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\r\n').map(line => { //change input to array
            let words = line.split(' ')
            let name = words[1]
            let rate = Number(words[4].slice(5, words[4].length - 1))
            let paths = words.slice(9)
            return [name, rate, paths]
        })
        let rooms = {}
        data.forEach(valve => {
            rooms[valve[0]] = [valve.slice(1)]
        })
        let pressure = 0 //total current pressure
        let openedValves = 0 //pressure per min from opened valves
        let closedValves = data.filter(valve => {
            if (valve[1] > 0){
                return true
            }
            else {
                return false
            }
        }).map(valve => valve[0]) //return the codes of the valves with non zero pressure
        console.log(closedValves)
        let position = 'AA'
        for (let i = 0; i < 30; i++){ //

        }
    })
}

let bestValve = (rooms, closedValves, position) => {
    closedValves.forEach(valve => {

    })
}

let findPath = (rooms, position, destination) => {
    let current = [position, [position]]
    let distance = 0
    let path = []
    while (current[0] !== destination){
        current.forEach(room => {
            rooms[room].forEach(tunnel => {
                if (tunnel === destination){

                }
            })
        })
    }
}

counter()