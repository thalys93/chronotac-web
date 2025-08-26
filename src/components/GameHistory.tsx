import { useGames } from '@/hooks/useGameApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Trophy, Users, Calendar, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export function GameHistory() {
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useGames(page, 8);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="text-lg">Carregando histórico...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <Card className="border-destructive/50 bg-destructive/5">
                <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                        <p className="text-destructive font-medium">Erro ao carregar histórico</p>
                        <p className="text-sm text-muted-foreground">Tente novamente mais tarde</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!data?.games.length) {
        return (
            <Card className="border-dashed">
                <CardContent className="pt-6">
                    <div className="text-center space-y-4 py-8">
                        <Trophy className="h-12 w-12 mx-auto text-muted-foreground/50" />
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-muted-foreground">Nenhum jogo encontrado</h3>
                            <p className="text-sm text-muted-foreground">Comece jogando para ver seu histórico aqui!</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const getResultBadge = (game: any) => {
        if (game.isDraw) {
            return (
                <Badge variant="secondary" className="gap-1 shrink-0 text-xs sm:text-sm">
                    <Users className="h-3 w-3" />
                    Empate
                </Badge>
            );
        }
        if (game.winner) {
            return (
                <Badge variant="default" className="gap-1 shrink-0 text-xs sm:text-sm whitespace-nowrap">
                    <Trophy className="h-3 w-3" />
                    Vencedor: {game.winner}
                </Badge>
            );
        }
        return <Badge variant="outline" className="shrink-0 text-xs sm:text-sm">Em andamento</Badge>;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">            
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
                {data.games.map((game) => (
                    <Card key={game.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border/50 bg-card/50 backdrop-blur-sm ">
                        <CardHeader className="pb-4 px-6 sm:px-8">
                            <div className="flex flex-row justify-between  items-center gap-3">
                                <CardTitle className="text-lg sm:text-xl font-bold text-primary">
                                    Jogo #{game.id}
                                </CardTitle>
                                <div className="flex justify-center">
                                    {getResultBadge(game)}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 px-6 sm:px-8">                            
                            <div className="grid grid-cols-3 gap-2 w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 mx-auto">
                                {game.board.flat().map((cell, index) => (
                                    <div
                                        key={index}
                                        className="bg-muted select-none hover:bg-muted/70 hover:border-primary transition-all hover:scale-105 rounded-md flex items-center justify-center text-lg sm:text-xl lg:text-2xl font-bold border border-border/20"
                                    >
                                        {cell}
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 text-sm sm:text-base">
                                <div className="flex items-center gap-3 text-muted-foreground justify-center">
                                    <Calendar className="h-4 w-4 shrink-0" />
                                    <span className="text-center">{formatDate(game.playedDate)}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-muted-foreground font-medium">Status:</span>
                                    <Badge variant="outline" className="text-xs sm:text-sm shrink-0">
                                        {game.status === 'finished' ? 'Finalizado' : 'Em andamento'}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
                        
            {data.pagination.totalPages > 1 && (
                <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <Button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                variant="outline"
                                className="gap-2 hover:bg-accent transition-all duration-300 w-full sm:w-auto"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Anterior
                            </Button>

                            <div className="flex items-center gap-2 text-center">
                                <span className="text-sm text-muted-foreground whitespace-nowrap">
                                    Página {page} de {data.pagination.totalPages}
                                </span>
                                <Badge variant="secondary" className="text-xs whitespace-nowrap">
                                    {data.pagination.total} jogos
                                </Badge>
                            </div>

                            <Button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page >= data.pagination.totalPages}
                                variant="outline"
                                className="gap-2 hover:bg-accent transition-all duration-300 w-full sm:w-auto"
                            >
                                Próxima
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}