
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 15;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let witcherCountElement = document.getElementById('witcherCount');
    let knightCountElement = document.getElementById('knightCount');
    let god1CountElement = document.getElementById('god1Count');
    let god2CountElement = document.getElementById('god2Count');
    let weatherElement = document.getElementById('weather');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        witcherCountElement.innerText = data.witcherCounter;
        knightCountElement.innerText = data.knightCounter;
        god1CountElement.innerText = data.god1Counter;
        god2CountElement.innerText = data.god2Counter;
        weather = data.weather;
        weather.innerText = data.weather;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if(weather == 'spring'|| weather == 'summer'){
                        fill("green");
                    }
                    else if(weather == 'autumn'|| weather == 'winter'){
                        fill("lightgreen")
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2){
                    if(weather == 'spring'){
                        fill("orange");
                    }
                    else if(weather == 'summer'){
                        fill("#eda13e")
                    }
                    else if(weather == 'autumn'){
                        fill("#eb8909")
                    }
                    else if(weather == 'winter'){
                        fill("#c47610")
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    if(weather == 'spring'){
                        fill("red");
                    }
                    else if(weather == 'summer'){
                        fill("#f70a0a")
                    }
                    else if(weather == 'autumn'){
                        fill("#f70a0a")
                    }
                    else if(weather == 'winter'){
                        fill("#ad0a0a")
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    if(weather == 'spring'){
                        fill("#2e2d2d");
                    }
                    else if(weather == 'summer'){
                        fill("black")
                    }
                    else if(weather == 'autumn'){
                        fill("#383030")
                    }
                    else if(weather == 'winter'){
                        fill("#473f3f")
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    if(weather == 'spring'){
                        fill("#d1c5c5");
                    }
                    else if(weather == 'summer'){
                        fill("white")
                    }
                    else if(weather == 'autumn'){
                        fill("#b5b0b0")
                    }
                    else if(weather == 'winter'){
                        fill("#9e9696")
                    }
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 6) {
                    fill("blue")
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 7) {
                    fill("purple")
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}