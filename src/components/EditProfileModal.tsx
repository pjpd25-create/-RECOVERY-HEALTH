import * as React from 'react';
import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { User, Camera, Loader2, LogOut, X } from 'lucide-react';
import { UserProfile, Specialty } from '../types';
import { USER_STATUSES, SPECIALTIES } from '../constants';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface EditProfileModalProps {
  user: UserProfile;
  onSave: (updatedUser: UserProfile) => void;
  onClose: () => void;
  onLogout: () => void;
}

export function EditProfileModal({ user, onSave, onClose, onLogout }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    age: user.age || '',
    status: user.status || USER_STATUSES[0],
    specialty: user.specialty || SPECIALTIES[0],
    phone: user.phone || '',
    avatar: user.avatar || ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clear input to allow selecting the same file again
    if (fileInputRef.current) fileInputRef.current.value = '';

    // Basic validation
    if (file.size > 2 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 2MB.");
      return;
    }

    // 1. Immediate Local Preview
    const localUrl = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, avatar: localUrl }));

    setIsUploading(true);
    try {
      if (!storage) {
        throw new Error("Serviço de armazenamento não disponível. Verifique a configuração do Firebase.");
      }
      
      const storageRef = ref(storage, `avatars/${user.uid || Date.now()}_${file.name}`);
      
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      
      const downloadURL = await getDownloadURL(snapshot.ref);
      setFormData(prev => ({ ...prev, avatar: downloadURL }));
      
      // Clean up local URL once we have the remote one
      URL.revokeObjectURL(localUrl);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      // We keep the local preview so the user isn't frustrated, 
      // but we inform them about the background sync issue
      alert("Aviso: Ocorreu um erro ao guardar a imagem no servidor. A imagem será mantida localmente por agora, mas tente guardar o perfil novamente mais tarde.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    
    const newErrors: Record<string, string> = {};
    if (formData.name.trim().length < 3) {
      newErrors.name = "O nome deve ter pelo menos 3 caracteres.";
    }
    if (!formData.email.includes('@')) {
      newErrors.email = "Insira um email válido.";
    }
    if (!formData.age || Number(formData.age) < 14) {
      newErrors.age = "Idade mínima de 14 anos.";
    }
    if (formData.phone.trim().length < 9) {
      newErrors.phone = "Insira um contacto válido.";
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    if (isUploading) {
      alert("Por favor, aguarde que o carregamento da imagem termine.");
      return;
    }

    // Ensure we don't save a local blob URL to Firestore if the upload failed
    // but the user still wants to save other changes.
    const finalAvatar = formData.avatar.startsWith('blob:') ? user.avatar : formData.avatar;

    onSave({
      ...user,
      name: formData.name,
      email: formData.email,
      age: Number(formData.age),
      status: formData.status,
      specialty: formData.specialty,
      phone: formData.phone,
      avatar: finalAvatar
    });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl border border-clinical-border dark:border-gray-700"
      >
        <div className="bg-clinical-blue p-8 text-white text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center overflow-hidden border-4 border-white/30 shadow-xl">
              {formData.avatar ? (
                <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <User className="w-12 h-12" />
              )}
            </div>
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="absolute bottom-0 right-0 p-2 bg-clinical-green text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
            </button>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          
          <h3 className="text-2xl font-black uppercase tracking-tight">Editar Perfil</h3>
          <p className="text-white/80 text-xs font-bold uppercase tracking-widest mt-1">Personalize a sua identidade clínica</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-clinical-muted uppercase tracking-widest ml-1">Nome Completo</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, name: e.target.value }));
                if (formErrors.name) setFormErrors(prev => {
                  const next = { ...prev };
                  delete next.name;
                  return next;
                });
              }}
              className={`w-full px-5 py-4 rounded-2xl border ${formErrors.name ? 'border-red-500' : 'border-clinical-border'} dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none transition-all font-bold`}
            />
            {formErrors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{formErrors.name}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-clinical-muted uppercase tracking-widest ml-1">Email Profissional</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, email: e.target.value }));
                if (formErrors.email) setFormErrors(prev => {
                  const next = { ...prev };
                  delete next.email;
                  return next;
                });
              }}
              className={`w-full px-5 py-4 rounded-2xl border ${formErrors.email ? 'border-red-500' : 'border-clinical-border'} dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none transition-all font-bold`}
            />
            {formErrors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{formErrors.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-clinical-muted uppercase tracking-widest ml-1">Idade</label>
              <input 
                type="number" 
                required
                value={formData.age}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, age: e.target.value }));
                  if (formErrors.age) setFormErrors(prev => {
                    const next = { ...prev };
                    delete next.age;
                    return next;
                  });
                }}
                className={`w-full px-5 py-4 rounded-2xl border ${formErrors.age ? 'border-red-500' : 'border-clinical-border'} dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none transition-all font-bold`}
              />
              {formErrors.age && <p className="text-[10px] text-red-500 font-bold ml-1">{formErrors.age}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-clinical-muted uppercase tracking-widest ml-1">Status Profissional / Académico</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-5 py-4 rounded-2xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none transition-all font-bold text-sm"
              >
                {USER_STATUSES.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-clinical-muted uppercase tracking-widest ml-1">Especialidade / Área de Foco</label>
            <select 
              value={formData.specialty}
              onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
              className="w-full px-5 py-4 rounded-2xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none transition-all font-bold text-sm"
            >
              {SPECIALTIES.map(sp => (
                <option key={sp} value={sp}>{sp}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-clinical-muted uppercase tracking-widest ml-1">Telefone / WhatsApp</label>
            <input 
              type="tel" 
              required
              value={formData.phone}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, phone: e.target.value }));
                if (formErrors.phone) setFormErrors(prev => {
                  const next = { ...prev };
                  delete next.phone;
                  return next;
                });
              }}
              className={`w-full px-5 py-4 rounded-2xl border ${formErrors.phone ? 'border-red-500' : 'border-clinical-border'} dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none transition-all font-bold`}
            />
            {formErrors.phone && <p className="text-[10px] text-red-500 font-bold ml-1">{formErrors.phone}</p>}
          </div>

          <div className="pt-4 space-y-3">
            <button 
              type="submit"
              disabled={isUploading}
              className="w-full py-5 bg-clinical-green text-white rounded-[24px] font-black uppercase tracking-widest text-xs hover:bg-green-600 transition-all shadow-xl shadow-clinical-green/20 disabled:opacity-50"
            >
              Guardar Alterações
            </button>
            <button 
              type="button"
              onClick={onLogout}
              className="w-full py-4 text-red-500 font-black uppercase tracking-widest text-[10px] hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Terminar Sessão
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
