// Initial chess board setup
export const initialBoard = () => {
  return [
    // Black pieces (top)
    [
      { type: 'rook', color: 'black' },
      { type: 'knight', color: 'black' },
      { type: 'bishop', color: 'black' },
      { type: 'queen', color: 'black' },
      { type: 'king', color: 'black' },
      { type: 'bishop', color: 'black' },
      { type: 'knight', color: 'black' },
      { type: 'rook', color: 'black' }
    ],
    Array(8).fill(null).map(() => ({ type: 'pawn', color: 'black' })),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null).map(() => ({ type: 'pawn', color: 'white' })),
    // White pieces (bottom)
    [
      { type: 'rook', color: 'white' },
      { type: 'knight', color: 'white' },
      { type: 'bishop', color: 'white' },
      { type: 'queen', color: 'white' },
      { type: 'king', color: 'white' },
      { type: 'bishop', color: 'white' },
      { type: 'knight', color: 'white' },
      { type: 'rook', color: 'white' }
    ]
  ];
};

// Check if a position is within board bounds
const isInBounds = (row, col) => {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

// Get all possible moves for a piece
export const getPossibleMoves = (board, fromRow, fromCol) => {
  const piece = board[fromRow][fromCol];
  if (!piece) return [];

  const moves = [];

  switch (piece.type) {
    case 'pawn':
      return getPawnMoves(board, fromRow, fromCol, piece.color);
    case 'rook':
      return getRookMoves(board, fromRow, fromCol, piece.color);
    case 'bishop':
      return getBishopMoves(board, fromRow, fromCol, piece.color);
    case 'queen':
      return getQueenMoves(board, fromRow, fromCol, piece.color);
    case 'king':
      return getKingMoves(board, fromRow, fromCol, piece.color);
    case 'knight':
      return getKnightMoves(board, fromRow, fromCol, piece.color);
    default:
      return [];
  }
};

const getPawnMoves = (board, fromRow, fromCol, color) => {
  const moves = [];
  const direction = color === 'white' ? -1 : 1;
  const startRow = color === 'white' ? 6 : 1;

  // Move forward one square
  const newRow = fromRow + direction;
  if (isInBounds(newRow, fromCol) && !board[newRow][fromCol]) {
    moves.push([newRow, fromCol]);

    // Move forward two squares from starting position
    if (fromRow === startRow && !board[newRow + direction][fromCol]) {
      moves.push([newRow + direction, fromCol]);
    }
  }

  // Capture diagonally
  [-1, 1].forEach(colOffset => {
    const newCol = fromCol + colOffset;
    if (isInBounds(newRow, newCol)) {
      const targetPiece = board[newRow][newCol];
      if (targetPiece && targetPiece.color !== color) {
        moves.push([newRow, newCol]);
      }
    }
  });

  return moves;
};

const getRookMoves = (board, fromRow, fromCol, color) => {
  const moves = [];
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  directions.forEach(([rowDir, colDir]) => {
    for (let i = 1; i < 8; i++) {
      const newRow = fromRow + rowDir * i;
      const newCol = fromCol + colDir * i;

      if (!isInBounds(newRow, newCol)) break;

      const targetPiece = board[newRow][newCol];
      if (!targetPiece) {
        moves.push([newRow, newCol]);
      } else {
        if (targetPiece.color !== color) {
          moves.push([newRow, newCol]);
        }
        break;
      }
    }
  });

  return moves;
};

const getBishopMoves = (board, fromRow, fromCol, color) => {
  const moves = [];
  const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

  directions.forEach(([rowDir, colDir]) => {
    for (let i = 1; i < 8; i++) {
      const newRow = fromRow + rowDir * i;
      const newCol = fromCol + colDir * i;

      if (!isInBounds(newRow, newCol)) break;

      const targetPiece = board[newRow][newCol];
      if (!targetPiece) {
        moves.push([newRow, newCol]);
      } else {
        if (targetPiece.color !== color) {
          moves.push([newRow, newCol]);
        }
        break;
      }
    }
  });

  return moves;
};

const getQueenMoves = (board, fromRow, fromCol, color) => {
  return [
    ...getRookMoves(board, fromRow, fromCol, color),
    ...getBishopMoves(board, fromRow, fromCol, color)
  ];
};

const getKingMoves = (board, fromRow, fromCol, color) => {
  const moves = [];
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

  directions.forEach(([rowDir, colDir]) => {
    const newRow = fromRow + rowDir;
    const newCol = fromCol + colDir;

    if (isInBounds(newRow, newCol)) {
      const targetPiece = board[newRow][newCol];
      if (!targetPiece || targetPiece.color !== color) {
        moves.push([newRow, newCol]);
      }
    }
  });

  return moves;
};

const getKnightMoves = (board, fromRow, fromCol, color) => {
  const moves = [];
  const knightMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];

  knightMoves.forEach(([rowOffset, colOffset]) => {
    const newRow = fromRow + rowOffset;
    const newCol = fromCol + colOffset;

    if (isInBounds(newRow, newCol)) {
      const targetPiece = board[newRow][newCol];
      if (!targetPiece || targetPiece.color !== color) {
        moves.push([newRow, newCol]);
      }
    }
  });

  return moves;
};

// Check if a move is valid
export const isValidMove = (board, fromRow, fromCol, toRow, toCol, playerColor) => {
  const piece = board[fromRow][fromCol];
  if (!piece || piece.color !== playerColor) return false;

  const possibleMoves = getPossibleMoves(board, fromRow, fromCol);
  return possibleMoves.some(([row, col]) => row === toRow && col === toCol);
};

// Make a move on the board
export const makeMove = (board, fromRow, fromCol, toRow, toCol) => {
  const newBoard = board.map(row => [...row]);
  const piece = newBoard[fromRow][fromCol];
  
  newBoard[toRow][toCol] = piece;
  newBoard[fromRow][fromCol] = null;

  return newBoard;
};

// Find the king position
const findKing = (board, color) => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.type === 'king' && piece.color === color) {
        return [row, col];
      }
    }
  }
  return null;
};

// Check if a square is under attack
const isSquareUnderAttack = (board, row, col, byColor) => {
  for (let fromRow = 0; fromRow < 8; fromRow++) {
    for (let fromCol = 0; fromCol < 8; fromCol++) {
      const piece = board[fromRow][fromCol];
      if (piece && piece.color === byColor) {
        const possibleMoves = getPossibleMoves(board, fromRow, fromCol);
        if (possibleMoves.some(([moveRow, moveCol]) => moveRow === row && moveCol === col)) {
          return true;
        }
      }
    }
  }
  return false;
};

// Check if a player is in check
export const isInCheck = (board, playerColor) => {
  const kingPosition = findKing(board, playerColor);
  if (!kingPosition) return false;

  const [kingRow, kingCol] = kingPosition;
  const opponentColor = playerColor === 'white' ? 'black' : 'white';
  
  return isSquareUnderAttack(board, kingRow, kingCol, opponentColor);
};

// Get all legal moves for a player (considering check)
export const getLegalMoves = (board, playerColor) => {
  const legalMoves = [];

  for (let fromRow = 0; fromRow < 8; fromRow++) {
    for (let fromCol = 0; fromCol < 8; fromCol++) {
      const piece = board[fromRow][fromCol];
      if (piece && piece.color === playerColor) {
        const possibleMoves = getPossibleMoves(board, fromRow, fromCol);
        
        possibleMoves.forEach(([toRow, toCol]) => {
          // Make the move temporarily
          const tempBoard = makeMove(board, fromRow, fromCol, toRow, toCol);
          
          // Check if this move leaves the king in check
          if (!isInCheck(tempBoard, playerColor)) {
            legalMoves.push({ fromRow, fromCol, toRow, toCol });
          }
        });
      }
    }
  }

  return legalMoves;
};

// Check if it's checkmate
export const isCheckmate = (board, playerColor) => {
  if (!isInCheck(board, playerColor)) return false;
  return getLegalMoves(board, playerColor).length === 0;
};

// Check if it's stalemate
export const isStalemate = (board, playerColor) => {
  if (isInCheck(board, playerColor)) return false;
  return getLegalMoves(board, playerColor).length === 0;
};