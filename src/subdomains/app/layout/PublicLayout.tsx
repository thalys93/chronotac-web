import OptionsMenu from '@/components/OptionsMenu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PublicLayout({ children }: { children: ReactNode }) {
    const location = useLocation();
    const navigate = useNavigate();
    const isHistoryPage = location.pathname === '/history';
    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-bg relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />

            <header className="fixed top-0 left-0 right-0 z-20">
                <div className="flex flex-row items-center justify-between p-3 sm:p-4 lg:p-6">
                    {isHistoryPage && (
                        <div className="flex justify-start">
                            <Button
                                onClick={handleGoBack}
                                variant="outline"
                                className="gap-2 hover:bg-accent transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
                                size="sm"
                            >
                                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden xs:inline">Voltar ao Jogo</span>
                                <span className="xs:hidden">Voltar</span>
                            </Button>
                        </div>
                    )}                                        
                    {!isHistoryPage && <div className="flex-1" />}                    
                    <OptionsMenu />
                </div>
            </header>
                        
            <main className="relative z-10 w-full flex items-center justify-center min-h-screen pt-16 sm:pt-20 lg:pt-24 p-4">
                {children}
            </main>
        </div>
    );
}

export default PublicLayout;