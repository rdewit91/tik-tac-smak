"use client";

import React, { Component } from "react";
import {
    MIN_PLAYER,
    MAX_PLAYER,
    checkScore,
    getBestMove,
    checkIfTilesLeft,
    BLANK,
    clearBoard,
    Board as GameBoard,
} from "../Engine";

type TileProps = {
    index: number;
    playerChar: string;
    board: GameBoard;
    parent: React.Component;
};

type TileState = {};

class Tile extends Component<TileProps, TileState> {
    constructor(props: TileProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const { playerChar } = this.props;
        return (
            <button id={this.props.index.toString()} onClick={this.handleClick}>
                {playerChar}
            </button>
        );
    }

    async handleClick() {
        const { index, board, parent } = this.props;

        const row = Math.floor(index / 3);
        const col = Math.floor(index % 3);

        if (board[row][col] !== BLANK) {
            alert("You can't place one there!");
            return;
        }

        board[row][col] = MIN_PLAYER;
        this.setState({});

        const bestMove = getBestMove(board);
        let score = 0;
        if (bestMove.row !== null && bestMove.col !== null) {
            board[bestMove.row][bestMove.col] = MAX_PLAYER;
            score = checkScore(board);
        }

        parent.setState({ board: board });
        switch (score) {
            case 10:
                alert(MAX_PLAYER + " wins!");
                await this.delay(750);
                clearBoard(board);
                parent.setState({ board: board });
                break;
            case -10:
                alert("You win!");
                await this.delay(750);
                clearBoard(board);
                parent.setState({ board: board });
                break;
            case 0:
                if (!checkIfTilesLeft(board)) alert("It's a tie.");
                break;
            default:
        }
    }

    delay = (ms: number) => new Promise(res => setTimeout(res, ms));
}

export default Tile;

// import React, { Component } from "react";
// import { MIN_PLAYER, MAX_PLAYER, checkScore, getBestMove, checkIfTilesLeft, BLANK, clearBoard } from "../Engine";

// class Tile extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//         }

//         this.handleClick = this.handleClick.bind(this);
//     }

//     render() {
//         const { playerChar } = this.props;
//         return (
//             <button id={this.index} onClick={this.handleClick}>
//                 {playerChar}
//             </button>
//         )
//     }

//     getPlayerChar() {
//         return this.playerChar;
//     }

//     async handleClick() {
//         const { index, board, parent } = this.props;

//         var row = Math.floor(index / 3);
//         var col = Math.floor(index % 3);

//         if (board[row][col] !== BLANK) {
//             alert("You can't place one there!")
//             return;
//         }

//         board[row][col] = MIN_PLAYER;
//         this.setState({});
//         this.playerChar = MIN_PLAYER;

//         var bestMove = getBestMove(board);
//         var score = 0;
//         if (bestMove.row !== null) {
//             board[bestMove.row][bestMove.col] = MAX_PLAYER;

//             score = checkScore(board);
//         }

//         parent.setState({ board: board });
//         switch (score) {
//             case 10:
//                 alert(MAX_PLAYER + " wins!");
//                 await this.delay(750);
//                 clearBoard(board);
//                 parent.setState({ board: board });
//                 break;
//             case -10:
//                 alert("You win!");
//                 await this.delay(750);
//                 clearBoard(board);
//                 parent.setState({ board: board });
//                 break;
//             case 0:
//                 if (!checkIfTilesLeft(board))
//                     alert("It's a tie.");
//                 break;
//             default:
//         }
//     }

//     delay = ms => new Promise(res => setTimeout(res, ms));
// }
// export default Tile;