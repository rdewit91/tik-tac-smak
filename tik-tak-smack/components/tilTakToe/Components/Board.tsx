"use client";

import React, { Component } from "react";
import Tile from "./Tile";
import { clearBoard, Board as GameBoard } from "../Engine";

type BoardProps = {
    board: GameBoard;
    className?: string; // Add className to the BoardProps type
};

type BoardState = {
    board: GameBoard;
};

class Board extends Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);

        this.state = {
            board: this.props.board,
        };

        this.restart = this.restart.bind(this);
    }

    render() {
        const { className } = this.props;
        return (
            <div className={`content ${className}`}>
                <div>
                    <div className={"row"}>
                        <Tile index={0} playerChar={this.state.board[0][0]} board={this.state.board} parent={this} />
                        <Tile index={1} playerChar={this.state.board[0][1]} board={this.state.board} parent={this} />
                        <Tile index={2} playerChar={this.state.board[0][2]} board={this.state.board} parent={this} />
                    </div>
                    <div className={"row"}>
                        <Tile index={3} playerChar={this.state.board[1][0]} board={this.state.board} parent={this} />
                        <Tile index={4} playerChar={this.state.board[1][1]} board={this.state.board} parent={this} />
                        <Tile index={5} playerChar={this.state.board[1][2]} board={this.state.board} parent={this} />
                    </div>
                    <div className={"row"}>
                        <Tile index={6} playerChar={this.state.board[2][0]} board={this.state.board} parent={this} />
                        <Tile index={7} playerChar={this.state.board[2][1]} board={this.state.board} parent={this} />
                        <Tile index={8} playerChar={this.state.board[2][2]} board={this.state.board} parent={this} />
                    </div>
                </div>
                <br />
                <button className={"restart"} onClick={this.restart}>Restart</button>
            </div>
        );
    }

    restart() {
        clearBoard(this.state.board);
        this.setState({ board: this.state.board });
    }
}

export default Board;

// import React, { Component } from "react";
// import Tile from "./Tile";
// import {clearBoard} from "../Engine";

// class Board extends Component {
//     constructor(props) {
//         super(props);


//         const { board } = this.props;
//         this.state = {
//             board: board
//         }

//         this.restart = this.restart.bind(this);
//     }

//     render() {
//         return (
//             <div className="content">
//                 <div>
//                     <div className={"row"}>
//                         <Tile index={0} playerChar={this.state.board[0][0]} board={this.state.board} parent={this} />
//                         <Tile index={1} playerChar={this.state.board[0][1]} board={this.state.board} parent={this} />
//                         <Tile index={2} playerChar={this.state.board[0][2]} board={this.state.board} parent={this} />
//                     </div>
//                     <div className={"row"}>
//                         <Tile index={3} playerChar={this.state.board[1][0]} board={this.state.board} parent={this} />
//                         <Tile index={4} playerChar={this.state.board[1][1]} board={this.state.board} parent={this} />
//                         <Tile index={5} playerChar={this.state.board[1][2]} board={this.state.board} parent={this} />
//                     </div>
//                     <div className={"row"}>
//                         <Tile index={6} playerChar={this.state.board[2][0]} board={this.state.board} parent={this} />
//                         <Tile index={7} playerChar={this.state.board[2][1]} board={this.state.board} parent={this} />
//                         <Tile index={8} playerChar={this.state.board[2][2]} board={this.state.board} parent={this} />
//                     </div>
//                 </div>
//                 <br />
//                 <button className={"restart"} onClick={this.restart}>Restart</button>
//             </div>
//         );
//     }

//     restart() {
//         clearBoard(this.state.board);
//         this.setState({board : this.state.board});
//     }
// }

// export default Board;
