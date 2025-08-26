import { memo } from 'react';
import { GameState } from '@/hooks/useTicTacToe';
import { cn } from '@/lib/utils';

interface GameStatusProps {
  gameState: GameState;
}

export const GameStatus = memo(({ gameState }: GameStatusProps) => {
  const { currentPlayer, winner, isDraw, isGameOver } = gameState;

  let message: string;
  let messageClass: string;

  if (winner) {
    message = `🎉 Jogador ${winner} ganhou!`;
    messageClass = "text-game-winner bg-gradient-winner bg-clip-text text-transparent animate-pulse-glow";
  } else if (isDraw) {
    message = "🤝 Empate!";
    messageClass = "text-accent";
  } else {
    message = `Vez do Jogador ${currentPlayer}'s`;
    messageClass = currentPlayer === 'X' ? "text-game-x" : "text-game-o";
  }

  return (
    <div className="text-center animate-fade-in px-4">
      <h2
        className={cn(
          "text-xl sm:text-2xl md:text-3xl font-bold mb-3 transition-all duration-500",
          "tracking-tight leading-tight",
          messageClass
        )}
        role="status"
        aria-live="polite"
      >
        {message}
      </h2>
      {!isGameOver && (
        <p className="text-muted-foreground text-sm md:text-base max-w-xs mx-auto">
          Toque em qualquer quadrado vazio para fazer sua jogada
        </p>
      )}
    </div>
  );
});

GameStatus.displayName = 'GameStatus';