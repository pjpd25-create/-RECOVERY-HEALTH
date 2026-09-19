import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  query, collection, where, onSnapshot, doc, updateDoc, addDoc, getDoc, limit 
} from 'firebase/firestore';
import { Plus, Search, Send, UserPlus, Trash2, Users, MessageCircle, Settings, X } from 'lucide-react';
import { db, auth } from '../firebase';
import { UserProfile, StudyGroup, GroupMessage, OperationType } from '../types';
import { handleFirestoreError } from '../firebase';

interface StudyGroupsProps {
  user: UserProfile;
  showPrompt: (title: string, message: string, onConfirm: (val: string) => void, defaultValue?: string) => void;
}

export const StudyGroups: React.FC<StudyGroupsProps> = ({ user, showPrompt }) => {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [allGroups, setAllGroups] = useState<StudyGroup[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(collection(db, 'groups'), where('members', 'array-contains', auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StudyGroup));
      setGroups(items);
      if (items.length > 0 && !activeGroupId) {
        setActiveGroupId(items[0].id);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'groups');
    });
    return () => unsubscribe();
  }, [activeGroupId]);

  useEffect(() => {
    const q = query(collection(db, 'groups'), limit(20));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StudyGroup));
      setAllGroups(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'groups');
    });
    return () => unsubscribe();
  }, []);

  const handleInviteFriend = async (friendUid: string) => {
    if (!activeGroupId || !activeGroup) return;
    try {
      const groupRef = doc(db, 'groups', activeGroupId);
      if (!activeGroup.members.includes(friendUid)) {
        await updateDoc(groupRef, {
          members: [...activeGroup.members, friendUid]
        });
        // Also send a notification to the friend
        await addDoc(collection(db, 'notifications'), {
          userId: friendUid,
          title: 'Convite para Grupo',
          message: `Foste convidado para o grupo ${activeGroup.name}.`,
          type: 'info',
          read: false,
          createdAt: new Date().toISOString()
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `groups/${activeGroupId}`);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!activeGroupId || !activeGroup || activeGroup.adminUid !== auth.currentUser?.uid) return;
    try {
      const updatedMessages = activeGroup.messages.filter(m => m.id !== messageId);
      await updateDoc(doc(db, 'groups', activeGroupId), { messages: updatedMessages });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `groups/${activeGroupId}`);
    }
  };

  const activeGroup = groups.find(g => g.id === activeGroupId);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeGroupId || !auth.currentUser) return;
    try {
      const msg: GroupMessage = {
        id: Math.random().toString(36).substr(2, 9),
        senderUid: auth.currentUser.uid,
        senderName: user.name,
        text: newMessage.trim(),
        createdAt: new Date().toISOString()
      };
      const updatedMessages = [...(activeGroup?.messages || []), msg];
      await updateDoc(doc(db, 'groups', activeGroupId), { messages: updatedMessages });
      setNewMessage('');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `groups/${activeGroupId}`);
    }
  };

  const handleCreateGroup = async () => {
    if (!auth.currentUser) return;
    showPrompt("Criar Grupo", "Nome do grupo:", async (name) => {
      if (!name || !name.trim()) return;
      try {
        await addDoc(collection(db, 'groups'), {
          name: name.trim(),
          description: 'Novo grupo de estudo',
          members: [auth.currentUser!.uid],
          adminUid: auth.currentUser!.uid,
          createdAt: new Date().toISOString(),
          messages: []
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, 'groups');
      }
    });
  };

  const handleJoinGroup = async (groupId: string) => {
    if (!auth.currentUser) return;
    try {
      const groupRef = doc(db, 'groups', groupId);
      const groupSnap = await getDoc(groupRef);
      if (groupSnap.exists()) {
        const groupData = groupSnap.data() as StudyGroup;
        if (!groupData.members.includes(auth.currentUser.uid)) {
          await updateDoc(groupRef, {
            members: [...groupData.members, auth.currentUser.uid]
          });
          setActiveGroupId(groupId);
        }
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `groups/${groupId}`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1 space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg dark:text-white">Os Meus Grupos</h3>
            <button 
              onClick={handleCreateGroup}
              className="p-2 bg-clinical-blue/10 text-clinical-blue rounded-lg hover:bg-clinical-blue/20 transition-colors"
              title="Criar Grupo"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {groups.length === 0 && (
              <p className="text-xs text-clinical-muted italic text-center py-4">
                Ainda não pertence a nenhum grupo.
              </p>
            )}
            {groups.map(group => (
              <button
                key={group.id}
                onClick={() => setActiveGroupId(group.id)}
                className={`w-full p-4 rounded-2xl text-left transition-all ${activeGroupId === group.id ? 'bg-clinical-blue text-white shadow-lg shadow-clinical-blue/20' : 'bg-clinical-bg dark:bg-gray-900 text-clinical-text dark:text-gray-300 hover:bg-clinical-border dark:hover:bg-gray-700'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${activeGroupId === group.id ? 'bg-white/20' : 'bg-clinical-blue/10 text-clinical-blue'}`}>
                    {group.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate">{group.name}</h4>
                    <p className={`text-[10px] ${activeGroupId === group.id ? 'text-white/70' : 'text-clinical-muted'}`}>
                      {group.members.length} membros
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm">
          <h3 className="font-bold text-lg dark:text-white mb-4">Explorar Grupos</h3>
          <div className="space-y-2">
            {allGroups.filter(g => !g.members.includes(auth.currentUser?.uid || '')).map(group => (
              <div key={group.id} className="p-4 bg-clinical-bg dark:bg-gray-900 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 bg-clinical-blue/10 text-clinical-blue rounded-full flex items-center justify-center font-bold shrink-0">
                    {group.name[0]}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm truncate dark:text-white">{group.name}</h4>
                    <p className="text-[10px] text-clinical-muted">{group.members.length} membros</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleJoinGroup(group.id)}
                  className="px-3 py-1 bg-clinical-blue text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors shrink-0"
                >
                  Aderir
                </button>
              </div>
            ))}
            {allGroups.filter(g => !g.members.includes(auth.currentUser?.uid || '')).length === 0 && (
              <p className="text-xs text-clinical-muted italic text-center py-4">
                Não há novos grupos para explorar.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm flex flex-col h-[600px]">
        {activeGroup ? (
          <>
            <div className="p-6 border-b border-clinical-border dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-clinical-blue text-white rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold dark:text-white">{activeGroup.name}</h3>
                  <p className="text-xs text-clinical-muted">{activeGroup.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsInviting(true)}
                  className="p-2 text-clinical-blue hover:bg-clinical-blue/10 rounded-full transition-colors"
                  title="Convidar Amigos"
                >
                  <UserPlus className="w-5 h-5" />
                </button>
                <button className="p-2 text-clinical-muted hover:text-clinical-text transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isInviting && (
                <div className="fixed inset-0 z-[160] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <div className="bg-clinical-blue p-4 text-white flex items-center justify-between">
                      <h3 className="font-bold">Convidar Amigos</h3>
                      <button onClick={() => setIsInviting(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-6 space-y-4">
                      <p className="text-sm text-clinical-muted">Selecione um amigo para convidar para este grupo.</p>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {user.friends.length === 0 ? (
                          <p className="text-center py-4 text-xs text-clinical-muted italic">Ainda não tem amigos adicionados.</p>
                        ) : (
                          user.friends.map(friendUid => (
                            <div key={friendUid} className="flex items-center justify-between p-3 bg-clinical-bg dark:bg-gray-900 rounded-2xl">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-clinical-blue/10 rounded-full flex items-center justify-center text-clinical-blue font-bold">
                                  {friendUid[0]}
                                </div>
                                <span className="text-sm font-bold dark:text-white">{friendUid}</span>
                              </div>
                              <button 
                                onClick={() => handleInviteFriend(friendUid)}
                                disabled={activeGroup.members.includes(friendUid)}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${activeGroup.members.includes(friendUid) ? 'bg-gray-100 text-gray-400' : 'bg-clinical-blue text-white hover:bg-blue-600'}`}
                              >
                                {activeGroup.members.includes(friendUid) ? 'No Grupo' : 'Convidar'}
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeGroup.messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="p-4 bg-clinical-bg dark:bg-gray-900 rounded-full">
                    <MessageCircle className="w-8 h-8 text-clinical-muted" />
                  </div>
                  <div className="max-w-xs">
                    <h4 className="font-bold dark:text-white">Inicie a conversa!</h4>
                    <p className="text-sm text-clinical-muted">Partilhe dúvidas ou discuta casos clínicos com os seus colegas de grupo.</p>
                  </div>
                </div>
              ) : (
                activeGroup.messages.map(msg => (
                  <div key={msg.id} className={`flex flex-col ${msg.senderUid === auth.currentUser?.uid ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm relative group ${msg.senderUid === auth.currentUser?.uid ? 'bg-clinical-blue text-white rounded-tr-none' : 'bg-clinical-bg dark:bg-gray-900 dark:text-white rounded-tl-none'}`}>
                      <p className="text-[10px] opacity-70 mb-1 font-bold">{msg.senderName}</p>
                      {msg.text}
                      {activeGroup.adminUid === auth.currentUser?.uid && (
                        <button 
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-clinical-border dark:border-gray-700">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escreva uma mensagem..."
                  className="flex-1 px-4 py-3 rounded-xl bg-clinical-bg dark:bg-gray-900 border-none focus:ring-2 focus:ring-clinical-blue outline-none text-sm dark:text-white"
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-3 bg-clinical-blue text-white rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-12 space-y-4">
            <Users className="w-16 h-16 text-clinical-muted opacity-20" />
            <h3 className="text-xl font-bold dark:text-white">Selecione um grupo</h3>
            <p className="text-clinical-muted">Escolha um grupo à esquerda para começar a conversar.</p>
          </div>
        )}
      </div>
    </div>
  );
};
