import { GameHistory } from '@/components/GameHistory';
import PublicLayout from '../../layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
    const navigate = useNavigate(); 

    return (
        <PublicLayout>            
            <div className="w-full max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in py-4 sm:py-6">
                <div className="text-center space-y-4 px-4">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <History className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent tracking-tight">
                            Histórico de Jogos
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                        Veja todos os seus jogos anteriores e acompanhe seu desempenho no Chrono Tac.
                    </p>
                </div>                          
                
                <div className="w-full px-2 sm:px-4">
                    <GameHistory />
                </div>
            </div>
        </PublicLayout>
    );
};

export default HistoryPage;