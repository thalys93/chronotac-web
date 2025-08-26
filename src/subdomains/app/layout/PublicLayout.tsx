import OptionsMenu from '@/components/OptionsMenu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { cn } from '@/lib/utils';

function PublicLayout({ children }: { children: ReactNode }) {
    const location = useLocation();
    const navigate = useNavigate();
    const isHistoryPage = location.pathname === '/history';
    const { connectionStatus } = useOnlineStatus();

    const handleGoBack = () => {
        navigate('/');
    };

    const getConnectionColor = () => {
        switch (connectionStatus) {
            case 'online':
                return {
                    bg: 'bg-green-400',
                    shadow: 'shadow-[0_0_10px_#4ade80,0_0_20px_#4ade80,0_0_30px_#4ade80]',
                    tooltipBg: 'bg-green-500/90',
                    tooltipShadow: 'shadow-[0_0_15px_#22c55e]',
                    tooltipBorder: 'border-t-green-500/90',
                    text: 'Online - Rápido'
                };
            case 'slow':
                return {
                    bg: 'bg-yellow-400',
                    shadow: 'shadow-[0_0_10px_#facc15,0_0_20px_#facc15,0_0_30px_#facc15]',
                    tooltipBg: 'bg-yellow-500/90',
                    tooltipShadow: 'shadow-[0_0_15px_#eab308]',
                    tooltipBorder: 'border-t-yellow-500/90',
                    text: 'Online - Lento'
                };
            case 'offline':
            default:
                return {
                    bg: 'bg-red-400',
                    shadow: 'shadow-[0_0_10px_#f87171,0_0_20px_#f87171,0_0_30px_#f87171]',
                    tooltipBg: 'bg-red-500/90',
                    tooltipShadow: 'shadow-[0_0_15px_#ef4444]',
                    tooltipBorder: 'border-t-red-500/90',
                    text: 'Offline'
                };
        }
    };

    const connectionColors = getConnectionColor();

    return (
        <div className="min-h-screen bg-gradient-bg relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />

            <header className="fixed top-0 left-0 right-0 z-20">
                <div className="flex flex-row items-center justify-between p-3 sm:p-4 lg:p-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                        {isHistoryPage && (
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
                        )}

                        <div className={cn("relative group my-7 mx-10", isHistoryPage && "mx-4")}>
                            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-500 ${connectionColors.bg} ${connectionColors.shadow}`} />

                            <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap ${connectionColors.tooltipBg} text-white ${connectionColors.tooltipShadow}`}>
                                {connectionColors.text}
                                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-transparent ${connectionColors.tooltipBorder}`} />
                            </div>
                        </div>
                    </div>

                    {/* Lado direito */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <OptionsMenu />
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full flex items-center justify-center min-h-screen pt-16 sm:pt-20 lg:pt-24 p-4">
                {children}
            </main>
        </div>
    );
}

export default PublicLayout;