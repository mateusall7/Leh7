import React from 'react';
import ChessPiece from './ChessPiece';

const ChessBoard = ({ board, onSquareClick, selectedSquare, currentPlayer, gameStatus }) => {
  const getSquareColor = (row, col) => {
    const isLight = (row + col) % 2 === 0;
    const isSelected = selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
    
    if (isSelected) {
      return 'bg-yellow-400 border-2 border-yellow-600';
    }
    
    return isLight ? 'bg-amber-100' : 'bg-amber-800';
  };

  const getSquareHoverColor = (row, col) => {
    const isLight = (row + col) % 2 === 0;
    return isLight ? 'hover:bg-amber-200' : 'hover:bg-amber-700';
  };

  return (
    <div className="bg-amber-900 p-4 rounded-2xl shadow-2xl">
      {/* Column labels */}
      <div className="flex mb-2">
        <div className="w-8"></div>
        {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(label => (
          <div key={label} className="w-16 h-6 flex items-center justify-center text-amber-100 font-semibold">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-8 gap-0">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {/* Row label */}
            <div className="w-8 h-16 flex items-center justify-center text-amber-100 font-semibold">
              {8 - rowIndex}
            </div>
            
            {row.map((piece, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-16 h-16 flex items-center justify-center cursor-pointer
                  transition-all duration-200 transform hover:scale-105
                  ${getSquareColor(rowIndex, colIndex)}
                  ${getSquareHoverColor(rowIndex, colIndex)}
                  ${gameStatus === 'checkmate' || gameStatus === 'stalemate' ? 'cursor-not-allowed opacity-75' : ''}
                `}
                onClick={() => onSquareClick(rowIndex, colIndex)}
              >
                {piece && (
                  <ChessPiece
                    piece={piece}
                    isSelected={selectedSquare && selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Game status indicator */}
      {gameStatus !== 'playing' && (
        <div className="mt-4 p-3 bg-slate-800 text-white text-center rounded-lg font-semibold">
          {gameStatus === 'check' && '⚠️ Xeque!'}
          {gameStatus === 'checkmate' && '👑 Xeque-mate!'}
          {gameStatus === 'stalemate' && '🤝 Empate por afogamento!'}
        </div>
      )}
    </div>
  );
};

export default ChessBoard;