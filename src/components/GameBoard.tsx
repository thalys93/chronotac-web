import { memo } from 'react';
import { Square } from './Square';
import { GameState } from '@/hooks/useTicTacToe';
import { cn } from '@/lib/utils';

interface GameBoardProps {
  gameState: GameState;
  onSquareClick: (index: number) => void;
}

export const GameBoard = memo(({ gameState, onSquareClick }: GameBoardProps) => {
  const { board, isGameOver, winningLine } = gameState;

  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 p-4 sm:p-6 bg-game-board rounded-3xl",
        "shadow-game border border-border/30 backdrop-blur-sm",
        "animate-fade-in w-full max-w-sm mx-auto",
        "bg-gradient-secondary"
      )}
      role="grid"
      aria-label="Tic-tac-toe game board"
    >
      {board.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onSquareClick(index)}
          disabled={isGameOver || square !== null}
          isWinning={winningLine?.includes(index) ?? false}
        />
      ))}
    </div>
  );
});

GameBoard.displayName = 'GameBoard';