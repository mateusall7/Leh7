import { getLegalMoves } from './gameLogic';

// Simple evaluation function for chess positions
const evaluatePosition = (board) => {
  const pieceValues = {
    pawn: 1,
    knight: 3,
    bishop: 3,
    rook: 5,
    queen: 9,
    king: 0
  };

  let score = 0;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece) {
        const value = pieceValues[piece.type];
        score += piece.color === 'black' ? value : -value;
      }
    }
  }

  return score;
};

// Minimax algorithm with alpha-beta pruning (simplified for medium difficulty)
const minimax = (board, depth, alpha, beta, maximizingPlayer, playerColor) => {
  if (depth === 0) {
    return evaluatePosition(board);
  }

  const legalMoves = getLegalMoves(board, maximizingPlayer ? playerColor : (playerColor === 'white' ? 'black' : 'white'));

  if (legalMoves.length === 0) {
    // Game over
    return maximizingPlayer ? -1000 : 1000;
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (const move of legalMoves) {
      const { fromRow, fromCol, toRow, toCol } = move;
      const newBoard = makeMove(board, fromRow, fromCol, toRow, toCol);
      const eval_ = minimax(newBoard, depth - 1, alpha, beta, false, playerColor);
      maxEval = Math.max(maxEval, eval_);
      alpha = Math.max(alpha, eval_);
      if (beta <= alpha) {
        break; // Alpha-beta pruning
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of legalMoves) {
      const { fromRow, fromCol, toRow, toCol } = move;
      const newBoard = makeMove(board, fromRow, fromCol, toRow, toCol);
      const eval_ = minimax(newBoard, depth - 1, alpha, beta, true, playerColor);
      minEval = Math.min(minEval, eval_);
      beta = Math.min(beta, eval_);
      if (beta <= alpha) {
        break; // Alpha-beta pruning
      }
    }
    return minEval;
  }
};

// Helper function to make a move on the board
const makeMove = (board, fromRow, fromCol, toRow, toCol) => {
  const newBoard = board.map(row => [...row]);
  const piece = newBoard[fromRow][fromCol];
  
  newBoard[toRow][toCol] = piece;
  newBoard[fromRow][fromCol] = null;

  return newBoard;
};

// Get AI move using minimax algorithm
export const getAIMove = (board, aiColor) => {
  const legalMoves = getLegalMoves(board, aiColor);
  
  if (legalMoves.length === 0) {
    return null;
  }

  // For medium difficulty, we'll use depth 2-3 with some randomness
  const depth = Math.random() < 0.7 ? 3 : 2; // 70% chance of deeper search
  
  let bestMove = null;
  let bestValue = -Infinity;

  // Add some randomness for medium difficulty
  const shuffledMoves = [...legalMoves].sort(() => Math.random() - 0.5);
  
  for (const move of shuffledMoves.slice(0, Math.min(15, shuffledMoves.length))) {
    const { fromRow, fromCol, toRow, toCol } = move;
    const newBoard = makeMove(board, fromRow, fromCol, toRow, toCol);
    
    const value = minimax(newBoard, depth - 1, -Infinity, Infinity, false, aiColor);
    
    // Add small random factor for more natural play
    const randomFactor = (Math.random() - 0.5) * 0.5;
    const finalValue = value + randomFactor;
    
    if (finalValue > bestValue) {
      bestValue = finalValue;
      bestMove = move;
    }
  }

  // Sometimes make a suboptimal move for medium difficulty (20% chance)
  if (Math.random() < 0.2 && legalMoves.length > 1) {
    const randomMoves = legalMoves.filter(move => move !== bestMove);
    bestMove = randomMoves[Math.floor(Math.random() * randomMoves.length)];
  }

  return bestMove;
};