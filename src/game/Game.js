import React from 'react';
import Board from "./Board";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
        };
        this.addPlayer('Robert');
        this.addPlayer('Emma');
    }

    addPlayer(name) {
        const players = this.state.players;

        if ('X' in players && 'O' in players)
            return false;

        if ('O' in players)
            players['X'] = name;
        else
            players['O'] = name;

        this.state = {players: players};
    }

    render() {
        return <main>
            <Board
                players={this.state.players}
                squares={this.state.squares}
                turn='X'/>
        </main>
    }
}

export default Game;
