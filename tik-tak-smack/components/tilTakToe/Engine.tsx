export const NUMBER_OF_ROWS = 3;
export const NUMBER_OF_COLS = 3;
export const MAX_PLAYER = 'X';
export const MIN_PLAYER = 'O';
export const BLANK = '-';

export type Board = string[][];

export function checkIfTilesLeft(board: Board): boolean {
    for (let row = 0; row < NUMBER_OF_ROWS; ++row) {
        for (let col = 0; col < NUMBER_OF_COLS; ++col) {
            if (board[row][col] === BLANK) {
                return true;
            }
        }
    }
    return false;
}

export function checkScore(board: Board): number {
    // Check the rows
    for (let row = 0; row < NUMBER_OF_ROWS; ++row) {
        if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            if (board[row][0] === MAX_PLAYER) {
                return 10;
            } else if (board[row][0] === MIN_PLAYER) {
                return -10;
            }
        }
    }

    // Check the columns
    for (let col = 0; col < NUMBER_OF_COLS; ++col) {
        if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            if (board[0][col] === MAX_PLAYER) {
                return 10;
            } else if (board[0][col] === MIN_PLAYER) {
                return -10;
            }
        }
    }

    // Check the diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        if (board[0][0] === MAX_PLAYER) {
            return 10;
        } else if (board[0][0] === MIN_PLAYER) {
            return -10;
        }
    }

    if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
        if (board[2][0] === MAX_PLAYER) {
            return 10;
        } else if (board[2][0] === MIN_PLAYER) {
            return -10;
        }
    }

    return 0;
}

export type Move = {
    row: number | null;
    col: number | null;
};

export function getBestMove(board: Board): Move {
    let bestValue = -Infinity;
    let bestMove: Move = { row: null, col: null };

    for (let row = 0; row < NUMBER_OF_ROWS; ++row) {
        for (let col = 0; col < NUMBER_OF_COLS; ++col) {
            if (board[row][col] === BLANK) {
                board[row][col] = MAX_PLAYER;
                let moveValue = minimax(board, 0, false);
                board[row][col] = BLANK;

                if (moveValue > bestValue) {
                    bestMove = { row, col };
                    bestValue = moveValue;
                }
            }
        }
    }
    return bestMove;
}

export function minimax(board: Board, depth: number, isMax: boolean): number {
    const score = checkScore(board);

    if (score === 10 || score === -10) {
        return score;
    }

    if (!checkIfTilesLeft(board)) {
        return 0;
    }

    if (isMax) {
        let bestValue = -Infinity;
        for (let row = 0; row < NUMBER_OF_ROWS; ++row) {
            for (let col = 0; col < NUMBER_OF_COLS; ++col) {
                if (board[row][col] === BLANK) {
                    board[row][col] = MAX_PLAYER;
                    bestValue = Math.max(bestValue, minimax(board, depth + 1, !isMax));
                    board[row][col] = BLANK;
                }
            }
        }
        return bestValue;
    } else {
        let bestValue = Infinity;
        for (let row = 0; row < NUMBER_OF_ROWS; ++row) {
            for (let col = 0; col < NUMBER_OF_COLS; ++col) {
                if (board[row][col] === BLANK) {
                    board[row][col] = MIN_PLAYER;
                    bestValue = Math.min(bestValue, minimax(board, depth + 1, !isMax));
                    board[row][col] = BLANK;
                }
            }
        }
        return bestValue;
    }
}

export function createBoard(): Board {
    let board: Board = [];
    for (let row = 0; row < NUMBER_OF_ROWS; ++row) {
        board[row] = [];
        for (let col = 0; col < NUMBER_OF_COLS; ++col) {
            board[row][col] = BLANK;
        }
    }
    return board;
}

export function clearBoard(board: Board): void {
    for (let row = 0; row < NUMBER_OF_ROWS; ++row) {
        for (let col = 0; col < NUMBER_OF_COLS; ++col) {
            board[row][col] = BLANK;
        }
    }
}

// export const NUMBER_OF_ROWS = 3;
// export const NUMBER_OF_COLS = 3;
// export const MAX_PLAYER = 'X';
// export const MIN_PLAYER = 'O';
// export const BLANK = '-';

// export function checkIfTilesLeft(board) {
//     for (var row = 0; row < NUMBER_OF_ROWS; ++row) {
//         for (var col = 0; col < NUMBER_OF_COLS; ++col) {
//             if (board[row][col] === BLANK) {
//                 return true;
//             }
//         }
//     }

//     return false;
// }

// export function checkScore(board) {
//     //Check the rows
//     for (var row = 0; row < NUMBER_OF_ROWS; ++row) {
//         for (var col = 0; col < NUMBER_OF_COLS; ++col) {
//             if (board[row][0] === board[row][1] &&
//                 board[row][1] === board[row][2]) {
//                 if (board[row][0] === MAX_PLAYER) {
//                     return 10;
//                 } else if (board[row][0] === MIN_PLAYER) {
//                     return -10;
//                 }
//             }
//         }
//     }

//     //Check the columns
//     for (var row = 0; row < NUMBER_OF_ROWS; ++row) {
//         for (var col = 0; col < NUMBER_OF_COLS; ++col) {
//             if (board[0][col] === board[1][col] &&
//                 board[1][col] === board[2][col]) {
//                 if (board[0][col] === MAX_PLAYER) {
//                     return 10;
//                 } else if (board[0][col] === MIN_PLAYER) {
//                     return -10;
//                 }
//             }
//         }
//     }

//     /*
//     _____________
//     |0,0|   |0,2|
//     |   |1,1|   |
//     |2,0|   |2,2|
//     */
//     //check the diagonals
//     for (var row = 0; row < NUMBER_OF_ROWS; ++row) {
//         for (var col = 0; col < NUMBER_OF_COLS; ++col) {
//             var leftDiagonal = (board[0][0] === board[1][1] && board[1][1] === board[2][2]);

//             if (leftDiagonal) {
//                 if (board[0][0] === MAX_PLAYER) {
//                     return 10;
//                 } else if (board[0][0] === MIN_PLAYER) {
//                     return -10;
//                 }
//             }
//         }
//     }

//     for (var row = 0; row < NUMBER_OF_ROWS; ++row) {
//         for (var col = 0; col < NUMBER_OF_COLS; ++col) {
//             var rightDiagonal = (board[2][0] === board[1][1] && board[1][1] === board[0][2]);
//             if (rightDiagonal) {
//                 if (board[2][0] === MAX_PLAYER) {
//                     return 10;
//                 } else if (board[2][0] === MIN_PLAYER) {
//                     return -10;
//                 }
//             }
//         }
//     }

//     return 0;

// }

// export function getBestMove(board) {
//     //Assume that the player is the maximising player
//     //Best value is a small number
//     var bestValue = -1000;

//     var bestMove = {
//         "row": null,
//         "col": null
//     };

//     // Go through the board and calculate the best move
//     for (var row = 0; row < NUMBER_OF_ROWS; ++row) {
//         for (var col = 0; col < NUMBER_OF_COLS; ++col) {
//             if (board[row][col] === BLANK) {
//                 board[row][col] = MAX_PLAYER;

//                 var move = minimax(board, 0, false);

//                 //Make it blank after calculation
//                 board[row][col] = BLANK;

//                 if (move > bestValue) {
//                     bestMove.row = row;
//                     bestMove.col = col;
//                     bestValue = move;
//                 }
//             }
//         }
//     }

//     return bestMove;
// }

// export function minimax(board, depth, isMax) {
//     var score = checkScore(board);

//     //Check if the player has won. If th score is 10 the Max Player has won. 
//     if (score === 10 || score === -10) {
//         return score;
//     }

//     //Check if it is a tie. If it is then return 0 to indicate that they haven't.
//     if (!checkIfTilesLeft(board)) {
//         return 0;
//     }

//     if (isMax) {
//         //Best Value is intialised as a small number. So that any move will be better.
//         var bestValue = -Infinity;

//         //Go thtough the entire board. And calculate the the best move.
//         for (var row = 0; row < NUMBER_OF_ROWS; ++row) {
//             for (var col = 0; col < NUMBER_OF_COLS; ++col) {
//                 if (board[row][col] === BLANK) {
//                     board[row][col] = MAX_PLAYER;

//                     var value = minimax(board, depth + 1, !isMax);
//                     bestValue = Math.max(bestValue, value);

//                     board[row][col] = BLANK;
//                 }
//             }
//         }

//         return bestValue;
//     } else {
//         // This is for the minmising players
//         var bestValue = +Infinity;
//         for (var row = 0; row < NUMBER_OF_ROWS; ++row) {
//             for (var col = 0; col < NUMBER_OF_COLS; ++col) {
//                 if (board[row][col] === BLANK) {
//                     board[row][col] = MIN_PLAYER;

//                     var value = minimax(board, depth + 1, !isMax);
//                     bestValue = Math.min(bestValue, value);
//                     board[row][col] = BLANK;
//                 }
//             }
//         }
//         return bestValue;
//     }
// }

// //Creates a 2D array representing the board.
// export function createBoard() {
//     var board = new Array(2);

//     for (var row = 0; row < NUMBER_OF_ROWS; ++row) {
//         board[row] = new Array(2);
//         for (var col = 0; col < NUMBER_OF_COLS; ++col) {
//             board[row][col] = BLANK;
//         }
//     }

//     return board;
// }

// export function clearBoard(board) {
//     for (var row = 0; row < NUMBER_OF_ROWS; ++row) {
//         for (var col = 0; col < NUMBER_OF_COLS; ++col) {
//             board[row][col] = BLANK;
//         }
//     }
// }
