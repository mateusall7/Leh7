import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { RotateCcw, Brain, User } from 'lucide-react';

const GameInfo = ({ currentPlayer, gameStatus, moveHistory, thinking, onReset }) => {
  const getStatusColor = () => {
    switch (gameStatus) {
      case 'check': return 'bg-yellow-500';
      case 'checkmate': return 'bg-red-500';
      case 'stalemate': return 'bg-gray-500';
      default: return 'bg-green-500';
    }
  };

  const getStatusText = () => {
    switch (gameStatus) {
      case 'check': return 'Xeque!';
      case 'checkmate': return 'Xeque-mate!';
      case 'stalemate': return 'Empate!';
      default: return thinking ? 'IA Pensando...' : 'Em andamento';
    }
  };

  return (
    <div className="space-y-4">
      {/* Game Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
            Status do Jogo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Badge variant="outline" className="text-sm">
              {getStatusText()}
            </Badge>
            
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                {currentPlayer === 'white' ? <User size={16} /> : <Brain size={16} />}
                <span>
                  Vez: {currentPlayer === 'white' ? 'Você' : 'IA'}
                </span>
              </div>
            </div>

            {thinking && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="animate-spin w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full"></div>
                IA está pensando...
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Move History */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Jogadas</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            {moveHistory.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">
                Nenhuma jogada ainda
              </p>
            ) : (
              <div className="space-y-2">
                {moveHistory.map((move, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Badge variant={move.player === 'white' ? 'default' : 'secondary'}>
                      {index + 1}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {move.player === 'white' ? <User size={14} /> : <Brain size={14} />}
                      <span className="font-mono">{move.move}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Game Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Controles</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={onReset} 
            className="w-full"
            variant="outline"
          >
            <RotateCcw size={16} className="mr-2" />
            Novo Jogo
          </Button>
        </CardContent>
      </Card>

      {/* Game Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Dicas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-slate-600 space-y-2">
            <p>• Clique numa peça para selecioná-la</p>
            <p>• Clique num quadrado válido para mover</p>
            <p>• A IA tem nível médio de dificuldade</p>
            <p>• Boa sorte! ♕</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameInfo;