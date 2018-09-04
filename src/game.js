import React from 'react';
import Board from './board.js';
import calculateWinner from './helpers/calculateWinner.js';


class Game extends React.Component {

	constructor() {
		super();
		this.state = {
			xIsNext: true,
			stepNumber: 0,
			history: [{
				squares: Array(9).fill(null)
			}]
		}
	}

	handleClick(i) {
		const {xIsNext, history} = this.state;
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if(calculateWinner(squares) || squares[i]) {
			return;
		}

		squares[i] = xIsNext ? 'X' : 'O';

		this.setState({
			xIsNext: !xIsNext,
			history: history.concat([{squares}]),
			stepNumber: ++this.state.stepNumber
		});
	}

	render() {
	const {xIsNext, stepNumber, history} = this.state;
	const current = history[stepNumber];
	const winner = calculateWinner(current.squares)
	let status;

	if(winner) {
		status = 'Winner is ' + winner;
	} else {
		status = 'Next player is ' + (xIsNext ? 'X' : '0');
	}
	

		return (
				<div className='game'>
					<div className='game-board'>
						<Board
							squares = {current.squares}
							onClick = {(i) => this.handleClick(i)}
						/>
					</div>
					<div className='game-info'>
						<div>{status}</div>
						<ul>{/*history*/}</ul>
					</div>
				</div>
			)
	}
}

export default Game;