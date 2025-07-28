
document.addEventListener('DOMContentLoaded', () => {

    const gameArena = document.getElementsByClassName('gameArena');
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0; // score of game.
    let gameStarted = false;   // boolean flag  shows game status.

    let food = {x: 300, y:200};  // {x: 15*20, y:10*20} -> as the x = 10, and y = 12. [coordinate], but to convert into pixcel we multipy by 20(cellsize)
 
    // create snake as array of objects, to store the position.

    let snake = [{x:160, y:200}, {x:140, y:200}, {x:120, y:200}];  // [head, body, tail]. on x -> gap of 20 is take.

 
    function drawDiv(x, y, className){
        const divElement = document.createElement('div');
        divElement.classList.add(className);  //whatever class name you want to add in div you may add int it.
        
        // here we are getting top-left index of div =  food
        divElement.style.top = `${y}px`; 
        divElement.style.left = `${x}px`;

        return divElement;

    }

 
    function drawFoodAndSnake() {  
        gameArena.innerHTML = "";  // here everytime we are clearing the game arena page and redraw the page

        const foodElement = drawDiv(food.x, food.y, 'food'); // draw random position of food
        gameArena.appendChild(foodElement);

        // draw position of snake, with snakeElement, and using for-each because snake is array of objects.
        snake.forEach((snakeCell) => {
            const snakElement = drawDiv(snakeCell.x, snakeCell.y, 'snake');
            gameArena.appendChild(snakElement);
        })
    }


    function runGame(){
        if(!gameStarted){
            gameStarted = true; // mark the status to true
            //gameLoop();  // as the game is continuous proocess.
            drawFoodAndSnake();
        }
    }

    function initiateGame() {
        const scoreBoard = document.createElement('div');
        scoreBoard.id = 'score-board';

        document.body.insertBefore(scoreBoard, gameArena);  // scoreboard is added before gameArena.

        const startBtn = document.createElement('button');
        startBtn.textContent = "Start Game"
        startBtn.classList.add('start-game');

        startBtn.addEventListener('click', () => {
            startBtn.style.display = 'none';  // hide start button when the game has started,

            runGame();  // and call to rungame().
        })

        document.body.appendChild(startBtn);

    }
    
    initiateGame();

})