import { Game, GameInput, GamesListResponse, ApiError } from '@/types';

export class ApiService {
    private static readonly BASE_URL = 'https://chronotac-api.onrender.com/api';
    private static readonly OFFLINE_KEY = 'chronotac_offline_games';
    private static readonly SYNC_QUEUE_KEY = 'chronotac_sync_queue';

    private static isOnline(): boolean {
        return navigator.onLine;
    }

    private static generateId(): number {
        return Date.now();
    }

    private static saveOfflineGame(game: GameInput): Game {
        const offlineGames = this.getOfflineGames();
        const newGame: Game = {
            ...game,
            id: this.generateId(),
            playedDate: new Date().toISOString(),
        };
        offlineGames.unshift(newGame);
        localStorage.setItem(this.OFFLINE_KEY, JSON.stringify(offlineGames));
                
        this.addToSyncQueue(game);
        
        return newGame;
    }

    private static getOfflineGames(): Game[] {
        const stored = localStorage.getItem(this.OFFLINE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    private static addToSyncQueue(game: GameInput): void {
        const queue = this.getSyncQueue();
        queue.push({
            ...game,
            timestamp: Date.now()
        });
        localStorage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(queue));
    }

    private static getSyncQueue(): any[] {
        const stored = localStorage.getItem(this.SYNC_QUEUE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    private static clearSyncQueue(): void {
        localStorage.removeItem(this.SYNC_QUEUE_KEY);
    }

    static async saveGame(gameInput: GameInput): Promise<Game> {
        if (!this.isOnline()) {
            return this.saveOfflineGame(gameInput);
        }

        try {
            const response = await fetch(`${this.BASE_URL}/games`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gameInput),
            });

            if (!response.ok) {
                throw new Error('Failed to save game');
            }

            return await response.json();
        } catch (error) {
            return this.saveOfflineGame(gameInput);
        }
    }

    static async getGames(page: number = 1, limit: number = 10): Promise<GamesListResponse> {
        if (!this.isOnline()) {
            const offlineGames = this.getOfflineGames();
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedGames = offlineGames.slice(startIndex, endIndex);

            return {
                games: paginatedGames,
                pagination: {
                    page,
                    limit,
                    total: offlineGames.length,
                    totalPages: Math.ceil(offlineGames.length / limit)
                }
            };
        }

        try {
            const response = await fetch(`${this.BASE_URL}/games?page=${page}&limit=${limit}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch games');
            }

            const data = await response.json();
            
            if (page === 1) {
                const existingOffline = this.getOfflineGames();
                const mergedGames = [...data.games, ...existingOffline.filter(game => 
                    !data.games.some((onlineGame: Game) => onlineGame.id === game.id)
                )];
                localStorage.setItem(this.OFFLINE_KEY, JSON.stringify(mergedGames));
            }

            return data;
        } catch (error) {
            const offlineGames = this.getOfflineGames();
            return {
                games: offlineGames.slice(0, limit),
                pagination: {
                    page: 1,
                    limit: offlineGames.length,
                    total: offlineGames.length,
                    totalPages: 1
                }
            };
        }
    }

    static async getGame(id: number): Promise<Game> {
        if (!this.isOnline()) {
            const offlineGames = this.getOfflineGames();
            const game = offlineGames.find(g => g.id === id);
            if (!game) {
                throw new Error('Game not found');
            }
            return game;
        }

        try {
            const response = await fetch(`${this.BASE_URL}/games/${id}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch game');
            }

            return await response.json();
        } catch (error) {            
            const offlineGames = this.getOfflineGames();
            const game = offlineGames.find(g => g.id === id);
            if (!game) {
                throw error;
            }
            return game;
        }
    }
    
    static async syncOfflineData(): Promise<void> {
        if (!this.isOnline()) return;

        const syncQueue = this.getSyncQueue();
        if (syncQueue.length === 0) return;

        console.log(`Sincronizando ${syncQueue.length} jogos offline...`);

        for (const gameData of syncQueue) {
            try {
                await fetch(`${this.BASE_URL}/games`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        board: gameData.board,
                        winner: gameData.winner,
                        isDraw: gameData.isDraw,
                        currentPlayer: gameData.currentPlayer,
                        status: gameData.status
                    }),
                });
            } catch (error) {
                console.error('Erro ao sincronizar jogo:', error);
                return;
            }
        }
        
        this.clearSyncQueue();
        console.log('Sincronização concluída!');
    }
}