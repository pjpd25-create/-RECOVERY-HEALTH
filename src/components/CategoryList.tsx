import React from 'react';
import { motion } from 'motion/react';
import { Search, Clock, Stethoscope, ArrowLeft } from 'lucide-react';
import { ClinicalCase, Specialty } from '../types';
import { SPECIALTIES, SPECIALTY_CATEGORIES } from '../constants';

interface CategoryListProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  difficultyFilter: 'Todos' | 'Fácil' | 'Médio' | 'Difícil';
  setDifficultyFilter: (diff: 'Todos' | 'Fácil' | 'Médio' | 'Difícil') => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  selectedSpecialty: Specialty;
  setSelectedSpecialty: (specialty: Specialty) => void;
  allCases: ClinicalCase[];
  handleStartCase: (c: ClinicalCase) => void;
  CATEGORIES: string[];
  onBack?: () => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  searchTerm,
  setSearchTerm,
  difficultyFilter,
  setDifficultyFilter,
  selectedCategory,
  setSelectedCategory,
  selectedSpecialty,
  setSelectedSpecialty,
  allCases,
  handleStartCase,
  CATEGORIES,
  onBack
}) => {
  const displayedCategories = SPECIALTY_CATEGORIES[selectedSpecialty] || CATEGORIES;

  return (
    <motion.div 
      key="categories"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-clinical-border dark:border-gray-700 text-clinical-muted hover:text-clinical-blue transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <div className="space-y-1">
            <h2 className="text-3xl font-bold dark:text-white">Casos Clínicos</h2>
            <p className="text-clinical-muted">Selecione uma categoria para começar o treino.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-clinical-muted" />
            <select 
              value={selectedSpecialty}
              onChange={(e) => {
                setSelectedSpecialty(e.target.value as Specialty);
                setSelectedCategory(null);
              }}
              className="pl-10 pr-4 py-2 rounded-xl border border-clinical-border dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-clinical-blue w-full sm:w-64 appearance-none"
            >
              {SPECIALTIES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-clinical-muted" />
            <input 
              type="text" 
              placeholder="Pesquisar casos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border border-clinical-border dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-clinical-blue w-full sm:w-64"
            />
          </div>
          <select 
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as any)}
            className="px-4 py-2 rounded-xl border border-clinical-border dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-clinical-blue"
          >
            <option value="Todos">Todas as Dificuldades</option>
            <option value="Fácil">Fácil</option>
            <option value="Médio">Médio</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedCategories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
            className={`p-4 rounded-xl border text-left transition-all hover:shadow-md ${selectedCategory === cat ? 'border-clinical-blue bg-blue-50 dark:bg-blue-900/20' : 'border-clinical-border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white'}`}
          >
            <p className="text-xs font-bold text-clinical-muted uppercase mb-1">Especialidade</p>
            <p className="font-bold">{cat}</p>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="space-y-6 pt-8 border-t border-clinical-border dark:border-gray-700">
          <h3 className="text-xl font-bold dark:text-white">Casos Disponíveis: {selectedCategory}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allCases
              .filter(c => c.specialty === selectedSpecialty && c.category === selectedCategory)
              .filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.patient.complaint.toLowerCase().includes(searchTerm.toLowerCase()))
              .filter(c => difficultyFilter === 'Todos' || c.difficulty === difficultyFilter)
              .map(c => (
              <div key={c.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-clinical-border dark:border-gray-700 overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-shadow">
                <div className="relative w-full sm:w-40 h-40">
                  <img 
                    src={c.image} 
                    alt={c.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 dark:bg-gray-800/90 rounded text-[10px] font-bold uppercase tracking-wider dark:text-white">
                    {c.difficulty}
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-lg dark:text-white">{c.title}</h4>
                    <p className="text-sm text-clinical-muted">{c.patient.age} anos • {c.patient.profession}</p>
                    <p className="text-sm mt-2 line-clamp-2 italic dark:text-gray-300">"{c.patient.complaint}"</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-clinical-muted flex items-center gap-1"><Clock className="w-3 h-3" /> {c.estimatedTime} min</span>
                    <button 
                      onClick={() => handleStartCase(c)}
                      className="px-4 py-2 bg-clinical-blue text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors"
                    >
                      Analisar Caso
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
