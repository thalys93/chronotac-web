import { memo } from 'react';
import { Player } from '@/hooks/useTicTacToe';
import { cn } from '@/lib/utils';

interface SquareProps {
  value: Player | null;
  onClick: () => void;
  disabled: boolean;
  isWinning: boolean;
}

export const Square = memo(({ value, onClick, disabled, isWinning }: SquareProps) => {
  return (
    <button
      className={cn(
        "aspect-square bg-game-cell border border-border/50 rounded-xl",
        "flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold",
        "transition-all duration-300 ease-out backdrop-blur-sm",
        "hover:bg-game-cell-hover hover:scale-[1.02] hover:shadow-glow",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
        "disabled:cursor-not-allowed active:scale-95",
        isWinning && "bg-gradient-winner animate-pulse-glow shadow-glow",
        !disabled && !value && "hover:border-primary/30",
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Square filled with ${value}` : "Empty square"}
    >
      {value && (
        <span
          className={cn(
            "animate-scale-in select-none drop-shadow-sm",
            value === 'X' && "text-game-x",
            value === 'O' && "text-game-o"
          )}
        >
          {value}
        </span>
      )}
    </button>
  );
});

Square.displayName = 'Square';