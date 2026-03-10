import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  RotateCcw, 
  ArrowRight,
  Type,
  Star,
  Info,
  Sparkles
} from 'lucide-react';

// --- Types ---

interface AccentQuestion {
  id: number;
  wordArm: string;
  correctSp: string;
  options: string[];
  ruleType: 'Aguda' | 'Llana' | 'Esdrújula';
  ruleDesc: string;
}

// --- Data ---

const ACCENT_QUIZ_DATA: AccentQuestion[] = [
  { id: 1, wordArm: "Սուրճ", correctSp: "Café", options: ["Café", "Cafe", "Cáfe", "Cafè"], ruleType: 'Aguda', ruleDesc: "Ավարտվում է ձայնավորով, շեշտը վերջին վանկի վրա է:" },
  { id: 2, wordArm: "Այգի", correctSp: "Jardín", options: ["Jardin", "Jardín", "Járdin", "Jardìn"], ruleType: 'Aguda', ruleDesc: "Ավարտվում է N-ով, շեշտը վերջին վանկի վրա է:" },
  { id: 3, wordArm: "Ծառ", correctSp: "Árbol", options: ["Arbol", "Árbol", "Arból", "Arbòl"], ruleType: 'Llana', ruleDesc: "Ավարտվում է L-ով, շեշտը նախավերջին վանկի վրա է:" },
  { id: 4, wordArm: "Երաժշտություն", correctSp: "Música", options: ["Musica", "Música", "Musicá", "Mùsica"], ruleType: 'Esdrújula', ruleDesc: "Շեշտը վերջից երրորդ վանկի վրա է (միշտ ունի շեշտ):" },
  { id: 5, wordArm: "Ցտեսություն", correctSp: "Adiós", options: ["Adios", "Adiós", "Ádios", "Adiòs"], ruleType: 'Aguda', ruleDesc: "Ավարտվում է S-ով, շեշտը վերջին վանկի վրա է:" },
  { id: 6, wordArm: "Հեշտ", correctSp: "Fácil", options: ["Facil", "Fácil", "Facíl", "Fàcil"], ruleType: 'Llana', ruleDesc: "Ավարտվում է L-ով, շեշտը նախավերջին վանկի վրա է:" },
  { id: 7, wordArm: "Թռչուն", correctSp: "Pájaro", options: ["Pajaro", "Pájaro", "Pajáro", "Pajaró"], ruleType: 'Esdrújula', ruleDesc: "Շեշտը վերջից երրորդ վանկի վրա է (միշտ ունի շեշտ):" },
  { id: 8, wordArm: "Երգ", correctSp: "Canción", options: ["Cancion", "Canción", "Cáncion", "Cancìon"], ruleType: 'Aguda', ruleDesc: "Ավարտվում է N-ով, շեշտը վերջին վանկի վրա է:" },
  { id: 9, wordArm: "Դժվար", correctSp: "Difícil", options: ["Dificil", "Difícil", "Dificíl", "Dìficil"], ruleType: 'Llana', ruleDesc: "Ավարտվում է L-ով, շեշտը նախավերջին վանկի վրա է:" },
  { id: 10, wordArm: "Արագ", correctSp: "Rápido", options: ["Rapido", "Rápido", "Rapidó", "Ràpido"], ruleType: 'Esdrújula', ruleDesc: "Շեշտը վերջից երրորդ վանկի վրա է (միշտ ունի շեշտ):" },
  { id: 11, wordArm: "Հայրիկ", correctSp: "Papá", options: ["Papa", "Papá", "Pápa", "Papà"], ruleType: 'Aguda', ruleDesc: "Ավարտվում է ձայնավորով, շեշտը վերջին վանկի վրա է:" },
  { id: 12, wordArm: "Մատիտ", correctSp: "Lápiz", options: ["Lapiz", "Lápiz", "Lapíz", "Làpiz"], ruleType: 'Llana', ruleDesc: "Ավարտվում է Z-ով, շեշտը նախավերջին վանկի վրա է:" },
  { id: 13, wordArm: "Շաբաթ (օր)", correctSp: "Sábado", options: ["Sabado", "Sábado", "Sabadó", "Sàbado"], ruleType: 'Esdrújula', ruleDesc: "Շեշտը վերջից երրորդ վանկի վրա է (միշտ ունի շեշտ):" },
  { id: 14, wordArm: "Երեխա", correctSp: "Bebé", options: ["Bebe", "Bebé", "Bébe", "Bebè"], ruleType: 'Aguda', ruleDesc: "Ավարտվում է ձայնավորով, շեշտը վերջին վանկի վրա է:" },
  { id: 15, wordArm: "Շաքար", correctSp: "Azúcar", options: ["Azucar", "Azúcar", "Azucár", "Azùcar"], ruleType: 'Llana', ruleDesc: "Ավարտվում է R-ով, շեշտը նախավերջին վանկի վրա է:" },
  { id: 16, wordArm: "Հեռախոս", correctSp: "Teléfono", options: ["Telefono", "Teléfono", "Telefóno", "Telèfono"], ruleType: 'Esdrújula', ruleDesc: "Շեշտը վերջից երրորդ վանկի վրա է (միշտ ունի շեշտ):" },
  { id: 17, wordArm: "Բազմոց", correctSp: "Sofá", options: ["Sofa", "Sofá", "Sófa", "Sofà"], ruleType: 'Aguda', ruleDesc: "Ավարտվում է ձայնավորով, շեշտը վերջին վանկի վրա է:" },
  { id: 18, wordArm: "Բջջային հեռախոս", correctSp: "Móvil", options: ["Movil", "Móvil", "Movíl", "Mòvil"], ruleType: 'Llana', ruleDesc: "Ավարտվում է L-ով, շեշտը նախավերջին վանկի վրա է:" },
  { id: 19, wordArm: "Բանան", correctSp: "Plátano", options: ["Platano", "Plátano", "Platanó", "Plàtano"], ruleType: 'Esdrújula', ruleDesc: "Շեշտը վերջից երրորդ վանկի վրա է (միշտ ունի շեշտ):" },
  { id: 20, wordArm: "Ինքնաթիռ", correctSp: "Avión", options: ["Avion", "Avión", "Ávion", "Aviòn"], ruleType: 'Aguda', ruleDesc: "Ավարտվում է N-ով, շեշտը վերջին վանկի վրա է:" }
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = ACCENT_QUIZ_DATA[currentIdx];
  const progress = ((currentIdx + 1) / ACCENT_QUIZ_DATA.length) * 100;

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(option);
    const correct = option === currentQuestion.correctSp;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentIdx < ACCENT_QUIZ_DATA.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-[#1e40af] bg-gradient-to-b from-[#1e40af] to-[#3b82f6] flex flex-col font-sans text-white overflow-hidden">
      {/* Header */}
      <header className="p-6 flex flex-col gap-4 max-w-2xl mx-auto w-full z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-blue-200" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase">Շեշտադրության Թեստ</h1>
          </div>
          <div className="text-sm font-bold bg-white/20 px-4 py-2 rounded-full border border-white/30">
            {currentIdx + 1} / {ACCENT_QUIZ_DATA.length}
          </div>
        </div>
        
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-300 to-white shadow-[0_0_15px_rgba(255,255,255,0.6)]"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-4 max-w-2xl mx-auto w-full overflow-y-auto custom-scrollbar relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full -z-10" />

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentIdx}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="w-full"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-8 border border-white/20 shadow-2xl flex flex-col gap-8">
                
                {/* Question Word */}
                <div className="text-center space-y-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">Ընտրեք ճիշտ գրելաձևը</span>
                  <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white drop-shadow-lg">
                    {currentQuestion.wordArm}
                  </h2>
                  <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-300 border border-white/10">
                    {currentQuestion.ruleType}
                  </div>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, i) => {
                    const isSelected = selectedOption === option;
                    const isCorrectOption = option === currentQuestion.correctSp;
                    
                    let btnClass = "bg-white/10 hover:bg-white/20 border-white/10 text-white";
                    if (selectedOption !== null) {
                      if (isCorrectOption) {
                        btnClass = "bg-green-500/40 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]";
                      } else if (isSelected) {
                        btnClass = "bg-red-500/40 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]";
                      } else {
                        btnClass = "bg-white/5 border-white/5 opacity-30 text-white/50";
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(option)}
                        disabled={selectedOption !== null}
                        className={`p-6 rounded-2xl border-2 font-black text-2xl transition-all active:scale-95 flex items-center justify-center gap-2 ${btnClass}`}
                      >
                        {option}
                        {selectedOption !== null && isCorrectOption && <CheckCircle2 className="w-6 h-6 shrink-0" />}
                        {selectedOption !== null && isSelected && !isCorrectOption && <XCircle className="w-6 h-6 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Area */}
                <AnimatePresence>
                  {isCorrect !== null && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="flex flex-col gap-4"
                    >
                      <div className={`p-5 rounded-2xl flex flex-col gap-2 ${
                        isCorrect ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        <div className="flex items-center gap-2 font-black">
                          <Info className="w-5 h-5" />
                          <span>Կանոն.</span>
                        </div>
                        <p className="text-sm opacity-90 font-medium leading-relaxed">{currentQuestion.ruleDesc}</p>
                      </div>
                      
                      <button
                        onClick={nextQuestion}
                        className="w-full py-5 bg-white text-[#1e40af] rounded-2xl font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        {currentIdx === ACCENT_QUIZ_DATA.length - 1 ? 'Արդյունքներ' : 'Հաջորդը'}
                        <ArrowRight className="w-6 h-6" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-[40px] p-12 border border-white/20 shadow-2xl text-center w-full"
            >
              <div className="relative inline-block mb-8">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#1e40af] shadow-2xl">
                  <Trophy className="w-12 h-12" />
                </div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 border-2 border-dashed border-white/30 rounded-full"
                />
              </div>

              <h2 className="text-4xl font-black mb-4">Գերազանց է:</h2>
              <div className="flex items-center justify-center gap-2 mb-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-8 h-8 ${i < Math.round((score/20)*5) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
                ))}
              </div>

              <p className="text-xl text-blue-100 mb-10">
                Դուք ճիշտ պատասխանեցիք <span className="text-white font-black text-4xl">{score}</span> հարցի {ACCENT_QUIZ_DATA.length}-ից:
              </p>
              
              <button
                onClick={resetQuiz}
                className="w-full py-5 bg-white text-[#1e40af] rounded-[24px] font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-6 h-6" />
                Կրկնել թեստը
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-white/40 text-[10px] font-bold tracking-widest uppercase">
        Իսպաներենի Ուղղագրություն • Acentuación Española
      </footer>
    </div>
  );
}
