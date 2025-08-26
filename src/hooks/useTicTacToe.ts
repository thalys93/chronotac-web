import { useState, useCallback } from 'react';

export type Player = 'X' | 'O';
export type Square = Player | null;
export type Board = Square[];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  isGameOver: boolean;
  winningLine: number[] | null;
}

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(board: Board): { winner: Player | null; winningLine: number[] | null } {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, winningLine: line };
    }
  }
  return { winner: null, winningLine: null };
}

function isDraw(board: Board): boolean {
  return board.every(square => square !== null);
}

export function useTicTacToe(): [GameState, (squareIndex: number) => void, () => void] {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');

  const { winner, winningLine } = calculateWinner(board);
  const isDrawGame = isDraw(board);
  const isGameOver = winner !== null || isDrawGame;

  const gameState: GameState = {
    board,
    currentPlayer,
    winner,
    isDraw: isDrawGame && !winner,
    isGameOver,
    winningLine,
  };

  const makeMove = useCallback((squareIndex: number) => {
    if (board[squareIndex] || isGameOver) {
      return;
    }

    const newBoard = [...board];
    newBoard[squareIndex] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }, [board, currentPlayer, isGameOver]);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
  }, []);

  return [gameState, makeMove, resetGame];
}