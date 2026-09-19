import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, Heart, Flame, ThumbsUp, Eye, 
  Send, Image as ImageIcon, Video, MoreHorizontal, 
  User, Trash2, Share2, PlusCircle
} from 'lucide-react';
import { FeedItem, UserProfile, FeedComment } from '../types';

interface CommunityProps {
  user: UserProfile;
  posts: FeedItem[];
  onPost: (content: string, mediaUrl?: string, mediaType?: 'image' | 'video') => void;
  onLike: (postId: string) => void;
  onReaction: (postId: string, reaction: 'fire' | 'heart') => void;
  onComment: (postId: string, content: string) => void;
  onDelete: (postId: string) => void;
}

export const Community: React.FC<CommunityProps> = ({ 
  user, posts, onPost, onLike, onReaction, onComment, onDelete 
}) => {
  const [newPostContent, setNewPostContent] = useState('');
  const [showMediaInput, setShowMediaInput] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const handlePublish = () => {
    if (!newPostContent.trim()) return;
    onPost(newPostContent, mediaUrl || undefined, mediaUrl ? mediaType : undefined);
    setNewPostContent('');
    setMediaUrl('');
    setShowMediaInput(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      {/* Create Post */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-clinical-border dark:border-gray-700">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-clinical-blue/10 flex items-center justify-center overflow-hidden">
            {user.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover" /> : <User className="text-clinical-blue" />}
          </div>
          <div className="flex-grow space-y-4">
            <textarea
              placeholder="O que queres partilhar com a comunidade?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-clinical-blue dark:text-white resize-none min-h-[100px]"
            />
            
            <AnimatePresence>
              {showMediaInput && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setMediaType('image')}
                      className={`px-3 py-1 rounded-full text-xs font-bold ${mediaType === 'image' ? 'bg-clinical-blue text-white' : 'bg-gray-100 text-gray-500'}`}
                    >
                      Imagem
                    </button>
                    <button 
                      onClick={() => setMediaType('video')}
                      className={`px-3 py-1 rounded-full text-xs font-bold ${mediaType === 'video' ? 'bg-clinical-blue text-white' : 'bg-gray-100 text-gray-500'}`}
                    >
                      Vídeo
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="URL da imagem ou vídeo..."
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-clinical-blue dark:text-white"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowMediaInput(!showMediaInput)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-clinical-muted transition-colors"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => { setShowMediaInput(true); setMediaType('video'); }}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-clinical-muted transition-colors"
                >
                  <Video className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handlePublish}
                disabled={!newPostContent.trim()}
                className="px-6 py-2 bg-clinical-blue text-white rounded-xl font-bold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Publicar <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-clinical-border dark:border-gray-700 space-y-4"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-clinical-blue/10 flex items-center justify-center overflow-hidden">
                  {post.userAvatar ? <img src={post.userAvatar} alt="" className="w-full h-full object-cover" /> : <User className="text-clinical-blue" />}
                </div>
                <div>
                  <h4 className="font-bold text-sm dark:text-white">{post.userName}</h4>
                  <p className="text-[10px] text-clinical-muted">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              {post.userUid === user.uid && (
                <button 
                  onClick={() => onDelete(post.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Post Content */}
            <div className="space-y-4">
              <p className="text-sm dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
              
              {post.mediaUrl && (
                <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                  {post.mediaType === 'video' ? (
                    <video src={post.mediaUrl} controls className="w-full" />
                  ) : (
                    <img src={post.mediaUrl} alt="" className="w-full object-cover max-h-[400px]" referrerPolicy="no-referrer" />
                  )}
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onLike(post.id)}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${post.likes.includes(user.uid) ? 'text-clinical-blue' : 'text-clinical-muted hover:text-clinical-blue'}`}
                >
                  <ThumbsUp className={`w-4 h-4 ${post.likes.includes(user.uid) ? 'fill-clinical-blue' : ''}`} />
                  {post.likes.length}
                </button>
                
                <button 
                  onClick={() => onReaction(post.id, 'fire')}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${post.reactions?.fire?.includes(user.uid) ? 'text-orange-500' : 'text-clinical-muted hover:text-orange-500'}`}
                >
                  <Flame className={`w-4 h-4 ${post.reactions?.fire?.includes(user.uid) ? 'fill-orange-500' : ''}`} />
                  {post.reactions?.fire?.length || 0}
                </button>

                <button 
                  onClick={() => onReaction(post.id, 'heart')}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${post.reactions?.heart?.includes(user.uid) ? 'text-red-500' : 'text-clinical-muted hover:text-red-500'}`}
                >
                  <Heart className={`w-4 h-4 ${post.reactions?.heart?.includes(user.uid) ? 'fill-red-500' : ''}`} />
                  {post.reactions?.heart?.length || 0}
                </button>

                <button 
                  onClick={() => setActiveCommentPost(activeCommentPost === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 text-xs font-medium text-clinical-muted hover:text-clinical-blue transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  {post.comments.length}
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-clinical-muted">
                <Eye className="w-4 h-4" />
                {post.views?.length || 0}
              </div>
            </div>

            {/* Comments Section */}
            <AnimatePresence>
              {activeCommentPost === post.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-4 space-y-4"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Escreve um comentário..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="flex-grow bg-gray-50 dark:bg-gray-900 rounded-xl px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-clinical-blue dark:text-white"
                    />
                    <button
                      onClick={() => {
                        if (commentText.trim()) {
                          onComment(post.id, commentText);
                          setCommentText('');
                        }
                      }}
                      className="p-2 bg-clinical-blue text-white rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-2xl">
                        <div className="w-8 h-8 rounded-full bg-clinical-blue/10 flex items-center justify-center overflow-hidden shrink-0">
                          {comment.userAvatar ? <img src={comment.userAvatar} alt="" className="w-full h-full object-cover" /> : <User className="w-4 h-4 text-clinical-blue" />}
                        </div>
                        <div className="space-y-1">
                          <h5 className="font-bold text-[11px] dark:text-white">{comment.userName}</h5>
                          <p className="text-[11px] dark:text-gray-300">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
