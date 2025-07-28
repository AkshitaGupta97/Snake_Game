
document.addEventListener('DOMContentLoaded', () => {

    const gameArena = document.querySelector('.gameArena');
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0; // score of game.
    let gameStarted = false;   // boolean flag  shows game status.

    let food = {x: 200, y:160};  // {x: 10*20, y:8*20} -> as the x = 10, and y = 8. [coordinate], but to convert into pixcel we multipy by 20(cellsize)
 
    // create snake as array of objects, to store the position.

    let snake = [{x:140, y:160}, {x:120, y:160}, {x:100, y:160}];  // [head, body, tail]. on x -> gap of 20 is take.
    
    /*
        consider for dx and dy -> 
       * in case of right direction = {dx + cellsize, dy}, cells of "x" are increased in right direction = in x -> +cellsize, +ve
       * in case of left direction = {dx - cellsize, dy}, cells of "x" are decreased in left direction = in x -> -cellsize, -ve
       * in case of up direction = {dx, dy - cellsize}, cells of "y" are decreased in up direction = in y -> -cellSize, -ve
       * in case of down direction = {dx, dy + cellsize}, cells of "y" are increased in down direction = in y -> +cellsize , +ve
    */

    let dx = cellSize; 
    let dy = 0;

    // here "key/code" is name of key when we do keydown see in console.
    function changeDirection(event){
      //  console.log("key pressed", event);

      //just do (or no need) a check when we go in any direction  no need to press the key again and again. 

      /* also check if goingDown the can't press ArrowUp
        if goingUp the can't press ArrowDown
        if goingLeft the can't press ArrowRight
        if goingRight the can't press ArrowLeft
      */


      const isGoingDown = dy === cellSize;
      const isGoingUp = dy === -cellSize;
      const isGoingLeft = dx === -cellSize;
      const isGoingRight = dx === cellSize;

      if(event.key === 'ArrowUp' && !isGoingDown){
        dx = 0;
        dy = -cellSize;
      }
      else if(event.key === 'ArrowDown' && !isGoingUp){
        dx = 0;
        dy = cellSize;
      }
      else if(event.key === 'ArrowLeft' && !isGoingRight){
        dx = -cellSize;
        dy = 0;
      }
      else if(event.key === 'ArrowRight' && !isGoingLeft) { 
        dx = cellSize;
        dy = 0;
      }
      
        
    }


    function drawDiv(x, y, className){
        const divElement = document.createElement('div');
        divElement.classList.add(className);  //whatever class name you want to add in div you may add int it.
        
        // here we are getting top-left index of div =  food and snake
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
            // when key is pressed the direction is changed.
            document.addEventListener('keydown', changeDirection);
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