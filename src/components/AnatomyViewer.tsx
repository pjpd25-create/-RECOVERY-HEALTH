import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Maximize2, 
  Minimize2, 
  Info, 
  RotateCcw, 
  Layers, 
  Activity,
  X,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface AnatomyViewerProps {
  onClose: () => void;
  targetArea?: string;
}

const Model = ({ color = "#3b82f6" }) => {
  // A simple representation of a joint (two bones meeting)
  return (
    <group rotation={[0, 0, 0]}>
      {/* Upper Bone */}
      <mesh position={[0, 1, 0]} castShadow>
        <capsuleGeometry args={[0.3, 1.5, 4, 16]} />
        <meshStandardMaterial color="#f3f4f6" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Lower Bone */}
      <mesh position={[0, -1, 0]} castShadow>
        <capsuleGeometry args={[0.3, 1.5, 4, 16]} />
        <meshStandardMaterial color="#f3f4f6" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Joint Area (The "Injury" or point of interest) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5} 
          transparent 
          opacity={0.6} 
        />
      </mesh>
      
      {/* Ligaments/Muscles representation */}
      <mesh position={[0.3, 0, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <mesh position={[-0.3, 0, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
    </group>
  );
};

const ANATOMY_DATA = {
  "Joelho": {
    title: "Complexo do Joelho",
    description: "Articulação sinovial do tipo gínglimo, composta pelo fêmur, tíbia e patela.",
    structures: ["Ligamento Cruzado Anterior (LCA)", "Menisco Medial", "Tendão Patelar", "Cápsula Articular"],
    biomechanics: "Movimentos de flexão, extensão e rotação limitada quando fletido."
  },
  "Quadril": {
    title: "Articulação Coxofemoral",
    description: "Articulação esferoide que conecta o fêmur ao acetábulo da pelve.",
    structures: ["Lábio Acetabular", "Ligamento Iliofemoral", "Cabeça do Fêmur", "Trocanter Maior"],
    biomechanics: "Grande amplitude de movimento em todos os planos: flexão/extensão, abdução/adução, rotação."
  },
  "Coluna": {
    title: "Segmento Lombar",
    description: "As cinco vértebras lombares (L1-L5) que suportam a maior parte do peso corporal.",
    structures: ["Disco Intervertebral", "Processos Espinhosos", "Forame Vertebral", "Raízes Nervosas"],
    biomechanics: "Suporte de carga, flexão anterior e lateral, e extensão."
  }
};

export const AnatomyViewer: React.FC<AnatomyViewerProps> = ({ onClose, targetArea = "Joelho" }) => {
  const [activeLayer, setActiveLayer] = useState<'osseo' | 'muscular' | 'nervoso'>('osseo');
  const [showInfo, setShowInfo] = useState(true);

  const anatomyInfo = ANATOMY_DATA[targetArea as keyof typeof ANATOMY_DATA] || ANATOMY_DATA["Joelho"];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
    >
      <div className="relative w-full h-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* Main 3D Canvas */}
        <div className="flex-1 bg-gray-900 rounded-[40px] overflow-hidden border border-white/10 relative shadow-2xl">
          <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.5}>
                <Model color={activeLayer === 'osseo' ? '#3b82f6' : activeLayer === 'muscular' ? '#ef4444' : '#f59e0b'} />
              </Stage>
              <ContactShadows opacity={0.4} scale={10} blur={2} far={10} resolution={256} color="#000000" />
            </Suspense>
            <OrbitControls autoRotate={false} enablePan={false} minDistance={2} maxDistance={10} />
          </Canvas>

          {/* Canvas Overlay Controls */}
          <div className="absolute top-6 left-6 flex flex-col gap-3">
            <div className="p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
              <h2 className="text-white font-black text-xl flex items-center gap-2">
                <Activity className="w-5 h-5 text-clinical-blue" />
                {anatomyInfo.title}
              </h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Visualizador 3D Interativo</p>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 p-2 bg-black/40 backdrop-blur-md rounded-3xl border border-white/10">
            <button 
              onClick={() => setActiveLayer('osseo')}
              className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeLayer === 'osseo' ? 'bg-clinical-blue text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Sistema Ósseo
            </button>
            <button 
              onClick={() => setActiveLayer('muscular')}
              className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeLayer === 'muscular' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Muscular
            </button>
            <button 
              onClick={() => setActiveLayer('nervoso')}
              className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeLayer === 'nervoso' ? 'bg-yellow-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Nervoso
            </button>
          </div>

          <div className="absolute top-6 right-6 flex flex-col gap-3">
            <button 
              onClick={onClose}
              className="p-3 bg-black/40 backdrop-blur-md text-white rounded-2xl border border-white/10 hover:bg-red-500 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="p-3 bg-black/40 backdrop-blur-md text-white rounded-2xl border border-white/10 hover:bg-clinical-blue transition-all"
            >
              <Info className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Info Sidebar */}
        <AnimatePresence>
          {showInfo && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full md:w-80 bg-gray-900/80 backdrop-blur-xl rounded-[40px] border border-white/10 p-8 overflow-y-auto shadow-2xl"
            >
              <div className="space-y-8">
                <section className="space-y-4">
                  <h3 className="text-clinical-blue font-black text-sm uppercase tracking-widest">Descrição Anatômica</h3>
                  <p className="text-gray-300 text-sm leading-relaxed font-bold">
                    {anatomyInfo.description}
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-clinical-green font-black text-sm uppercase tracking-widest">Estruturas Chave</h3>
                  <div className="space-y-2">
                    {anatomyInfo.structures.map((s, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                        <div className="w-2 h-2 bg-clinical-green rounded-full" />
                        <span className="text-xs text-gray-300 font-bold">{s}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-purple-400 font-black text-sm uppercase tracking-widest">Biomecânica</h3>
                  <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                    <p className="text-xs text-purple-200 leading-relaxed font-bold italic">
                      "{anatomyInfo.biomechanics}"
                    </p>
                  </div>
                </section>

                <div className="pt-8">
                  <div className="p-4 bg-clinical-blue/10 rounded-2xl border border-clinical-blue/20 flex items-center gap-3">
                    <RotateCcw className="w-5 h-5 text-clinical-blue animate-spin-slow" />
                    <p className="text-[10px] text-clinical-blue font-black uppercase tracking-widest">
                      Arraste para rotacionar o modelo
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
