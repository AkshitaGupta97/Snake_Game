
document.addEventListener('DOMContentLoaded', () => {

    const gameArena = document.querySelector('.gameArena');
  //   const arenaSize = 600;  instead of it i am doing
    const arenaSize = gameArena.offsetWidth;  // offsetWidth is property of js that tells how wide is html elements.
    const cellSize = 20;
    const rowsColOfCell = arenaSize / cellSize; // let arenaSize = 800 and cellsize = 20, then rowsColOfCell = 800/20.
    let score = 0; // score of game.
    let gameStarted = false;   // boolean flag  shows game status.

    let food = {x: 200, y:160};  // {x: 10*20, y:8*20} -> as the x = 10, and y = 8. [coordinate], but to convert into pixcel we multipy by 20(cellsize)
 
    // create snake as array of objects, to store the position.

    let snake = [{x:140, y:160}, {x:120, y:160}, {x:100, y:160}];  // [head, body, tail]. on x -> gap of 20 is take.

    let dx = cellSize; 
    let dy = 0;
    let intervalId;
    let gameSpeed = 200; // starting gameSpeed is 200.
    
    // Update snake 
    function updateSnake(){
        let newHead = {x : snake[0].x+dx, y : snake[0].y+dy}; // x -> snake[0]th object se x extract karo.
        snake.unshift(newHead); // Add new head to snake.  unshift() -> adds an element to starting of array

        // collision of snake and food
        if(newHead.x === food.x  && newHead.y === food.y){
            score += 1; // agar snake food ko collide karta hai toh score++ kardo.
            moveFood();  // when snake eats food call to moveFood() function to change its location.

            // to increase the difficulty we are increasing the game speed. 
            if(gameSpeed > 60){
                clearInterval(intervalId);
                gameSpeed -= 10;
                gameLoop();
            }
        }
        else {
            snake.pop();  // yaha pop() karna important hai because, agar snake food ko nehi khaa pata hai toh jo newHead add kia tha, 
            // jo ki extra element hai use pop() kardo.
        }
    }

    function moveFood(){
        // we are generating newx and newy, to create a random food location
        let newX, newY;

        // we are using do-while loop, because i need to check condition atleast once. 
        do{
            newX = Math.floor(Math.random()*rowsColOfCell) * cellSize;
            newY = Math.floor(Math.random()*rowsColOfCell) * cellSize;
        }while(snake.some(snakeCell => snakeCell.x === newX && snakeCell.y === newY)) // we are doing this because i don't want my food to appear in snake body.
        // .some() is used to check condition atLeast once.

        food = {x: newX, y: newY};
    }

    /*
        consider for dx and dy -> 
       * in case of right direction = {dx + cellsize, dy}, cells of "x" are increased in right direction = in x -> +cellsize, +ve
       * in case of left direction = {dx - cellsize, dy}, cells of "x" are decreased in left direction = in x -> -cellsize, -ve
       * in case of up direction = {dx, dy - cellsize}, cells of "y" are decreased in up direction = in y -> -cellSize, -ve
       * in case of down direction = {dx, dy + cellsize}, cells of "y" are increased in down direction = in y -> +cellsize , +ve
    */

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

    // check condition of game over

    // collision case of snake and wall .
    function isGameOver(){
        // if snake collide with the body parts , comapare head with other body part, so start loop with 1
        for(let i=1;i<snake.length;i++){
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
                return true;
            }
        }

        // if snake collid with the wall

        const hitLeftWall = snake[0].x < 0; // snake[0] = head jo ki left boundary ko touch kar chuka hai
        const hitRightWall = snake[0].x > arenaSize -cellSize; // -cellsize karna important hai because, snake boundary ke bahar naa jaee.
        const hitTopWall = snake[0].y < 0;
        const hitBottomWall = snake[0].y > arenaSize -cellSize;

        return hitBottomWall || hitLeftWall || hitRightWall || hitTopWall;
    }

    function gameLoop(){
        // use set time interval to continuously move the snake
        intervalId = setInterval(() => {
            // check condition if game is over 
            if(isGameOver()){
                clearInterval(intervalId);
                gameStarted = false;
              //  alert('Game Over');
                return;
            }
            drawFoodAndSnake();
            updateSnake();

        }, gameSpeed); // 200;  this is done to increase speed of game.
    }

    function runGame(){
        if(!gameStarted){
            gameStarted = true; // mark the status to true
            gameLoop();  // as the game is continuous process and hame continuously snake and food ko move karna hai.         
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