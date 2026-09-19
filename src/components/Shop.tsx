import React from 'react';
import { Zap, Activity, Award, Star } from 'lucide-react';
import { UserProfile } from '../types';

interface ShopProps {
  user: UserProfile;
  onBuy: (item: string, cost: number) => void;
}

export const Shop: React.FC<ShopProps> = ({ user, onBuy }) => {
  const items = [
    { id: 'streak_freeze', name: 'Congelamento de Streak', description: 'Protege a sua sequência de estudo se falhar um dia.', cost: 500, icon: <Zap className="w-6 h-6" />, count: user.streakFreezeCount },
    { id: 'extra_life', name: 'Vida Extra', description: 'Recupera uma vida instantaneamente no jogo.', cost: 200, icon: <Activity className="w-6 h-6" />, count: user.lives },
    { id: 'premium_pass', name: 'Passe Premium', description: 'Acesso vitalício a certificados e conteúdos exclusivos.', cost: 1500, icon: <Award className="w-6 h-6" />, count: user.isPremium ? 1 : 0 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map(item => (
        <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-clinical-blue/10 flex items-center justify-center text-clinical-blue">
              {item.icon}
            </div>
            <h4 className="font-bold dark:text-white">{item.name}</h4>
            <p className="text-xs text-clinical-muted leading-relaxed">{item.description}</p>
          </div>
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-1 text-clinical-blue font-bold">
              <Star className="w-4 h-4 fill-clinical-blue" /> {item.cost}
            </div>
            <button 
              onClick={() => onBuy(item.id, item.cost)}
              disabled={user.score < item.cost || (item.id === 'premium_pass' && user.isPremium)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${user.score >= item.cost ? 'bg-clinical-blue text-white hover:bg-blue-600' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              {item.id === 'premium_pass' && user.isPremium ? 'Adquirido' : 'Comprar'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
