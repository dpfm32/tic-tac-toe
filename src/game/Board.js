import React from 'react';
import Square from "./Square";

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            turn: this.props.turn,
            winner: null,
            drawn: false
        }
    }

    resetGame() {
        this.setState({squares: Array(9).fill(null)});
        this.setState({turn: 'X'});
        this.setState({winner: null});
        this.setState({drawn: false});
    }

    render() {
        let message = <div>Turn: <strong>{this.props.players[this.state.turn]} ({this.state.turn})</strong></div>;
        if (this.gameEnded()) {
            if (this.state.winner !== null) {
                let winner = this.props.players[this.state.winner];
                message = <div>The Winner is: <strong>{winner} ({this.state.winner})</strong><br/>
                    <button onClick={() => this.resetGame()}>Reset</button>
                </div>;
            } else {
                message = <div><strong>Draw!</strong><br/><button onClick={() => this.resetGame()}>Reset</button></div>;
            }
        }
        let board =
            <div id='board'>
                {message}
                <br/><br/>
                <table>
                    <tbody>
                    <tr>
                        <td>{this.makeSquare(0)}</td>
                        <td className="vert">{this.makeSquare(1)}</td>
                        <td>{this.makeSquare(2)}</td>
                    </tr>
                    <tr>
                        <td className="hori">{this.makeSquare(3)}</td>
                        <td className="vert hori">{this.makeSquare(4)}</td>
                        <td className="hori">{this.makeSquare(5)}</td>
                    </tr>
                    <tr>
                        <td>{this.makeSquare(6)}</td>
                        <td className="vert">{this.makeSquare(7)}</td>
                        <td>{this.makeSquare(8)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>;

        return board;
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    setWinner(winner) {
        this.state.winner = winner;
    }

    gameEnded() {
        return this.state.winner !== null || this.state.drawn === true;
    }

    gameDrawn() {
        this.state.drawn = true;
    }

    handleClick(i) {
        if (!this.gameEnded()) {
            let squares = this.state.squares;
            squares[i] = this.state.turn;
            this.setState({squares: squares});

            if (this.hasWinner() === null) {
                if (this.state.squares.indexOf(null) === -1) {
                    return this.gameDrawn();
                }
                this.setNextPlayer();
            } else {
                this.setWinner(this.hasWinner());
            }
        }
    }

    hasWinner() {
        return this.calculateWinner(this.state.squares);
    }

    setNextPlayer() {
        let turn = this.state.turn;
        if (turn === 'X')
            turn = 'O';
        else
            turn = 'X';
        this.setState({turn: turn})
    }

    makeSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />
    }
}

export default Board;
