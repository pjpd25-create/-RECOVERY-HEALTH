import React, { useState } from 'react';
import { Users, Bell, User, CheckCircle2, X } from 'lucide-react';
import { UserProfile } from '../types';

interface FriendManagerProps {
  user: UserProfile;
  onAccept: (uid: string) => void;
  onReject: (uid: string) => void;
  onSend: (email: string) => void;
}

export const FriendManager: React.FC<FriendManagerProps> = ({ user, onAccept, onReject, onSend }) => {
  const [email, setEmail] = useState('');
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-4">
        <h4 className="font-bold flex items-center gap-2 dark:text-white"><Users className="w-5 h-5 text-clinical-blue" /> Adicionar Amigo</h4>
        <div className="flex gap-2">
          <input 
            type="email" 
            placeholder="Email do colega..." 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-2 rounded-xl border border-clinical-border dark:border-gray-700 dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-clinical-blue"
          />
          <button 
            onClick={() => { onSend(email); setEmail(''); }}
            className="px-6 py-2 bg-clinical-blue text-white rounded-xl font-bold hover:bg-blue-600 transition-all"
          >
            Enviar
          </button>
        </div>
      </div>

      {user.friendRequests && user.friendRequests.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-4">
          <h4 className="font-bold flex items-center gap-2 dark:text-white"><Bell className="w-5 h-5 text-yellow-500" /> Pedidos Pendentes</h4>
          <div className="space-y-3">
            {user.friendRequests.map(req => (
              <div key={req.uid} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-clinical-blue/10 flex items-center justify-center text-clinical-blue">
                    {req.avatar ? <img src={req.avatar} alt="" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" /> : <User className="w-5 h-5" />}
                  </div>
                  <p className="font-bold text-sm dark:text-white">{req.name}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onAccept(req.uid)} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"><CheckCircle2 className="w-4 h-4" /></button>
                  <button onClick={() => onReject(req.uid)} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"><X className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
