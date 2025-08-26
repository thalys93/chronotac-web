import { TicTacToe } from '@/components/TicTacToe';
import PublicLayout from '../../layout/PublicLayout';
import { useTicTacToe } from '@/hooks/useTicTacToe';
import { GameStatus } from '@/components/GameStatus';
import { useSaveGame } from '@/hooks/useGameApi';
import { gameStateToInput } from '@/lib/gameUtils';
import { useEffect } from 'react';

const HomePage = () => {
    const [gameState, makeMove, resetGame] = useTicTacToe();
    const saveGameMutation = useSaveGame();
        
    useEffect(() => {
        if (gameState.isGameOver && (gameState.winner || gameState.isDraw)) {
            const gameInput = gameStateToInput(gameState);
            saveGameMutation.mutate(gameInput);
        }
    }, [gameState.isGameOver, gameState.winner, gameState.isDraw]);

    return (
        <PublicLayout>
            <div className='flex flex-col gap-4 items-center justify-center'>
                <div className="text-center space-y-2">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 tracking-tight">
                        Chrono Tac
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-xs mx-auto">
                        Jogo da Velha - para dois jogadores
                    </p>
                    <GameStatus gameState={gameState} />
                </div>
                
                <TicTacToe 
                    gameState={gameState}
                    onSquareClick={makeMove}
                    onResetGame={resetGame}
                />
            </div>
        </PublicLayout>
    );
};

export default HomePage;