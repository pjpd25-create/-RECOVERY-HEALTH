import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Activity, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface DuelArenaProps {
  socket: any;
  activeDuel: any;
  onComplete: (score: number) => void;
  onExit: () => void;
}

export const DuelArena = ({ 
  socket, 
  activeDuel, 
  onComplete, 
  onExit 
}: DuelArenaProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [finished, setFinished] = useState(false);
  const [opponentScore, setOpponentScore] = useState(0);
  const [opponentFinished, setOpponentFinished] = useState(false);

  useEffect(() => {
    if (finished && opponentFinished) {
      const recordDuel = async () => {
        try {
          await addDoc(collection(db, 'duels'), {
            player1Uid: activeDuel.players?.[0]?.id || 'unknown',
            player1Name: activeDuel.players?.[0]?.name || 'Jogador 1',
            player1Score: score,
            player2Uid: activeDuel.players?.[1]?.id || 'unknown',
            player2Name: activeDuel.players?.[1]?.name || 'Jogador 2',
            player2Score: opponentScore,
            winnerUid: score > opponentScore ? (activeDuel.players?.[0]?.id || 'p1') : (score < opponentScore ? (activeDuel.players?.[1]?.id || 'p2') : 'draw'),
            timestamp: new Date().toISOString()
          });
        } catch (err) {
          console.error("Failed to record duel:", err);
        }
      };
      recordDuel();
    }
  }, [finished, opponentFinished, activeDuel.players, opponentScore, score]);

  const questions = activeDuel.questions;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (finished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(null);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, finished]);

  useEffect(() => {
    if (!socket) return;

    socket.on('opponent_score_update', (data: { score: number }) => {
      setOpponentScore(data.score);
    });

    socket.on('opponent_finished', () => {
      setOpponentFinished(true);
    });

    return () => {
      socket.off('opponent_score_update');
      socket.off('opponent_finished');
    };
  }, [socket]);

  const handleAnswer = (answerId: string | null) => {
    if (showFeedback || finished) return;

    const correct = answerId === currentQuestion.correctOption;
    setIsCorrect(correct);
    setSelectedAnswer(answerId);
    setShowFeedback(true);

    if (correct) {
      const newScore = score + 100 + timeLeft;
      setScore(newScore);
      socket.emit('duel_score_update', { duelId: activeDuel.id, score: newScore });
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setTimeLeft(15);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setFinished(true);
        socket.emit('duel_finished', { duelId: activeDuel.id, score });
        onComplete(score);
      }
    }, 2000);
  };

  if (finished) {
    const won = score > opponentScore;
    const draw = score === opponentScore;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-3xl border-2 border-clinical-border text-center space-y-6"
      >
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ${won ? 'bg-green-100 text-green-600' : draw ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
          {won ? <Trophy className="w-12 h-12" /> : draw ? <Activity className="w-12 h-12" /> : <AlertCircle className="w-12 h-12" />}
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">
            {won ? 'Vitória!' : draw ? 'Empate!' : 'Derrota!'}
          </h2>
          <p className="text-clinical-muted">
            {won ? 'Excelente desempenho, colega!' : draw ? 'Um duelo equilibrado!' : 'Mais sorte na próxima vez!'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 py-6">
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-xs font-bold text-clinical-blue uppercase tracking-widest mb-1">Tua Pontuação</p>
            <p className="text-2xl font-black text-clinical-text">{score}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-xs font-bold text-clinical-muted uppercase tracking-widest mb-1">Oponente</p>
            <p className="text-2xl font-black text-clinical-text">{opponentScore}</p>
          </div>
        </div>

        {!opponentFinished && (
          <div className="flex items-center justify-center gap-2 text-clinical-muted italic text-sm">
            <div className="w-2 h-2 bg-clinical-blue rounded-full animate-bounce" />
            Aguardando oponente finalizar...
          </div>
        )}

        <button 
          onClick={onExit}
          className="w-full py-4 bg-clinical-blue text-white rounded-xl font-bold shadow-lg"
        >
          Voltar ao Menu
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Duel Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-clinical-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-clinical-blue font-bold">
            Tu
          </div>
          <div>
            <p className="text-xs font-bold text-clinical-muted uppercase">Pontos</p>
            <p className="font-black text-clinical-blue">{score}</p>
          </div>
        </div>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold border ${timeLeft < 5 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-white text-clinical-blue border-clinical-border'}`}>
          <Clock className="w-4 h-4" />
          {timeLeft}s
        </div>

        <div className="flex items-center gap-3 text-right">
          <div>
            <p className="text-xs font-bold text-clinical-muted uppercase">Oponente</p>
            <p className="font-black text-red-500">{opponentScore}</p>
          </div>
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-bold">
            Op
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex gap-1">
        {questions.map((_: any, idx: number) => (
          <div 
            key={idx} 
            className={`h-full flex-grow transition-all ${
              idx < currentQuestionIndex ? 'bg-clinical-green' : 
              idx === currentQuestionIndex ? 'bg-clinical-blue' : 'bg-gray-200'
            }`} 
          />
        ))}
      </div>

      {/* Question Card */}
      <motion.div 
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-8 rounded-3xl border border-clinical-border space-y-6"
      >
        <div className="space-y-2">
          <span className="px-3 py-1 bg-blue-50 text-clinical-blue text-[10px] font-bold uppercase rounded-full border border-blue-100">
            Questão {currentQuestionIndex + 1} de {questions.length}
          </span>
          <p className="text-xl font-medium leading-relaxed">{currentQuestion.text}</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((opt: any) => (
            <button
              key={opt.id}
              onClick={() => handleAnswer(opt.id)}
              disabled={showFeedback}
              className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4
                ${selectedAnswer === opt.id 
                  ? (isCorrect ? 'border-clinical-green bg-green-50' : 'border-red-500 bg-red-50') 
                  : 'border-clinical-border hover:border-clinical-blue hover:bg-blue-50'
                }
                ${showFeedback && opt.id === currentQuestion.correctOption ? 'border-clinical-green bg-green-50' : ''}
              `}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold
                ${selectedAnswer === opt.id 
                  ? (isCorrect ? 'bg-clinical-green text-white' : 'bg-red-500 text-white') 
                  : 'bg-gray-100 text-clinical-muted'
                }
                ${showFeedback && opt.id === currentQuestion.correctOption ? 'bg-clinical-green text-white' : ''}
              `}>
                {opt.id}
              </span>
              <span className="font-medium">{opt.text}</span>
            </button>
          ))}
        </div>

        {showFeedback && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl text-center font-bold ${isCorrect ? 'text-clinical-green' : 'text-red-500'}`}
          >
            {isCorrect ? 'Boa! Resposta Correta!' : 'Incorreto! Foca no próximo.'}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// Removed default export
