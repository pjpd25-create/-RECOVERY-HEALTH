import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Trash2 } from 'lucide-react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile } from '../types';

interface AdminEditUserModalProps {
  selectedUserForAdmin: UserProfile | null;
  setSelectedUserForAdmin: (u: UserProfile | null) => void;
  setAdminViewingUser: (u: UserProfile | null) => void;
  setView: (view: any) => void;
  showAlert: (title: string, message: string) => void;
  showConfirm: (title: string, message: string, onConfirm: () => void) => void;
}

export const AdminEditUserModal: React.FC<AdminEditUserModalProps> = ({
  selectedUserForAdmin,
  setSelectedUserForAdmin,
  setAdminViewingUser,
  setView,
  showAlert,
  showConfirm
}) => {
  if (!selectedUserForAdmin) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl border border-clinical-border dark:border-gray-700"
        >
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black dark:text-white">Editar Utilizador</h3>
              <button onClick={() => setSelectedUserForAdmin(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all">
                <X className="w-6 h-6 text-clinical-muted" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-clinical-muted tracking-widest ml-1">Nome Completo</label>
                <input 
                  type="text" 
                  value={selectedUserForAdmin.name} 
                  onChange={(e) => setSelectedUserForAdmin({...selectedUserForAdmin, name: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-clinical-bg dark:bg-gray-900 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-clinical-blue dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-clinical-muted tracking-widest ml-1">Nível</label>
                  <input 
                    type="number" 
                    value={selectedUserForAdmin.level} 
                    onChange={(e) => setSelectedUserForAdmin({...selectedUserForAdmin, level: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 rounded-2xl bg-clinical-bg dark:bg-gray-900 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-clinical-blue dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-clinical-muted tracking-widest ml-1">Pontuação</label>
                  <input 
                    type="number" 
                    value={selectedUserForAdmin.score} 
                    onChange={(e) => setSelectedUserForAdmin({...selectedUserForAdmin, score: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 rounded-2xl bg-clinical-bg dark:bg-gray-900 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-clinical-blue dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-clinical-bg dark:bg-gray-900 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Award className="text-clinical-blue" />
                  <div>
                    <p className="text-sm font-bold dark:text-white">Certificado Digital</p>
                    <p className="text-[10px] text-clinical-muted">Visualizar e editar certificado</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setAdminViewingUser(selectedUserForAdmin);
                    setView('certificate');
                    setSelectedUserForAdmin(null);
                  }}
                  className="px-4 py-2 bg-clinical-blue/10 text-clinical-blue rounded-xl text-[10px] font-bold uppercase hover:bg-clinical-blue hover:text-white transition-all"
                >
                  Visualizar
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-500/5 rounded-2xl border border-red-500/10">
                <div className="flex items-center gap-3">
                  <Trash2 className="text-red-500" />
                  <div>
                    <p className="text-sm font-bold text-red-500">Eliminar Conta</p>
                    <p className="text-[10px] text-red-500/60">Ação irreversível</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    showConfirm("Eliminar Utilizador", `Deseja permanentemente eliminar a conta de ${selectedUserForAdmin.name}? Todos os dados serão perdidos.`, () => {
                      const userRef = doc(db, 'users', selectedUserForAdmin.email.replace(/\./g, '_'));
                      deleteDoc(userRef)
                      .then(() => {
                        showAlert("Sucesso", "Utilizador eliminado com sucesso.");
                        setSelectedUserForAdmin(null);
                      })
                      .catch(err => console.error(err));
                    });
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl text-[10px] font-bold uppercase hover:bg-red-600 transition-all"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => setSelectedUserForAdmin(null)}
                className="flex-1 py-4 bg-clinical-bg dark:bg-gray-700 text-clinical-muted rounded-2xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  const userRef = doc(db, 'users', selectedUserForAdmin.email.replace(/\./g, '_'));
                  updateDoc(userRef, {
                    name: selectedUserForAdmin.name,
                    level: selectedUserForAdmin.level,
                    score: selectedUserForAdmin.score,
                    isPremium: selectedUserForAdmin.isPremium
                  }).then(() => {
                    showAlert("Sucesso", "Utilizador atualizado com sucesso!");
                    setSelectedUserForAdmin(null);
                  }).catch(err => console.error(err));
                }}
                className="flex-1 py-4 bg-clinical-blue text-white rounded-2xl font-bold text-sm hover:bg-blue-600 shadow-lg shadow-clinical-blue/20 transition-all"
              >
                Guardar Alterações
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
