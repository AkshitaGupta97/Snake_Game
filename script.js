
document.addEventListener('DOMContentLoaded', () => {

    const gameArena = document.getElementsByClassName('gameArena');
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0; // score of game.
    let gameStarted = false;   // boolean flag  shows game status.

    let food = {x: 300, y:200};  // {x: 15*20, y:10*20} -> as the x = 10, and y = 12. [coordinate], but to convert into pixcel we multipy by 20(cellsize)
 
    // create snake as array of objects, to store the position.

    let snake = [{x:160, y:200}, {x:140, y:200}, {x:120, y:200}];  // [head, body, tail]. on x -> gap of 20 is take.

    



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