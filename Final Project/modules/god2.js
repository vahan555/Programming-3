var LiveForm = require("./LiveForm");
var random = require("./random.js");
var Witcher = require("./witcher.js")

module.exports = class God2 extends LiveForm {
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
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character)

    }
    move() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(5);
        let newCell = random(emptyCells);

        if (newCell) {

            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0;

            for (let i in knightArr) {
                if (knightArr[i].x == x && knightArr[i].y == y) {
                    knightArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;
            this.life++
        }
        else if(this.life == 20){
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
            witcherHashiv++
            var witcher = new Witcher(newCell[0], newCell[1], 4);
            witcherArr.push(witcher);
            matrix[newCell[1]][newCell[0]] = 4;
            this.life-=3
        }

    }
}