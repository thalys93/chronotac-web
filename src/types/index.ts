export interface Game {
    id: number;
    board: string[][];
    winner: string | null;
    isDraw: boolean;
    currentPlayer: string;
    playedDate: string;
    status: string;
}

export interface GameInput {
    board: string[][];
    winner: string | null;
    isDraw: boolean;
    currentPlayer: string;
    status: string;
}

export interface GameResponse {
    message: string;
    game: Game;
}

export interface GamesListResponse {
    games: Game[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface ApiError {
    error: string;
    message: string;
}