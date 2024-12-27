function Gameboard(){
    const rows = 3;
    const columns = 3;
    const board = [];
    let totalMovements = 0
    let lastMovement = [-1,-1];

    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const addFigure = (row, column, player) => {
        if(!(board[row][column].getValue() === 0)){
            return false;
        }

        board[row][column].paint(player);
        totalMovements++;
        lastMovement = [row, column];
        return true;
    }

    const printBoard = () => {
        const boardWithCellValues = 
        board.map((row) => 
            row.map((cell) => 
                cell.getValue()
                    )
                );
        
        return boardWithCellValues;
    }

    const checkWinner = () => {
        const lastModifiedRow = lastMovement[0];
        const lastModifiedColumn = lastMovement[1];
        console.log(lastMovement)
        
        // Check Row
        if (
            board[lastModifiedRow][0].getValue() === board[lastModifiedRow][1].getValue() && board[lastModifiedRow][1].getValue() === board[lastModifiedRow][2].getValue()
        ) return true

        // Check Column
        if (
            board[0][lastModifiedColumn].getValue() === board[1][lastModifiedColumn].getValue() && board[1][lastModifiedColumn].getValue() === board[2][lastModifiedColumn].getValue()
        ) return true

        //Check Diagonals
        if (lastModifiedRow === lastModifiedColumn || lastModifiedRow % 2 === 0 && lastModifiedColumn % 2 === 0){
            console.log('Checking')
            if(board[1][1].getValue() === 0 ) return false

            if(
                board[0][0].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][2].getValue()
            ) return true

            if(board[0][2].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][0].getValue()) return true
        }
        return false
    }

    const resetBoard = () => {
        board.map((row) => row.map((cell) => cell.resetValue()))
        totalMovements = 0;
    };

    const getTotalMovements = () => totalMovements;

    return { getBoard, addFigure, checkWinner, printBoard, resetBoard, getTotalMovements };
}

function Cell(){
    let value = 0;

    const paint = (player) => {
        value = player.symbol;
    };

    const getValue = () => value;

    const resetValue = () => value = 0;

    return{
        paint, 
        getValue,
        resetValue
    };
}

function GameController(playerOneName, playerTwoName){
    const board = Gameboard();
    let gameCompleted = false;

    const players = [
        {
            name: playerOneName,
            symbol: 'X'
        },
        {
            name: playerTwoName,
            symbol: 'O'
        }
    ];

    const p1 = document.querySelector('#Player1');
    const p2 = document.querySelector('#Player2');
    
    const addNamesToView = () => {
        p1.textContent = p1.textContent + ` ${players[0].name}`;
        p2.textContent = p2.textContent + ` ${players[1].name}`;
    }

    addNamesToView();

    let activePlayer = players[0];
    p1.classList.add('selected');

    const switchPlayerTurn = () => {
        if (activePlayer === players[0]){
            activePlayer = players[1];
            p1.classList.remove('selected');
            p2.classList.add('selected');
        }else{
            activePlayer = players[0];
            p2.classList.remove('selected');
            p1.classList.add('selected');
        }
    };

    const getActivePlayer = () => activePlayer;

    const printBoardStatus = () => {
        visualController(board.printBoard().reduce((accumulator, current) => accumulator.concat(current), []));
    }

    const playRound = (row, column) => {
        
        if(gameCompleted) return;

        console.log(
            `${activePlayer.name} selecting row ${row} and column ${column}...`
        );
        if(!board.addFigure(row, column, activePlayer)) return;

        printBoardStatus();
        const gameFinished = board.checkWinner();
        const movementsMade = board.getTotalMovements();
        if (gameFinished || movementsMade === 9){
            if(gameFinished){
                gameCompleted = true;
                console.log(`${getActivePlayer().name} won!`)
                const notif = document.createElement('div');
                notif.className = 'notif';
                notif.textContent = `${getActivePlayer().name} won!`;
                document.querySelector('.container').appendChild(notif);
            }else{
                console.log("It's a draw!")
            }
            return
        }
        switchPlayerTurn();
        console.log(`${getActivePlayer().name}'s turn.`)
    };

    const resetGame = () => {
        board.resetBoard();
        gameCompleted = false;
        activePlayer = players[0];
        printBoardStatus();
        console.log(`${getActivePlayer().name}'s turn.`)
        const notif = document.querySelector('.notif');
        if(notif !== undefined){
            document.querySelector('.container').removeChild(notif);
        }
    }

    const visualController = (boardCells) => {
        const cellsNodes = document.getElementsByClassName('cell');
        const cells = Array.from(cellsNodes);
        cells.map((e, index) => {
            e.textContent = boardCells[index] === 0 ? '' : boardCells[index]
            if(e.textContent === 'X'){
                cellsNodes[index].classList.add('x-move')
            }else if(e.textContent === 'O'){
                cellsNodes[index].classList.add('o-move')
            }
        });
    };

    printBoardStatus();
    console.log(`${getActivePlayer().name}'s turn.`)

    return{
        playRound,
        resetGame,
        getActivePlayer
    }
}

function startGame(playerOneName = 'Player One', playerTwoName = 'Player Two'){
    const game = GameController(playerOneName, playerTwoName);
    const cellsNodes = document.getElementsByClassName('cell');
    const cells = Array.from(cellsNodes);
    cells.map((e, index) => {
        const row = Math.floor(index / 3);
        const column = index % 3;
        e.addEventListener('click', () => {
            game.playRound(row, column);
            
        })
    });

    const resetGame = () => {
        game.resetGame();
    };

    return {
        resetGame
    }
};

const newGame = startGame();




