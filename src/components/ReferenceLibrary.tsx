import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { 
  Search, 
  Book, 
  ChevronRight, 
  Filter, 
  X, 
  Info, 
  Layers, 
  Activity, 
  Hash, 
  Star, 
  Clock, 
  ExternalLink, 
  Stethoscope, 
  Heart,
  Share2,
  Bookmark,
  History,
  TrendingUp,
  Lightbulb,
  Globe,
  GraduationCap,
  Library,
  BookCopy
} from 'lucide-react';
import { REFERENCE_DATA } from '../data/referenceData';
import { Reference, Specialty } from '../types';
import { generateBookPage, BookContent } from '../services/bookService';

interface ReferenceLibraryProps {
  onBack: () => void;
  showAlert: (title: string, message: string) => void;
  initialShowCabinet?: boolean;
}

export const ReferenceLibrary: React.FC<ReferenceLibraryProps> = ({ 
  onBack, 
  showAlert, 
  initialShowCabinet = false 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [showCabinet, setShowCabinet] = useState(initialShowCabinet);

  // Acervo expandido e sistema de simulação de 4 bilhões de obras
  const ALL_CABINET_BOOKS = [
    { id: 'book-001', title: 'Tratado de Fisiologia Médica', author: 'Guyton & Hall', category: 'Fisiologia', year: '2021', pages: 1120, cover: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&q=80' },
    { id: 'book-002', title: 'Anatomia Orientada para a Clínica', author: 'Keith Moore', category: 'Anatomia', year: '2020', pages: 1104, cover: 'https://images.unsplash.com/photo-1559757117-574196d883cb?auto=format&fit=crop&q=80' },
    { id: 'book-003', title: 'Neurociências: Desvendando o Sistema Nervoso', author: 'Bear, Connors, Paradiso', category: 'Neurologia', year: '2019', pages: 928, cover: 'https://images.unsplash.com/photo-1559757117-574196d883cb?auto=format&fit=crop&q=80' },
    { id: 'book-004', title: 'Fisioterapia Cardiorrespiratória', author: 'George G. Burton', category: 'Cardiopulmonar', year: '2022', pages: 850, cover: 'https://images.unsplash.com/photo-1581594658553-359424894293?auto=format&fit=crop&q=80' },
    { id: 'book-005', title: 'Ortopedia e Traumatologia', author: 'Hebert & Barros', category: 'Ortopedia', year: '2021', pages: 1400, cover: 'https://images.unsplash.com/photo-1579154235602-3c2c2aa5d72e?auto=format&fit=crop&q=80' },
    { id: 'book-006', title: 'Cinesiologia do Aparelho Musculoesquelético', author: 'Donald Neumann', category: 'Biomecânica', year: '2018', pages: 768, cover: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80' },
    { id: 'book-007', title: 'Medicina Interna de Harrison', author: 'Jameson, Fauci, et al.', category: 'Medicina Interna', year: '2022', pages: 3500, cover: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80' },
    { id: 'book-008', title: 'Farmacologia Básica e Clínica', author: 'Katzung & Trevor', category: 'Farmacologia', year: '2021', pages: 1264, cover: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80' },
    { id: 'book-009', title: 'Atlas de Anatomia Humana', author: 'Frank H. Netter', category: 'Anatomia', year: '2023', pages: 672, cover: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80' },
    { id: 'book-010', title: 'Tratado de Medicina de Reabilitação', author: 'DeLisa', category: 'Reabilitação', year: '2020', pages: 2100, cover: 'https://images.unsplash.com/photo-1576091160291-2247fb052bb7?auto=format&fit=crop&q=80' },
    { id: 'book-011', title: 'Bases da Fisioterapia Respiratória', author: 'Scanlan', category: 'Cardiopulmonar', year: '2021', pages: 1100, cover: 'https://images.unsplash.com/photo-1581594658502-2b9954cc39fc?auto=format&fit=crop&q=80' },
    { id: 'book-012', title: 'Bioestatística Princípios e Aplicações', author: 'Sonia Vieira', category: 'Ciência', year: '2019', pages: 400, cover: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80' },
    { id: 'book-013', title: 'Tratado de Neurologia Médica', author: 'Adams & Victor', category: 'Neurologia', year: '2023', pages: 1600, cover: 'https://images.unsplash.com/photo-1559757117-574196d883cb?auto=format&fit=crop&q=80' },
    { id: 'book-014', title: 'Manual de Fisioterapia na UTI', author: 'Reginaldo Resende', category: 'Intensivismo', year: '2022', pages: 800, cover: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80' },
    { id: 'book-015', title: 'Semiologia Médica', author: 'Porto & Porto', category: 'Semiologia', year: '2021', pages: 1200, cover: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&q=80' },
    { id: 'book-016', title: 'Biofísica Médica', author: 'Okuno & Chow', category: 'Biofísica', year: '2020', pages: 550, cover: 'https://images.unsplash.com/photo-1576086213369-97a306dca665?auto=format&fit=crop&q=80' },
    { id: 'book-017', title: 'Imunologia de Janeway', author: 'Murphy & Weaver', category: 'Imunologia', year: '2022', pages: 900, cover: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&q=80' },
    { id: 'book-018', title: 'Patologia: Bases Patológicas das Doenças', author: 'Robbins & Cotran', category: 'Patologia', year: '2021', pages: 1400, cover: 'https://images.unsplash.com/photo-1576086213369-97a306dca665?auto=format&fit=crop&q=80' },
    { id: 'book-019', title: 'Bioquímica Ilustrada de Harper', author: 'Rodwell et al.', category: 'Bioquímica', year: '2023', pages: 850, cover: 'https://images.unsplash.com/photo-1531050171651-71fb4b02bb62?auto=format&fit=crop&q=80' },
    { id: 'book-020', title: 'Embriologia Clínica', author: 'Keith L. Moore', category: 'Embriologia', year: '2020', pages: 560, cover: 'https://images.unsplash.com/photo-1559757117-574196d883cb?auto=format&fit=crop&q=80' },
  ];

  const [selectedReference, setSelectedReference] = useState<Reference | null>(null);
  const [viewingBook, setViewingBook] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageContent, setPageContent] = useState<BookContent | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [cabinetSearch, setCabinetSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('clinical_library_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('clinical_library_recent_searches');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem('clinical_library_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('clinical_library_recent_searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    if (viewingBook) {
      const loadPage = async () => {
        setIsLoadingContent(true);
        const content = await generateBookPage(
          viewingBook.title,
          viewingBook.author,
          currentPage,
          viewingBook.category
        );
        setPageContent(content);
        setIsLoadingContent(false);
      };
      loadPage();
    } else {
      setPageContent(null);
      setCurrentPage(1);
    }
  }, [viewingBook, currentPage]);

  const cabinetBooks = useMemo(() => {
    if (!cabinetSearch) return ALL_CABINET_BOOKS;
    const query = cabinetSearch.toLowerCase();
    return ALL_CABINET_BOOKS.filter(b => 
      b.title.toLowerCase().includes(query) || 
      b.author.toLowerCase().includes(query) || 
      b.category.toLowerCase().includes(query)
    );
  }, [cabinetSearch]);

  const categories = useMemo(() => {
    const cats = new Set(REFERENCE_DATA.map(r => r.category));
    return Array.from(cats);
  }, []);

  const specialties = useMemo(() => {
    const specs = new Set<Specialty>();
    REFERENCE_DATA.forEach(r => {
      r.relatedSpecialties?.forEach(s => specs.add(s));
    });
    return Array.from(specs);
  }, []);

  const featuredReference = useMemo(() => {
    const withPearls = REFERENCE_DATA.filter(r => r.clinicalPearl);
    if (withPearls.length === 0) return REFERENCE_DATA[0];
    
    // Simple pseudo-random based on date to keep it consistent for the day
    const day = new Date().getDate();
    return withPearls[day % withPearls.length];
  }, []);

  const filteredData = useMemo(() => {
    let data = REFERENCE_DATA;
    
    if (showFavoritesOnly) {
      data = data.filter(item => favorites.includes(item.id));
    }

    if (selectedCategory) {
      data = data.filter(item => item.category === selectedCategory);
    }

    if (selectedSpecialty) {
      data = data.filter(item => item.relatedSpecialties?.includes(selectedSpecialty));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      data = data.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query)) ||
        item.relatedSpecialties?.some(s => s.toLowerCase().includes(query))
      );
    }
    
    return data;
  }, [searchQuery, selectedCategory, showFavoritesOnly, favorites]);

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches(prev => [query.trim(), ...prev].slice(0, 5));
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div className="min-h-screen bg-clinical-bg dark:bg-gray-950 pb-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
            alt="Library Background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-clinical-bg/0 via-clinical-bg/50 to-clinical-bg dark:from-gray-950/0 dark:via-gray-950/50 dark:to-gray-950"></div>
        </div>
        
        <div className="relative z-10 space-y-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-clinical-blue/10 rounded-full text-clinical-blue text-xs font-black uppercase tracking-widest"
          >
            <Globe className="w-4 h-4 animate-spin-slow" /> Biblioteca Global e Universal
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase dark:text-white leading-none"
          >
            O Globo do <span className="text-clinical-blue">Saber Clínico</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-clinical-muted font-medium max-w-2xl mx-auto"
          >
            Explore o vasto universo da saúde. Uma base de dados expandida que transcende fronteiras, conectando anatomia, patologia e ciência baseada em evidências.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <button 
              onClick={() => setShowCabinet(false)}
              className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 ${!showCabinet ? 'bg-clinical-blue text-white shadow-xl scale-105' : 'bg-white dark:bg-gray-800 text-clinical-muted border border-clinical-border dark:border-gray-700 hover:border-clinical-blue'}`}
            >
              <Globe className="w-5 h-5" /> Globo Universal
            </button>
            <button 
              onClick={() => setShowCabinet(true)}
              className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 ${showCabinet ? 'bg-amber-600 text-white shadow-xl scale-105' : 'bg-white dark:bg-gray-800 text-clinical-muted border border-clinical-border dark:border-gray-700 hover:border-amber-600'}`}
            >
              <Library className="w-5 h-5" /> Armário PedroJoaquim
            </button>
          </motion.div>
        </div>
      </div>

      {!showCabinet ? (
        <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20 space-y-12">
        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-900 p-2 rounded-[32px] shadow-2xl border border-clinical-border dark:border-gray-800 flex flex-col md:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-clinical-muted" />
            <input 
              type="text"
              placeholder="O que deseja aprender hoje? (ex: LCA, Phalen, Dispneia...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              className="w-full pl-16 pr-6 py-6 bg-transparent outline-none text-xl font-bold dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700"
            />
          </div>
          <div className="flex items-center gap-2 p-2 w-full md:w-auto">
            <button 
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex-1 md:flex-none px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 ${showFavoritesOnly ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-gray-100 dark:bg-gray-800 text-clinical-muted hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              <Bookmark className={`w-4 h-4 ${showFavoritesOnly ? 'fill-white' : ''}`} /> Favoritos
            </button>
            <button 
              onClick={onBack}
              className="flex-1 md:flex-none px-8 py-4 bg-clinical-text text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-black transition-all"
            >
              Voltar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Filters */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Item Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setSelectedReference(featuredReference)}
              className="p-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-[32px] text-white space-y-4 shadow-xl shadow-amber-500/20 cursor-pointer hover:scale-[1.02] transition-all relative overflow-hidden group"
            >
              <div className="absolute -top-4 -right-4 opacity-20 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/20 w-fit px-3 py-1 rounded-full">
                <Star className="w-3 h-3 fill-white" /> Pérola do Dia
              </div>
              <h4 className="text-xl font-black uppercase tracking-tight leading-tight">{featuredReference.title}</h4>
              <p className="text-sm text-white/80 line-clamp-2 italic">
                "{featuredReference.clinicalPearl}"
              </p>
              <div className="pt-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                Ver Detalhes <ChevronRight className="w-3 h-3" />
              </div>
            </motion.div>

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-clinical-muted flex items-center gap-2">
                <Filter className="w-3 h-3" /> Categorias
              </h3>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setShowCabinet(true)}
                  className="px-6 py-4 rounded-2xl text-left font-black uppercase tracking-widest text-[10px] transition-all bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-xl shadow-amber-600/20 hover:scale-105 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <Library className="w-4 h-4" /> Armário de Elite
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </button>
                <div className="h-4" />
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-4 rounded-2xl text-left font-bold transition-all border ${!selectedCategory ? 'bg-clinical-blue border-clinical-blue text-white shadow-xl shadow-clinical-blue/20' : 'bg-white dark:bg-gray-900 border-clinical-border dark:border-gray-800 text-clinical-muted hover:border-clinical-blue'}`}
                >
                  Todas as Áreas
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setSelectedSpecialty(null); }}
                    className={`px-6 py-4 rounded-2xl text-left font-bold transition-all border ${selectedCategory === cat ? 'bg-clinical-blue border-clinical-blue text-white shadow-xl shadow-clinical-blue/20' : 'bg-white dark:bg-gray-900 border-clinical-border dark:border-gray-800 text-clinical-muted hover:border-clinical-blue'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-clinical-muted flex items-center gap-2">
                <Stethoscope className="w-3 h-3" /> Especialidades
              </h3>
              <div className="flex flex-wrap gap-2">
                {specialties.map(spec => (
                  <button 
                    key={spec}
                    onClick={() => { setSelectedSpecialty(selectedSpecialty === spec ? null : spec); setSelectedCategory(null); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${selectedSpecialty === spec ? 'bg-clinical-blue border-clinical-blue text-white shadow-lg shadow-clinical-blue/20' : 'bg-white dark:bg-gray-900 border-clinical-border dark:border-gray-800 text-clinical-muted hover:border-clinical-blue'}`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            {recentSearches.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black uppercase tracking-widest text-clinical-muted flex items-center gap-2">
                    <History className="w-3 h-3" /> Recentes
                  </h3>
                  <button onClick={clearRecentSearches} className="text-[10px] font-bold text-red-500 uppercase hover:underline">Limpar</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map(s => (
                    <button 
                      key={s}
                      onClick={() => setSearchQuery(s)}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-bold text-clinical-muted hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 bg-gradient-to-br from-clinical-blue to-blue-700 rounded-3xl text-white space-y-4 shadow-xl shadow-clinical-blue/20">
              <TrendingUp className="w-8 h-8 opacity-50" />
              <h4 className="text-xl font-black uppercase tracking-tight leading-tight">Mantenha-se Atualizado</h4>
              <p className="text-sm text-white/80 leading-relaxed">
                Adicionamos novos termos e procedimentos semanalmente baseados nas diretrizes clínicas mais recentes.
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase tracking-tight dark:text-white">
                {showFavoritesOnly ? 'Os Meus Favoritos' : selectedCategory || 'Explorar Tudo'}
                <span className="ml-3 text-sm font-bold text-clinical-muted bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  {filteredData.length} resultados
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedReference(item)}
                    className="group bg-white dark:bg-gray-900 rounded-[32px] border border-clinical-border dark:border-gray-800 overflow-hidden hover:border-clinical-blue hover:shadow-2xl transition-all cursor-pointer flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image || `https://picsum.photos/seed/${item.id}/600/400`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        alt={item.title}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <button 
                          onClick={(e) => toggleFavorite(item.id, e)}
                          className={`p-3 rounded-2xl backdrop-blur-md border border-white/20 transition-all ${favorites.includes(item.id) ? 'bg-amber-500 text-white border-amber-400' : 'bg-black/20 text-white hover:bg-black/40'}`}
                        >
                          <Bookmark className={`w-4 h-4 ${favorites.includes(item.id) ? 'fill-white' : ''}`} />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-clinical-blue text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-black uppercase tracking-tight dark:text-white leading-tight group-hover:text-clinical-blue transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-clinical-muted line-clamp-3 leading-relaxed">
                          {item.content.replace(/[#*`]/g, '')}
                        </p>
                      </div>

                      <div className="pt-4 mt-auto border-t border-clinical-border dark:border-gray-800 flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {item.relatedSpecialties?.slice(0, 3).map((s, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-900 flex items-center justify-center" title={s}>
                              <Stethoscope className="w-3 h-3 text-clinical-blue" />
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-clinical-muted uppercase tracking-widest flex items-center gap-1">
                          Ler Mais <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredData.length === 0 && (
              <div className="py-32 text-center space-y-6 bg-white dark:bg-gray-900 rounded-[40px] border border-dashed border-clinical-border dark:border-gray-800">
                <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto text-clinical-muted">
                  <Search className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tight dark:text-white">Nenhum termo encontrado</h3>
                  <p className="text-clinical-muted max-w-md mx-auto">
                    Não conseguimos encontrar o que procura. Tente usar termos mais genéricos ou explore as categorias laterais.
                  </p>
                </div>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory(null); setSelectedSpecialty(null); setShowFavoritesOnly(false); }}
                  className="px-8 py-3 bg-clinical-blue text-white rounded-xl font-bold uppercase tracking-widest text-sm"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      ) : (
        /* ARMÁRIO PEDROJOAQUIM SECTION */
        <div className="max-w-7xl mx-auto px-6 mt-12 relative z-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Stats Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-amber-600 p-8 rounded-[40px] text-white space-y-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-1000" />
                <Library className="w-12 h-12 mb-4" />
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tight leading-none mb-2">Acervo Digital</h3>
                  <p className="text-amber-100 text-sm font-medium">Bases de dados mundiais integradas.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                    <p className="text-[10px] uppercase font-black tracking-widest text-amber-200">Livros</p>
                    <p className="text-xl font-black">+4B</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                    <p className="text-[10px] uppercase font-black tracking-widest text-amber-200">Especialidades</p>
                    <p className="text-xl font-black">24</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] border border-clinical-border dark:border-gray-800 shadow-xl space-y-6">
                <div className="flex items-center gap-3 text-amber-600">
                  <BookCopy className="w-6 h-6" />
                  <h3 className="font-black uppercase tracking-widest text-xs">Curadoria do Fundador</h3>
                </div>
                <p className="text-clinical-muted text-sm font-medium leading-relaxed">
                  "O Armário PedroJoaquim nasceu da vontade de democratizar o acesso à literatura médica de ponta. Aqui, o conhecimento não tem dono."
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold">PJ</div>
                  <div>
                    <p className="text-xs font-black dark:text-white uppercase leading-none">Pedro Joaquim</p>
                    <p className="text-[10px] text-clinical-muted">Chief Strategist</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bookshelves */}
            <div className="lg:col-span-3 space-y-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-gray-900 p-8 rounded-[40px] border border-clinical-border dark:border-gray-800 shadow-xl">
                <div className="flex-1 w-full relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-amber-600" />
                  <input 
                    type="text" 
                    placeholder="Pesquisar entre 4 bilhões de obras..."
                    value={cabinetSearch}
                    onChange={(e) => setCabinetSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && cabinetSearch.trim()) {
                        window.open(`https://scholar.google.com/scholar?q=${encodeURIComponent(cabinetSearch)}`, '_blank');
                      }
                    }}
                    className="w-full pl-16 pr-24 py-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-amber-600/30 outline-none transition-all dark:text-white text-lg font-medium"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                    <button 
                      onClick={() => cabinetSearch.trim() && window.open(`https://scholar.google.com/scholar?q=${encodeURIComponent(cabinetSearch)}`, '_blank')}
                      className="hidden md:inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-700 transition-all shadow-lg"
                    >
                      Pesquisa Global
                    </button>
                    <span className="hidden md:inline-flex items-center px-3 py-1 bg-amber-600/10 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-600/20">Index</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cabinetBooks.map((book, idx) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-white dark:bg-gray-900 rounded-[40px] border border-clinical-border dark:border-gray-800 shadow-xl overflow-hidden hover:shadow-2xl transition-all h-full flex flex-col"
                  >
                    <div className="flex flex-1">
                      <div className="w-40 bg-amber-600 relative flex items-center justify-center p-4">
                        <img 
                          src={book.cover} 
                          className="w-full h-full object-cover rounded shadow-lg group-hover:scale-105 transition-transform"
                          alt={book.title}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <div className="flex-1 p-8 space-y-4 flex flex-col">
                        <div className="flex-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-600/10 px-3 py-1 rounded-full">
                            {book.category}
                          </span>
                          <h4 className="text-xl font-black dark:text-white mt-4 group-hover:text-amber-600 transition-colors leading-tight">{book.title}</h4>
                          <p className="text-clinical-muted text-sm font-bold mt-1">Por {book.author}</p>
                          <div className="flex items-center gap-4 mt-4 text-[10px] font-black uppercase tracking-widest text-clinical-muted">
                            <span className="flex items-center gap-1"><Book className="w-3 h-3" /> {book.pages} páginas</span>
                            <span>•</span>
                            <span>{book.year}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 pt-4">
                          <button 
                            onClick={() => setViewingBook(book)}
                            className="flex-1 py-4 bg-amber-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-amber-700 transition-all shadow-xl hover:shadow-amber-600/20 active:scale-95"
                          >
                            Ler PDF Completo
                          </button>
                          <button 
                            onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(book.title + ' ' + book.author + ' pdf original volume filetype:pdf')}`, '_blank')}
                            className="p-4 bg-gray-100 dark:bg-gray-800 text-clinical-muted rounded-2xl hover:bg-gray-200 transition-all group relative"
                            title="Procurar PDF no Acervo Mundial"
                          >
                            <ExternalLink className="w-5 h-5 group-hover:text-amber-600 transition-colors" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[8px] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                              Busca Global
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* PDF Reader Simulation Modal */}
      <AnimatePresence>
        {viewingBook && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingBook(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full h-full max-w-7xl md:h-[95vh] bg-white dark:bg-gray-900 md:rounded-[40px] shadow-3xl overflow-hidden flex flex-col border border-white/10"
            >
              {/* Header Bar */}
              <div className="bg-gray-100 dark:bg-gray-800 p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-clinical-border dark:border-gray-700">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Book className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-black dark:text-white uppercase truncate">{viewingBook.title}</h3>
                    <p className="text-xs text-clinical-muted font-bold tracking-widest uppercase truncate">{viewingBook.author} • {viewingBook.year}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-xl text-xs font-black dark:text-white uppercase">
                    Página <span className="text-amber-600">{currentPage}</span> / {viewingBook.pages}
                  </div>
                  <button 
                    onClick={() => { setViewingBook(null); setCurrentPage(1); }}
                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Reader Body */}
              <div className="flex-1 overflow-auto bg-gray-200 dark:bg-black/50 p-4 md:p-12 flex justify-center custom-scrollbar">
                <motion.div 
                  key={currentPage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-4xl bg-white dark:bg-gray-950 shadow-2xl p-8 md:p-16 space-y-12 relative min-h-[140vh]"
                >
                  {/* Page Watermark */}
                  <div className="absolute top-8 right-8 text-[8px] font-black uppercase tracking-[0.5em] text-gray-100 dark:text-white/5 pointer-events-none rotate-90 origin-right">
                    Propriedade Intelectual • {viewingBook.author} • Ref-{viewingBook.id}
                  </div>

                  {isLoadingContent ? (
                    <div className="flex flex-col items-center justify-center py-40 space-y-8">
                       <div className="w-16 h-16 border-4 border-amber-600/20 border-t-amber-600 rounded-full animate-spin" />
                       <div className="text-center space-y-2">
                         <p className="text-sm font-black uppercase tracking-widest text-amber-600">Sincronizando com o Acervo</p>
                         <p className="text-xs text-clinical-muted font-bold">Desencriptando dados da página {currentPage}...</p>
                       </div>
                    </div>
                  ) : pageContent ? (
                    <>
                      {currentPage === 1 ? (
                        <div className="text-center space-y-8 border-b-2 border-gray-100 dark:border-gray-800 pb-16">
                          <Library className="w-16 h-16 text-amber-600 mx-auto" />
                          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter dark:text-white leading-tight">{viewingBook.title}</h1>
                          <div className="space-y-2">
                            <p className="text-xl font-bold dark:text-gray-300 italic">Tratado Técnico Internacional</p>
                            <p className="text-amber-600 font-black uppercase tracking-[0.4em] text-sm mt-4">{viewingBook.author}</p>
                            <div className="w-24 h-1 bg-amber-600 mx-auto mt-6 rounded-full" />
                          </div>
                          
                          <div className="pt-16 prose prose-lg dark:prose-invert max-w-none text-justify">
                            <p className="text-gray-600 dark:text-gray-400 leading-loose">
                              {pageContent.text}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-10">
                          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600">{pageContent.chapterTitle}</span>
                            <span className="text-[10px] font-black uppercase tracking-wider text-clinical-muted">Página {currentPage}</span>
                          </div>
                          
                          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight dark:text-white">
                              {pageContent.chapterTitle}
                            </h2>
                            
                            <div className="text-gray-600 dark:text-gray-400 leading-relaxed text-justify whitespace-pre-line">
                              {pageContent.text}
                            </div>

                            {pageContent.footerNote && (
                              <div className="p-8 bg-gray-50 dark:bg-gray-900 border-l-8 border-amber-600 rounded-3xl mt-12">
                                <h4 className="text-xs font-black uppercase tracking-widest text-amber-600 mb-2">Nota Técnica</h4>
                                <p className="text-sm font-medium dark:text-gray-300 italic">"{pageContent.footerNote}"</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="pt-32 text-center text-[10px] font-black uppercase tracking-widest text-clinical-muted border-t border-gray-100 dark:border-gray-800 flex justify-between items-center mt-auto">
                        <span>© {viewingBook.year} {viewingBook.author}</span>
                        <span>{viewingBook.title} - Página {currentPage} de {viewingBook.pages}</span>
                      </div>
                    </>
                  ) : null}
                </motion.div>
              </div>

              {/* Footer Navigation */}
              <div className="bg-white dark:bg-gray-800 p-6 flex items-center justify-center gap-4 md:gap-8 border-t border-clinical-border dark:border-gray-700">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 dark:bg-gray-700 text-clinical-muted hover:bg-amber-600 hover:text-white'}`}
                >
                  Anterior
                </button>
                
                <div className="hidden md:flex gap-2">
                  {[...Array(Math.min(5, viewingBook.pages))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button 
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${currentPage === pageNum ? 'bg-amber-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-700 text-clinical-muted hover:bg-gray-200'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {viewingBook.pages > 5 && <span className="flex items-center px-2">...</span>}
                </div>

                <div className="md:hidden font-black text-xs">
                  {currentPage} / {viewingBook.pages}
                </div>

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(viewingBook.pages, prev + 1))}
                  disabled={currentPage === viewingBook.pages}
                  className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${currentPage === viewingBook.pages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-amber-600 text-white hover:bg-amber-700 shadow-xl shadow-amber-600/20'}`}
                >
                  Seguinte
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedReference && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReference(null)}
              className="absolute inset-0 bg-clinical-text/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-[48px] shadow-2xl overflow-hidden border border-white/10 max-h-[90vh] flex flex-col"
            >
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="relative h-[40vh]">
                  <img 
                    src={selectedReference.image || `https://picsum.photos/seed/${selectedReference.id}/1200/800`} 
                    className="w-full h-full object-cover"
                    alt={selectedReference.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-transparent to-transparent"></div>
                  <button 
                    onClick={() => setSelectedReference(null)}
                    className="absolute top-8 right-8 p-4 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  
                  <div className="absolute bottom-8 left-8 right-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-1.5 bg-clinical-blue text-white text-xs font-black uppercase tracking-widest rounded-full shadow-xl">
                        {selectedReference.category}
                      </span>
                      <div className="flex gap-2">
                        {selectedReference.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-lg border border-white/20">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase dark:text-white leading-none">
                      {selectedReference.title}
                    </h2>
                  </div>
                </div>

                <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-widest text-clinical-muted flex items-center gap-2">
                        <Info className="w-4 h-4" /> Descrição Clínica
                      </h3>
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <div className="text-clinical-text dark:text-gray-200 leading-relaxed">
                          <Markdown>{selectedReference.content}</Markdown>
                        </div>
                      </div>

                      {/* Google Scholar Deep Search Button */}
                      <div className="pt-6">
                        <a 
                          href={`https://scholar.google.com/scholar?q=${encodeURIComponent(selectedReference.title + ' ' + selectedReference.category)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 px-6 py-3 bg-gray-50 dark:bg-gray-800 border border-clinical-border dark:border-gray-700 rounded-2xl text-clinical-muted hover:text-clinical-blue hover:border-clinical-blue transition-all group"
                        >
                          <div className="w-10 h-10 bg-clinical-blue/10 rounded-xl flex items-center justify-center text-clinical-blue group-hover:bg-clinical-blue group-hover:text-white transition-all">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Evidência Científica</p>
                            <p className="font-bold text-sm">Pesquisar no Google Académico</p>
                          </div>
                          <ExternalLink className="w-4 h-4 ml-4 opacity-30 group-hover:opacity-100" />
                        </a>
                        <p className="mt-3 text-[10px] text-clinical-muted ml-1">
                          Recomendado para verificar as fontes mais recentes, ensaios clínicos e diretrizes internacionais sobre {selectedReference.title.toLowerCase()}.
                        </p>
                      </div>
                    </div>

                    {selectedReference.clinicalPearl && (
                      <div className="p-8 bg-amber-50 dark:bg-amber-900/10 rounded-[32px] border border-amber-200 dark:border-amber-900/30 space-y-4 relative overflow-hidden">
                        <div className="absolute -top-4 -right-4 opacity-10">
                          <Lightbulb className="w-32 h-32 text-amber-500" />
                        </div>
                        <h3 className="text-amber-600 dark:text-amber-400 font-black uppercase tracking-widest text-sm flex items-center gap-2">
                          <Lightbulb className="w-5 h-5" /> Pérola Clínica
                        </h3>
                        <p className="text-amber-900 dark:text-amber-200 text-lg font-bold leading-relaxed relative z-10">
                          "{selectedReference.clinicalPearl}"
                        </p>
                      </div>
                    )}

                    {selectedReference.relatedReferences && selectedReference.relatedReferences.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-clinical-muted flex items-center gap-2">
                          <Layers className="w-4 h-4" /> Conteúdos Relacionados
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedReference.relatedReferences.map(refId => {
                            const ref = REFERENCE_DATA.find(r => r.id === refId);
                            if (!ref) return null;
                            return (
                              <button
                                key={refId}
                                onClick={() => setSelectedReference(ref)}
                                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-clinical-border dark:border-gray-700 rounded-2xl hover:border-clinical-blue transition-all text-left group"
                              >
                                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                                  <img src={ref.image} className="w-full h-full object-cover" alt={ref.title} referrerPolicy="no-referrer" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-bold dark:text-white truncate group-hover:text-clinical-blue transition-colors">{ref.title}</h4>
                                  <p className="text-[10px] text-clinical-muted uppercase font-black tracking-widest">{ref.category}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-clinical-muted group-hover:text-clinical-blue" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-8">
                    <div className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-[32px] border border-clinical-border dark:border-gray-700 space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-clinical-muted">Especialidades Relacionadas</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedReference.relatedSpecialties?.map(s => (
                            <span key={s} className="px-4 py-2 bg-white dark:bg-gray-900 border border-clinical-border dark:border-gray-800 rounded-xl text-xs font-bold dark:text-white">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {selectedReference.externalLinks && selectedReference.externalLinks.length > 0 && (
                        <div className="pt-6 border-t border-clinical-border dark:border-gray-700 space-y-4">
                          <h4 className="text-xs font-black uppercase tracking-widest text-clinical-muted">Links Externos</h4>
                          <div className="space-y-2">
                            {selectedReference.externalLinks.map((link, i) => (
                              <a 
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 border border-clinical-border dark:border-gray-800 rounded-xl text-xs font-bold text-clinical-blue hover:bg-clinical-blue hover:text-white transition-all group"
                              >
                                {link.label}
                                <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-6 border-t border-clinical-border dark:border-gray-700 space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-clinical-muted">Metadados</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-clinical-muted">ID de Referência</span>
                            <span className="font-mono font-bold dark:text-white">{selectedReference.id}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-clinical-muted">Última Revisão</span>
                            <span className="font-bold dark:text-white">{new Date(selectedReference.lastUpdated).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={() => toggleFavorite(selectedReference.id)}
                        className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 ${favorites.includes(selectedReference.id) ? 'bg-amber-500 text-white' : 'bg-white dark:bg-gray-800 border border-clinical-border dark:border-gray-700 text-clinical-muted'}`}
                      >
                        <Bookmark className={`w-4 h-4 ${favorites.includes(selectedReference.id) ? 'fill-white' : ''}`} />
                        {favorites.includes(selectedReference.id) ? 'Remover dos Favoritos' : 'Guardar nos Favoritos'}
                      </button>
                      <button className="w-full py-4 bg-clinical-blue text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-clinical-blue/20">
                        <Share2 className="w-4 h-4" /> Partilhar Recurso
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
