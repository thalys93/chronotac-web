import { GameState } from '@/hooks/useTicTacToe';
import { GameInput } from '@/types';

export function boardToMatrix(board: (string | null)[]): string[][] {
    const matrix: string[][] = [];
    for (let i = 0; i < 3; i++) {
        matrix[i] = [];
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            matrix[i][j] = board[index] || '';
        }
    }
    return matrix;
}

export function gameStateToInput(gameState: GameState): GameInput {
    return {
        board: boardToMatrix(gameState.board),
        winner: gameState.winner,
        isDraw: gameState.isDraw,
        currentPlayer: gameState.currentPlayer,
        status: gameState.isGameOver ? 'finished' : 'in_progress',
    };
}