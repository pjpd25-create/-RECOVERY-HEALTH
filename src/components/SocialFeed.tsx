import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  query, collection, orderBy, limit, onSnapshot, addDoc, updateDoc, doc 
} from 'firebase/firestore';
import { Award, Star, MessageCircle } from 'lucide-react';
import { db, auth } from '../firebase';
import { UserProfile, FeedItem, OperationType } from '../types';
import { handleFirestoreError } from '../firebase';

interface SocialFeedProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  showPrompt: (title: string, message: string, onConfirm: (val: string) => void, defaultValue?: string) => void;
}

export const SocialFeed: React.FC<SocialFeedProps> = ({ user, setUser, showPrompt }) => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [newPost, setNewPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'feed'), orderBy('createdAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FeedItem));
      setFeedItems(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'feed');
    });
    return () => unsubscribe();
  }, []);

  const handlePost = async () => {
    if (!newPost.trim() || isPosting) return;
    setIsPosting(true);
    try {
      await addDoc(collection(db, 'feed'), {
        userUid: auth.currentUser?.uid || 'anonymous',
        userName: user.name,
        userAvatar: user.avatar || null,
        type: 'post',
        content: newPost.trim(),
        likes: [],
        comments: [],
        createdAt: new Date().toISOString()
      });
      setNewPost('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'feed');
    } finally {
      setIsPosting(false);
    }
  };

  const handleLike = async (postId: string, currentLikes: string[]) => {
    if (!auth.currentUser) return;
    const isLiked = currentLikes.includes(auth.currentUser.uid);
    const newLikes = isLiked 
      ? currentLikes.filter(id => id !== auth.currentUser?.uid)
      : [...currentLikes, auth.currentUser.uid];
    
    try {
      await updateDoc(doc(db, 'feed', postId), { likes: newLikes });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `feed/${postId}`);
    }
  };

  const handleComment = async (postId: string, currentComments: any[]) => {
    showPrompt("Comentário", "Escreva o seu comentário:", async (commentText) => {
      if (!commentText || !commentText.trim() || !auth.currentUser) return;
      
      const newComment = {
        userUid: auth.currentUser.uid,
        userName: user.name,
        userAvatar: user.avatar || null,
        content: commentText.trim(),
        createdAt: new Date().toISOString()
      };
      
      try {
        await updateDoc(doc(db, 'feed', postId), { 
          comments: [...currentComments, newComment] 
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `feed/${postId}`);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-clinical-blue text-white rounded-full flex items-center justify-center font-bold overflow-hidden">
            {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : user.name[0]}
          </div>
          <div className="flex-1">
            <textarea 
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="O que está a estudar hoje?"
              className="w-full p-4 bg-clinical-bg dark:bg-gray-900 rounded-2xl border-none focus:ring-2 focus:ring-clinical-blue outline-none resize-none text-sm dark:text-white"
              rows={2}
            />
            <div className="flex justify-end mt-2">
              <button 
                onClick={handlePost}
                disabled={isPosting || !newPost.trim()}
                className="bg-clinical-blue text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all disabled:opacity-50"
              >
                {isPosting ? 'Publicando...' : 'Publicar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {feedItems.length === 0 && (
          <div className="text-center py-12 text-clinical-muted italic">
            Nenhuma publicação ainda. Seja o primeiro!
          </div>
        )}
        {feedItems.map(item => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-clinical-bg dark:bg-gray-900 rounded-full flex items-center justify-center font-bold dark:text-white overflow-hidden">
                  {item.userUid === (auth.currentUser?.uid || 'anonymous') ? (
                    user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : user.name[0]
                  ) : (
                    item.userAvatar ? <img src={item.userAvatar} alt={item.userName} className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : item.userName[0]
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-sm dark:text-white">
                    {item.userUid === (auth.currentUser?.uid || 'anonymous') ? user.name : item.userName}
                  </h4>
                  <p className="text-[10px] text-clinical-muted uppercase tracking-widest">
                    {new Date(item.createdAt).toLocaleDateString('pt-PT')}
                  </p>
                </div>
              </div>
              {item.type === 'achievement' && <Award className="w-5 h-5 text-clinical-yellow" />}
            </div>
            
            <p className="text-sm text-clinical-text dark:text-gray-300 leading-relaxed">
              {item.content}
            </p>

            <div className="flex items-center gap-6 pt-2 border-t border-clinical-border dark:border-gray-700">
              <button 
                onClick={() => handleLike(item.id, item.likes)}
                className={`flex items-center gap-2 transition-colors text-xs font-bold ${auth.currentUser && item.likes.includes(auth.currentUser.uid) ? 'text-clinical-blue' : 'text-clinical-muted hover:text-clinical-blue'}`}
              >
                <Star className={`w-4 h-4 ${auth.currentUser && item.likes.includes(auth.currentUser.uid) ? 'fill-current' : ''}`} /> {item.likes.length} Gosto
              </button>
              <button 
                onClick={() => handleComment(item.id, item.comments)}
                className="flex items-center gap-2 text-clinical-muted hover:text-clinical-blue transition-colors text-xs font-bold"
              >
                <MessageCircle className="w-4 h-4" /> {item.comments.length} Comentários
              </button>
            </div>

            {item.comments.length > 0 && (
              <div className="space-y-3 pt-2">
                {item.comments.map((comment: any, idx: number) => (
                  <div key={idx} className="flex gap-3 bg-clinical-bg dark:bg-gray-900 p-3 rounded-2xl">
                    <div className="w-8 h-8 bg-clinical-blue text-white rounded-full flex items-center justify-center text-xs font-bold overflow-hidden shrink-0">
                      {comment.userUid === (auth.currentUser?.uid || 'anonymous') ? (
                        user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : user.name[0]
                      ) : (
                        comment.userAvatar ? <img src={comment.userAvatar} alt={comment.userName} className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : comment.userName[0]
                      )}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs dark:text-white">
                        {comment.userUid === (auth.currentUser?.uid || 'anonymous') ? user.name : comment.userName}
                      </h5>
                      <p className="text-xs text-clinical-text dark:text-gray-300">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
