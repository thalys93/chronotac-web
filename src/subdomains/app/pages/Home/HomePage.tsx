import { TicTacToe } from '@/components/TicTacToe';
import PublicLayout from '../../layout/PublicLayout';
import { useTicTacToe } from '@/hooks/useTicTacToe';
import { GameStatus } from '@/components/GameStatus';
import { GameBoard } from '@/components/GameBoard';

const HomePage = () => {
    const [gameState] = useTicTacToe();
    return (
        <PublicLayout>
            <div className='flex flex-col gap-2 items-center justify-center'>
                <div className="text-center space-y-2">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 tracking-tight">
                        Chrono Tac
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-xs mx-auto">
                        Jogo da Velha - para dois jogadores
                    </p>
                    <GameStatus gameState={gameState} />                    
                </div>
                <TicTacToe />
            </div>
        </PublicLayout>
    );
};

export default HomePage;