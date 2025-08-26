import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { GameInput } from '@/types';
import { toast } from '@/hooks/use-toast';

// Hook para salvar jogo
export function useSaveGame() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (gameData: GameInput) => apiService.saveGame(gameData),
        onSuccess: (data) => {
            toast({
                title: 'Jogo salvo!',
                description: 'O jogo foi salvo com sucesso no histórico.',
            });
            // Invalidar a lista de jogos para atualizar
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

// Hook para listar jogos
export function useGames(page: number = 1, limit: number = 10) {
    return useQuery({
        queryKey: ['games', page, limit],
        queryFn: () => apiService.getGames(page, limit),
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
}

// Hook para obter um jogo específico
export function useGame(id: number) {
    return useQuery({
        queryKey: ['game', id],
        queryFn: () => apiService.getGame(id),
        enabled: !!id, // Só executa se o ID existir
    });
}