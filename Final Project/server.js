
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var Witcher = require("./modules/witcher.js");
var Knight = require("./modules/knight.js");
var God1 = require("./modules/god1.js");
var God2 = require("./modules/god2.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
witcherArr = [];
knightArr = [];
god1Arr = [];
god2Arr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
witcherHashiv = 0;
knightHashiv = 0;
god1Hashiv = 0;
god2Hashiv = 0;
weather = '';
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, predator, witcher, knight, god1, god2) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < witcher; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < knight; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < god1; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
    for (let i = 0; i < god2; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 7;
    }
}
matrixGenerator(50, 5, 15, 30, 5, 5, 1, 1);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            }
            else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var witcher = new Witcher(x, y);
                witcherArr.push(witcher);
                witcherHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var knight = new Knight(x, y);
                knightArr.push(knight);
                knightHashiv++;
            }
            else if (matrix[y][x] == 6) {
                var god1 = new God1(x, y);
                god1Arr.push(god1);
                god1Hashiv++;
            }
            else if (matrix[y][x] == 7) {
                var god2 = new God2(x, y);
                god2Arr.push(god2);
                god2Hashiv++;
            }
        }
    }
}
creatingObjects();
var counter;
function game() {
    counter++
    if (counter > 0 && counter <= 10) {
        weather = 'spring'
    }
    else if (counter > 10 && counter <= 20) {
        weather = 'summer'
    }
    else if (counter > 20 && counter <= 30) {
        weather = 'autumn'
    }
    else if (counter > 30 && counter <= 40) {
        weather = 'winter'
    }
    else {
        counter = 0;
    }
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (witcherArr[0] !== undefined) {
        for (var i in witcherArr) {
            witcherArr[i].eat();
        }
    }
    if (knightArr[0] !== undefined) {
        for (var i in knightArr) {
            knightArr[i].eat();
        }
    }
    if (god1Arr[0] !== undefined) {
        for (var i in god1Arr) {
            god1Arr[i].eat();
        }
    }
    if (god2Arr[0] !== undefined) {
        for (var i in god2Arr) {
            god2Arr[i].eat();
        }
    }
    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter: predatorHashiv,
        witcherCounter: witcherHashiv,
        knightCounter: knightHashiv,
        god1Counter: god1Hashiv,
        god2Counter: god2Hashiv,
        weather: weather
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)