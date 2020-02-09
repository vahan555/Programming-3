var LiveForm = require("./LiveForm");
var GrassEater = require("./GrassEater");
var random = require("./random.js");



module.exports = class Witcher extends LiveForm {
    constructor(x, y) {
        super(x,y)
        this.life = 20;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character)

    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }
    eat() {
        var Cell = this.chooseCell(3)
        var Cell1 = this.chooseCell(5)
        var Cells = Cell.concat(Cell1)
        console.log(Cells)
        var newCell = random(Cells)
        if (newCell) {
            console.log(newCell)
            var newX = newCell[0];
            var newY = newCell[1];
            console.log(newX,newY)
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;
    
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            for(var i in knightArr){
                if (newX == knightArr[i].x && newY == knightArr[i].y) {
                    knightArr.splice(i, 1);
                    break;
                }
            }
    
    
            this.y = newY;
            this.x = newX;
            this.life += 2;
        }
        else if(this.life >= 20){
            this.create()
        }
        else {
            this.move()
        }
        
    }
    create() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            grassEaterHashiv++
            var eater = new GrassEater(newCell[0], newCell[1], 2);
            grassEaterArr.push(eater);
            matrix[newCell[1]][newCell[0]] = 2
            this.life--;
        }

    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in witcherArr) {
            if (witcherArr[i].x == this.x && witcherArr[i].y == this.y) {
                witcherArr.splice(i, 1)
            }
        }
    }
}