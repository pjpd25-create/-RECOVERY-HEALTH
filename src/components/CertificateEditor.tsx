import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Type, 
  Image as ImageIcon, 
  Move, 
  Maximize2, 
  Trash2, 
  Download, 
  Upload, 
  Settings2,
  ChevronLeft,
  Check,
  AlertCircle,
  Loader2,
  Lock,
  Unlock
} from 'lucide-react';
import { exportToPDFSafe } from '../lib/pdfExportSafe';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * TIPOS E INTERFACES
 */
interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface CertificateElement {
  id: string;
  type: 'text' | 'image';
  content: string; // Texto ou Base64 da imagem
  position: Position;
  size?: Size;
  style: React.CSSProperties;
  isLocked?: boolean;
}

interface CertificateEditorProps {
  onBack: () => void;
  userName?: string;
}

/**
 * COMPONENTE PRINCIPAL: CertificateEditor
 */
export const CertificateEditor: React.FC<CertificateEditorProps> = ({ onBack, userName }) => {
  // ESTADO CENTRAL DOS ELEMENTOS
  const [elements, setElements] = useState<CertificateElement[]>([
    {
      id: 'logo-main',
      type: 'image',
      content: 'https://lh3.googleusercontent.com/d/1_FRXJYYSheVa7-JDA_3PBa5OsuqRFrPr',
      position: { x: 50, y: 5 },
      size: { width: 120, height: 120 },
      style: { objectFit: 'contain' },
      isLocked: false
    },
    {
      id: 'title',
      type: 'text',
      content: 'CERTIFICADO DE CONCLUSÃO',
      position: { x: 50, y: 15 },
      style: { 
        fontSize: '42px', 
        fontWeight: '900', 
        color: '#0056b3', 
        textAlign: 'center', 
        width: '100%',
        fontFamily: 'Outfit, sans-serif',
        letterSpacing: '2px'
      },
      isLocked: false
    },
    {
      id: 'description',
      type: 'text',
      content: 'Certificamos para os devidos fins que',
      position: { x: 50, y: 30 },
      style: { 
        fontSize: '18px', 
        color: '#6c757d', 
        textAlign: 'center', 
        width: '100%',
        fontFamily: 'Inter, sans-serif'
      },
      isLocked: false
    },
    {
      id: 'name',
      type: 'text',
      content: userName || 'NOME DO PARTICIPANTE',
      position: { x: 50, y: 40 },
      style: { 
        fontSize: '48px', 
        fontWeight: '800', 
        color: '#212529', 
        textAlign: 'center', 
        width: '100%',
        fontFamily: 'Outfit, sans-serif',
        borderBottom: '2px solid #dee2e6',
        paddingBottom: '10px'
      },
      isLocked: false
    },
    {
      id: 'body',
      type: 'text',
      content: 'Concluiu com êxito o programa de treinamento RECOVERY HEALTH, demonstrando competência técnica e raciocínio clínico avançado em simulações de saúde.',
      position: { x: 50, y: 55 },
      style: { 
        fontSize: '16px', 
        color: '#495057', 
        textAlign: 'center', 
        width: '80%',
        margin: '0 auto',
        fontFamily: 'Inter, sans-serif',
        lineHeight: '1.6'
      },
      isLocked: false
    },
    {
      id: 'date',
      type: 'text',
      content: `Emitido em ${new Date().toLocaleDateString()}`,
      position: { x: 50, y: 75 },
      style: { 
        fontSize: '14px', 
        color: '#adb5bd', 
        textAlign: 'center', 
        width: '100%',
        fontFamily: 'Inter, sans-serif'
      },
      isLocked: false
    }
  ]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<{ id: string; startX: number; startY: number } | null>(null);

  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) setShowSidebar(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * UPLOAD DE LOGO
   */
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      const newLogo: CertificateElement = {
        id: `logo-${Date.now()}`,
        type: 'image',
        content: base64,
        position: { x: 10, y: 10 },
        size: { width: 120, height: 120 },
        style: { objectFit: 'contain' },
        isLocked: false
      };
      setElements([...elements, newLogo]);
      setSelectedId(newLogo.id);
    };
    reader.readAsDataURL(file);
  };

  /**
   * DRAG & DROP LOGIC (MOUSE & TOUCH)
   */
  const startDragging = (id: string, clientX: number, clientY: number) => {
    const el = elements.find(e => e.id === id);
    if (el?.isLocked) return;

    setSelectedId(id);
    setDragState({
      id,
      startX: clientX,
      startY: clientY
    });
  };

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    startDragging(id, e.clientX, e.clientY);
  };

  const handleTouchStart = (id: string, e: React.TouchEvent) => {
    const touch = e.touches[0];
    startDragging(id, touch.clientX, touch.clientY);
  };

  const doDragging = (clientX: number, clientY: number) => {
    if (!dragState || !editorRef.current) return;

    const rect = editorRef.current.getBoundingClientRect();
    const deltaX = ((clientX - dragState.startX) / rect.width) * 100;
    const deltaY = ((clientY - dragState.startY) / rect.height) * 100;

    setElements(prev => prev.map(el => {
      if (el.id === dragState.id) {
        return {
          ...el,
          position: {
            x: Math.max(0, Math.min(100, el.position.x + deltaX)),
            y: Math.max(0, Math.min(100, el.position.y + deltaY))
          }
        };
      }
      return el;
    }));

    setDragState({
      ...dragState,
      startX: clientX,
      startY: clientY
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    doDragging(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragState) {
      e.preventDefault(); // Impedir scroll enquanto arrasta
      const touch = e.touches[0];
      doDragging(touch.clientX, touch.clientY);
    }
  };

  const handleDragEnd = () => {
    setDragState(null);
  };

  /**
   * ATUALIZAÇÃO DE ESTILO
   */
  const updateStyle = (id: string, newStyle: React.CSSProperties) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, style: { ...el.style, ...newStyle } } : el
    ));
  };

  const updateContent = (id: string, content: string) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, content } : el
    ));
  };

  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedId(null);
  };

  const toggleLock = (id: string) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, isLocked: !el.isLocked } : el
    ));
  };

  /**
   * EXPORTAÇÃO WYSIWYG
   */
  const handleExport = async () => {
    setIsExporting(true);
    setSelectedId(null); // Remove bordas de seleção antes de exportar

    try {
      await exportToPDFSafe(
        'certificate-canvas',
        `Certificado_Editavel_${Date.now()}.pdf`,
        { 
          scale: 3,
          orientation: 'l',
          format: 'a4',
          forcedWidth: 1123 // Largura padrão A4 Landscape para layout estável
        }
      );
    } catch (error) {
      console.error('Erro na exportação:', error);
      alert('Erro ao gerar o PDF. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const selectedElement = elements.find(el => el.id === selectedId);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-950 overflow-hidden">
      {/* Top Bar */}
      <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 z-50">
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="font-black text-sm sm:text-lg dark:text-white uppercase tracking-widest truncate max-w-[150px] sm:max-w-none">Editor WYSIWYG</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {isMobile && (
            <button 
              onClick={() => setShowSidebar(!showSidebar)}
              className={`p-2 rounded-xl transition-all ${showSidebar ? 'bg-clinical-blue text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600'}`}
            >
              <Settings2 className="w-5 h-5" />
            </button>
          )}
          <label className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-xs cursor-pointer hover:bg-gray-200 transition-all">
            <Upload className="w-4 h-4" />
            Logo
            <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
          </label>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-clinical-blue text-white rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span className="hidden xs:inline">{isExporting ? 'Gerando...' : 'Exportar'}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar de Edição */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div 
              initial={isMobile ? { x: -320 } : { width: 0 }}
              animate={isMobile ? { x: 0 } : { width: 320 }}
              exit={isMobile ? { x: -320 } : { width: 0 }}
              className={`${isMobile ? 'absolute inset-y-0 left-0 z-40' : 'relative'} w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto p-6 custom-scrollbar shadow-2xl lg:shadow-none`}
            >
          <div className="flex items-center gap-2 mb-6 text-clinical-blue">
            <Settings2 className="w-5 h-5" />
            <h2 className="font-black text-sm uppercase tracking-widest">Propriedades</h2>
          </div>

          {selectedElement ? (
            <div className="space-y-6">
              {/* Conteúdo */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Conteúdo</label>
                {selectedElement.type === 'text' ? (
                  <textarea 
                    value={selectedElement.content}
                    onChange={(e) => updateContent(selectedElement.id, e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-gray-950 dark:text-white text-sm focus:ring-2 focus:ring-clinical-blue outline-none transition-all min-h-[100px]"
                  />
                ) : (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                    <img src={selectedElement.content} className="max-h-20 object-contain" alt="Preview" />
                  </div>
                )}
              </div>

              {/* Estilo de Texto */}
              {selectedElement.type === 'text' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Tamanho</label>
                      <input 
                        type="text" 
                        value={selectedElement.style.fontSize}
                        onChange={(e) => updateStyle(selectedElement.id, { fontSize: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-gray-950 dark:text-white text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Cor</label>
                      <input 
                        type="color" 
                        value={selectedElement.style.color as string}
                        onChange={(e) => updateStyle(selectedElement.id, { color: e.target.value })}
                        className="w-full h-10 rounded-xl cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Alinhamento</label>
                    <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                      {['left', 'center', 'right'].map(align => (
                        <button
                          key={align}
                          onClick={() => updateStyle(selectedElement.id, { textAlign: align as any })}
                          className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${selectedElement.style.textAlign === align ? 'bg-white dark:bg-gray-700 shadow-sm text-clinical-blue' : 'text-gray-400'}`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Tamanho (para imagem) */}
              {selectedElement.type === 'image' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Largura (px)</label>
                  <input 
                    type="number" 
                    value={selectedElement.size?.width}
                    onChange={(e) => setElements(prev => prev.map(el => el.id === selectedElement.id ? { ...el, size: { ...el.size!, width: Number(e.target.value) } } : el))}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-gray-950 dark:text-white text-xs"
                  />
                </div>
              )}

              {/* Ações */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
                <button 
                  onClick={() => toggleLock(selectedElement.id)}
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs transition-all ${selectedElement.isLocked ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-600'}`}
                >
                  {selectedElement.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  {selectedElement.isLocked ? 'Desbloquear Posição' : 'Bloquear Posição'}
                </button>
                <button 
                  onClick={() => deleteElement(selectedElement.id)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold text-xs hover:bg-red-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Remover Elemento
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Move className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-xs text-gray-400 font-bold">Selecione um elemento no certificado para editar suas propriedades.</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>

        {/* Área do Canvas */}
        <div 
          className="flex-1 overflow-auto p-4 sm:p-12 bg-gray-100 dark:bg-gray-950 flex justify-center items-start touch-none"
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
        >
          <div 
            id="certificate-canvas"
            ref={editorRef}
            className="bg-white shadow-2xl relative overflow-hidden aspect-[1.414/1] w-full max-w-[1000px] border-[10px] sm:border-[20px] border-double"
            style={{ borderColor: '#0056b3', minHeight: isMobile ? '300px' : '700px' }}
          >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-clinical-blue/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-clinical-blue/5 rounded-full translate-x-1/2 translate-y-1/2" />
            
            {/* Renderização Dinâmica dos Elementos */}
            {elements.map((el) => (
              <div
                key={el.id}
                onMouseDown={(e) => handleMouseDown(el.id, e)}
                onTouchStart={(e) => handleTouchStart(el.id, e)}
                className={`absolute cursor-move group transition-shadow ${selectedId === el.id ? 'ring-2 ring-clinical-blue ring-offset-2' : ''}`}
                style={{
                  left: `${el.position.x}%`,
                  top: `${el.position.y}%`,
                  transform: el.style.textAlign === 'center' ? 'translateX(-50%)' : 'none',
                  zIndex: selectedId === el.id ? 10 : 1,
                  userSelect: 'none',
                  touchAction: 'none'
                }}
              >
                {el.type === 'text' ? (
                  <div style={el.style} className="whitespace-pre-wrap outline-none">
                    {el.content}
                  </div>
                ) : (
                  <img 
                    src={el.content} 
                    style={{ 
                      ...el.style, 
                      width: el.size?.width ? `${el.size.width}px` : 'auto',
                      height: el.size?.height ? `${el.size.height}px` : 'auto'
                    }} 
                    draggable={false}
                    alt="Logo"
                  />
                )}
                
                {/* Handles de Seleção (apenas no editor) */}
                {!isExporting && selectedId === el.id && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-clinical-blue text-white px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest shadow-lg">
                    {el.isLocked ? <Lock className="w-2 h-2" /> : <Move className="w-2 h-2" />}
                    {el.id}
                  </div>
                )}
              </div>
            ))}

            {/* Selo de Autenticidade Fixo (Exemplo) */}
            <div className="absolute bottom-12 right-12 flex flex-col items-center gap-2 opacity-30">
              <div className="w-20 h-20 rounded-full border-4 border-clinical-blue flex items-center justify-center">
                <Check className="w-10 h-10 text-clinical-blue" />
              </div>
              <p className="text-[8px] font-black text-clinical-blue uppercase tracking-widest">Original RECOVERY HEALTH</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
