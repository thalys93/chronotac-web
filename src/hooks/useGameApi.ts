import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiService } from '@/services/api';
import { GameInput } from '@/types';
import { toast } from '@/hooks/use-toast';

export function useSaveGame() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (gameData: GameInput) => ApiService.saveGame(gameData),
        onSuccess: (data) => {
            toast({
                title: 'Jogo salvo!',
                description: 'O jogo foi salvo com sucesso no histórico.',
            });            
            queryClient.invalidateQueries({ queryKey: ['games'] });
        },
        onError: (error: Error) => {
            toast({
                title: 'Erro ao salvar',
                description: error.message,
                variant: 'destructive',
            });
        },
    });
}

export function useGames(page: number = 1, limit: number = 10) {
    return useQuery({
        queryKey: ['games', page, limit],
        queryFn: () => ApiService.getGames(page, limit),
        staleTime: 5 * 60 * 1000, 
    });
}

export function useGame(id: number) {
    return useQuery({
        queryKey: ['game', id],
        queryFn: () => ApiService.getGame(id),
        enabled: !!id,
    });
}