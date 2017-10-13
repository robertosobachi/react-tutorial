import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };

    this._squares = [];
    this._current = [];
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
      if (squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick(i) {
    this._history = this.state.history.slice(0, this.state.stepNumber + 1);
    this._current = this._history[this._history.length - 1];
    this._squares = this._current.squares.slice();
    if (this.calculateWinner(this._squares) || this._squares[i]) {
      return;
    }
    this._squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: this._history.concat([{
        squares: this._squares
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: this._history.length,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    this._history = this.state.history;
    this._current = this._history[this.state.stepNumber];
    this._winner = this.calculateWinner(this._squares);

    const moves = this._history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (this._winner) {
      status = 'Winner: ' + this._winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this._squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
