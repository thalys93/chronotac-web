import { memo } from 'react';
import { GameBoard } from './GameBoard';
import { GameStatus } from './GameStatus';
import { Button } from '@/components/ui/button';
import { useTicTacToe } from '@/hooks/useTicTacToe';
import { RotateCcw } from 'lucide-react';

export const TicTacToe = memo(() => {
  const [gameState, makeMove, resetGame] = useTicTacToe();

  return (
    <div className="w-full max-w-lg mx-auto space-y-6 sm:space-y-8 animate-fade-in">                  
      {/* <GameStatus gameState={gameState} />         */}
      <GameBoard gameState={gameState} onSquareClick={makeMove} />      
      <div className="text-center">
        <Button
          onClick={resetGame}
          variant="outline"
          size="lg"
          className="bg-gradient-accent text-accent-foreground border-accent/20 hover:bg-gradient-primary hover:border-primary/20 hover:scale-105 hover:shadow-glow transition-all duration-300 px-6 py-3 rounded-xl font-medium"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reiniciar Jogo
        </Button>
      </div>
      
      <div className="text-center text-xs sm:text-sm text-muted-foreground space-y-1 max-w-sm mx-auto">
        <p>Alternem colocando X e O no tabuleiro</p>
        <p>O primeiro a fazer 3 em linha vence!</p>
      </div>
    </div>
  );
});

TicTacToe.displayName = 'TicTacToe';