var fs = require("fs");

class dir {
    constructor(name){
        this.name = name
        this.files = 0
        this.folders = []
        this.parent = null
    }

    findValue(){
        let tracker = this
        let total = 0
        while(tracker.folders.length > 0 || tracker.parent){ //if at root and calculated all the files
            if (tracker.folders.length > 0){
                tracker = tracker.folders[0]
            }
            else if (tracker.parent){
                if (!(tracker.files > 100000)){
                    total += tracker.files
                }
                tracker.parent.files += tracker.files
                tracker = tracker.parent
                tracker.folders.shift()
            }
        }
        return total
    }
}

let counter = () => {
    fs.readFile("./input.txt", "utf8", function(err, text){
        let data = text.split('\n')
        let root = new dir("/")
        let current = root
        data.forEach(line => {
            if (line[0] === "$"){
                if (line[2] === 'c'){ //if cd is the command
                    if (line[5] === '/'){  //if going to root
                        current = root
                    }
                    else if (line[5] === '.'){ // if going parent
                        current = current.parent
                    }
                    else{ //go to the child directory
                        let childName = line.slice(5) //get the name of the directory
                        current.folders.forEach(child => { //make it the current directory
                            if (child.name === childName){
                                current = child
                            }
                        })
                    }
                } //if not cd then ls will just show next lines
            }
            else{ //currently listing off the contents of the current directory
                if (line[0] === 'd'){ //if listing a directory 
                    let parts = line.split(' ') //split into dir and name
                    let childDir = new dir(parts[1]) //make the new Dir
                    childDir.parent = current
                    current.folders.push(childDir)
                }
                else{
                    let parts = line.split(' ') //split into size and name
                    current.files += Number(parts[0]) //add file to the directories size
                }
            }
        })
        console.log(root.findValue())
    });
}

counter()