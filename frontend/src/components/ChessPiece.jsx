import React from 'react';

const ChessPiece = ({ piece, isSelected }) => {
  const getPieceSymbol = () => {
    const symbols = {
      white: {
        king: '♔',
        queen: '♕',
        rook: '♖',
        bishop: '♗',
        knight: '♘',
        pawn: '♙'
      },
      black: {
        king: '♚',
        queen: '♛',
        rook: '♜',
        bishop: '♝',
        knight: '♞',
        pawn: '♟'
      }
    };
    
    return symbols[piece.color][piece.type];
  };

  return (
    <div className={`
      text-4xl select-none transition-all duration-200 transform
      ${isSelected ? 'scale-110 drop-shadow-lg' : ''}
      ${piece.color === 'white' ? 'text-white drop-shadow-md' : 'text-slate-900'}
      hover:scale-110
    `}>
      {getPieceSymbol()}
    </div>
  );
};

export default ChessPiece;