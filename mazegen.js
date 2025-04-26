
const SCREEN_HEIGHT = 500
const SCREEN_WIDTH = 500

const CELL_WALL_SIZE = 5
const CELL_SIZE = 50

const CELL_WALL_COLOUR = 0xffffff
const CELL_COLOUR = 0x00ff00

class Cell {
    constructor(x, y, cell_size, cell_wall_size, cell_color) {
        this.cws = cell_wall_size
        this.cs = cell_size
        this.cc = cell_color
        this.visited = false
        this.currNode = false
        this.x = x
        this.y = y
        this.offsetX = 0
        this.offsetY = 0
        this.offsetH = 0
        this.offsetW = 0
    }
    isVisited(visit) {
        this.visited = visit
    }
    neighbours(arr) {

        if (this.x - 1 < 0 && this.y - 1 < 0) {
            let right = arr[this.x + 1][this.y]
            let bottom = arr[this.x][this.y + 1]

            return { r: right, b: bottom }
        } else if (this.x + 1 >= 9 && this.y + 1 >= 9) {
            let top = arr[this.x][this.y - 1]
            let left = arr[this.x - 1][this.y]

            return { t: top, l: left }
        } else if (this.x + 1 >= 9 && this.y - 1 < 0) {
            let bottom = arr[this.x][this.y + 1]
            let left = arr[this.x - 1][this.y]

            return { l: left, b: bottom }
        } else if (this.x - 1 < 0 && this.y + 1 >= 9) {
            let top = arr[this.x][this.y - 1]
            let right = arr[this.x + 1][this.y]

            return { r: right, t: top }
        }

        if (this.x + 1 >= 9) {
            let top = arr[this.x][this.y - 1]
            let bottom = arr[this.x][this.y + 1]
            let left = arr[this.x - 1][this.y]

            return { t: top, b: bottom, l: left }
        } else if (this.x - 1 < 0) {
            let top = arr[this.x][this.y - 1]
            let right = arr[this.x + 1][this.y]
            let bottom = arr[this.x][this.y + 1]

            return { t: top, r: right, b: bottom }
        }
        if (this.y + 1 >= 9) {
            let top = arr[this.x][this.y - 1]
            let right = arr[this.x + 1][this.y]
            let left = arr[this.x - 1][this.y]

            return { t: top, r: right, l: left }
        } else if (this.y - 1 < 0) {
            let right = arr[this.x + 1][this.y]
            let bottom = arr[this.x][this.y + 1]
            let left = arr[this.x - 1][this.y]

            return { r: right, b: bottom, l: left }
        }
        let top = arr[this.x][this.y - 1]

        let right = arr[this.x + 1][this.y]
        let bottom = arr[this.x][this.y + 1]
        let left = arr[this.x - 1][this.y]
        return { t: top, r: right, b: bottom, l: left }
    }
    isCurr(curr) {
        this.currNode = curr
        if (!this.currNode) {
            this.cc = 0x0e0b66
        } else {
            this.cc = 0x0e0b66
        }
    }
    draw(graphics) {
        graphics.rect((this.cws + (this.cs + this.cws) * this.x) - this.offsetX, (this.cws + (this.cs + this.cws) * this.y) - this.offsetY, this.cs + this.offsetW, this.cs + this.offsetH).fill(this.cc)
    }
    destroyWall(wall) {
        console.log(`The ${wall} wall has been destroyed for this cell`)
        if (wall === "b") {
            this.offsetH += 5
        } else if (wall === "r") {
            this.offsetW += 5
        } else if (wall === "t") {
            if (this.offsetH !== 0) {
                this.offsetH += 5
            } else {
                this.offsetH = 5
            }
            this.offsetY = 5
        } else if (wall === "l") {
            if (this.offsetW !== 0) {
                this.offsetW += 5
            } else {
                this.offsetW = 5
            }
            this.offsetX = 5
        }
    }
}

const app = new PIXI.Application();
await app.init({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT })

const graphics = new PIXI.Graphics()

let cellArray = []

for (let i = 0; i < 9; i++) {
    let row = []
    for (let j = 0; j < 9; j++) {
        let cell = new Cell(i, j, CELL_SIZE, CELL_WALL_SIZE, CELL_COLOUR)
        row.push(cell)
    }
    cellArray.push(row)
}

let stack = []




let new_cell = cellArray[Math.trunc(Math.random() * 9)][Math.trunc(Math.random() * 9)]

stack.push(new_cell)
new_cell.isCurr(true)
new_cell.isVisited(true)

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        cellArray[i][j].draw(graphics)
    }
}

app.ticker.add((time) => {
    if (stack.length !== 0) {
        let unVisited = {}
        for (const [key, value] of Object.entries(new_cell.neighbours(cellArray))) {
            if (!(value.visited)) {
                unVisited[key] = value
            }
        }
        if (Object.keys(unVisited).length === 0) {
            new_cell.cc = 0x00ff00
            stack.pop()
            new_cell = stack[stack.length - 1]
            new_cell.cc = 0x00ff00
        } else {
            let dir = Object.keys(unVisited)
            let rand = dir[Math.trunc(Math.random() * dir.length)]
            let randNeighbour = unVisited[rand]
            new_cell.destroyWall(rand)
            new_cell.isCurr(false)
            new_cell = randNeighbour
            new_cell.isCurr(true)
            stack.push(new_cell)
            new_cell.isVisited(true)
        }

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                cellArray[i][j].draw(graphics)
            }
        }


    } 
})




app.stage.addChild(graphics)

document.body.appendChild(app.canvas)