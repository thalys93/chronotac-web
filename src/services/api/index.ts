import { Game, GameInput, GameResponse, GamesListResponse } from '@/types';

const API_BASE_URL = 'http://localhost:3333/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro na requisição');
    }

    return response.json();
  }

  // Salvar um novo jogo
  async saveGame(gameData: GameInput): Promise<GameResponse> {
    return this.request<GameResponse>('/games', {
      method: 'POST',
      body: JSON.stringify(gameData),
    });
  }

  // Listar jogos com paginação
  async getGames(page: number = 1, limit: number = 10): Promise<GamesListResponse> {
    return this.request<GamesListResponse>(`/games?page=${page}&limit=${limit}`);
  }

  // Obter um jogo específico
  async getGame(id: number): Promise<{ game: Game }> {
    return this.request<{ game: Game }>(`/games/${id}`);
  }
}

export const apiService = new ApiService();