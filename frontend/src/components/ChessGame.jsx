import React, { useState, useEffect, useCallback } from 'react';
import ChessBoard from './ChessBoard';
import GameInfo from './GameInfo';
import RomanticProposal from './RomanticProposal';
import { initialBoard, isValidMove, makeMove, isInCheck, isCheckmate, isStalemate } from '../utils/gameLogic';
import { getAIMove } from '../utils/mock';

const ChessGame = () => {
  const [board, setBoard] = useState(initialBoard());
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'check', 'checkmate', 'stalemate'
  const [moveHistory, setMoveHistory] = useState([]);
  const [showProposal, setShowProposal] = useState(false);
  const [thinking, setThinking] = useState(false);

  // Check game state after each move
  const checkGameState = useCallback((newBoard, player) => {
    if (isCheckmate(newBoard, player)) {
      setGameStatus('checkmate');
      if (player === 'white') {
        // Player lost to AI, show proposal
        setTimeout(() => setShowProposal(true), 1000);
      }
      return true;
    } else if (isStalemate(newBoard, player)) {
      setGameStatus('stalemate');
      return true;
    } else if (isInCheck(newBoard, player)) {
      setGameStatus('check');
      return false;
    } else {
      setGameStatus('playing');
      return false;
    }
  }, []);

  // Handle player move
  const handleSquareClick = useCallback((row, col) => {
    if (currentPlayer !== 'white' || thinking) return;

    if (selectedSquare) {
      const [fromRow, fromCol] = selectedSquare;
      
      if (fromRow === row && fromCol === col) {
        // Deselect current square
        setSelectedSquare(null);
        return;
      }

      if (isValidMove(board, fromRow, fromCol, row, col, currentPlayer)) {
        const newBoard = makeMove(board, fromRow, fromCol, row, col);
        const moveNotation = `${String.fromCharCode(97 + fromCol)}${8 - fromRow} → ${String.fromCharCode(97 + col)}${8 - row}`;
        
        setBoard(newBoard);
        setMoveHistory(prev => [...prev, { player: 'white', move: moveNotation }]);
        setSelectedSquare(null);

        // Check if game ended
        const gameEnded = checkGameState(newBoard, 'black');
        if (!gameEnded) {
          setCurrentPlayer('black');
        }
      } else {
        // Invalid move, try to select new piece
        const piece = board[row][col];
        if (piece && piece.color === currentPlayer) {
          setSelectedSquare([row, col]);
        } else {
          setSelectedSquare(null);
        }
      }
    } else {
      // Select a piece
      const piece = board[row][col];
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare([row, col]);
      }
    }
  }, [board, currentPlayer, selectedSquare, thinking, checkGameState]);

  // AI move
  useEffect(() => {
    if (currentPlayer === 'black' && gameStatus === 'playing') {
      setThinking(true);
      
      setTimeout(() => {
        const aiMove = getAIMove(board, 'black');
        if (aiMove) {
          const { fromRow, fromCol, toRow, toCol } = aiMove;
          const newBoard = makeMove(board, fromRow, fromCol, toRow, toCol);
          const moveNotation = `${String.fromCharCode(97 + fromCol)}${8 - fromRow} → ${String.fromCharCode(97 + toCol)}${8 - toRow}`;
          
          setBoard(newBoard);
          setMoveHistory(prev => [...prev, { player: 'black', move: moveNotation }]);
          
          // Check if game ended
          const gameEnded = checkGameState(newBoard, 'white');
          if (!gameEnded) {
            setCurrentPlayer('white');
          }
        }
        setThinking(false);
      }, 1000 + Math.random() * 2000); // AI "thinks" for 1-3 seconds
    }
  }, [currentPlayer, board, gameStatus, checkGameState]);

  const resetGame = () => {
    setBoard(initialBoard());
    setCurrentPlayer('white');
    setSelectedSquare(null);
    setGameStatus('playing');
    setMoveHistory([]);
    setShowProposal(false);
    setThinking(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Xadrez Real ♕
          </h1>
          <p className="text-slate-600">
            Enfrente a IA e prove suas habilidades no xadrez
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chess Board */}
          <div className="lg:col-span-3">
            <ChessBoard
              board={board}
              onSquareClick={handleSquareClick}
              selectedSquare={selectedSquare}
              currentPlayer={currentPlayer}
              gameStatus={gameStatus}
            />
          </div>

          {/* Game Info */}
          <div className="lg:col-span-1">
            <GameInfo
              currentPlayer={currentPlayer}
              gameStatus={gameStatus}
              moveHistory={moveHistory}
              thinking={thinking}
              onReset={resetGame}
            />
          </div>
        </div>
      </div>

      {/* Romantic Proposal Modal */}
      {showProposal && <RomanticProposal onClose={() => setShowProposal(false)} />}
    </div>
  );
};

export default ChessGame;