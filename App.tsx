
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles, Trash2, ExternalLink, RefreshCw, X } from 'lucide-react';
import { Emotion, BoardItem, ContentType, SmartInsight } from './types';
import { THEMES, EMOTION_ICONS, CONTENT_TYPE_ICONS } from './constants';
import { getSmartInsights } from './services/geminiService';

const App: React.FC = () => {
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>(Emotion.CALM);
  const [items, setItems] = useState<BoardItem[]>([
    {
      id: '1',
      type: 'NOTE',
      title: 'Deep Work Playlist',
      content: 'Listen to lo-fi beats while coding.',
      emotion: Emotion.FOCUS,
      timestamp: Date.now() - 10000
    },
    {
      id: '2',
      type: 'IMAGE',
      title: 'Ocean Sunset',
      content: 'https://picsum.photos/seed/ocean/600/400',
      emotion: Emotion.CALM,
      timestamp: Date.now() - 20000
    },
    {
      id: '3',
      type: 'LINK',
      title: 'How to Build a Startup',
      content: 'https://example.com/startup-guide',
      emotion: Emotion.MOTIVATED,
      timestamp: Date.now() - 30000
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [insights, setInsights] = useState<SmartInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const theme = THEMES[currentEmotion];

  const filteredItems = useMemo(() => {
    return items.filter(item => item.emotion === currentEmotion);
  }, [items, currentEmotion]);

  const fetchInsights = async () => {
    setIsAnalyzing(true);
    const newInsights = await getSmartInsights(items, currentEmotion);
    setInsights(newInsights);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    fetchInsights();
  }, [currentEmotion]);

  const addItem = (newItem: Omit<BoardItem, 'id' | 'timestamp'>) => {
    const item: BoardItem = {
      ...newItem,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    setItems(prev => [item, ...prev]);
    setIsAddModalOpen(false);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className={`min-h-screen mood-transition ${theme.bg} ${theme.text} pb-20`}>
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-white/30 backdrop-blur-md border-b border-white/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${theme.button} text-white`}>
            <Sparkles size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">MoodBoard AI</h1>
        </div>
        
        <div className="flex bg-white/50 p-1 rounded-2xl border border-white/40 shadow-sm">
          {Object.values(Emotion).map(emo => (
            <button
              key={emo}
              onClick={() => setCurrentEmotion(emo)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                currentEmotion === emo 
                  ? `${theme.button} text-white shadow-lg scale-105` 
                  : 'text-gray-500 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              {EMOTION_ICONS[emo]}
              <span className="hidden md:inline">{THEMES[emo].label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Board Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-extrabold mb-1">Your {THEMES[currentEmotion].label} Space</h2>
                <p className="opacity-70">A safe haven for your curated items.</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className={`p-4 rounded-full ${theme.button} text-white shadow-xl hover:scale-110 transition-transform`}
              >
                <Plus size={28} />
              </button>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredItems.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/40 border-2 border-dashed border-gray-300 rounded-3xl p-20 text-center"
                >
                  <p className="text-gray-500 font-medium">No items here yet. Click the + to add something!</p>
                </motion.div>
              ) : (
                <motion.div 
                  layout
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${theme.spacing} transition-all duration-500`}
                >
                  {filteredItems.map(item => (
                    <BoardCard key={item.id} item={item} onRemove={removeItem} theme={theme} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* AI Sidebar */}
          <aside className="w-full md:w-80 space-y-6">
            <div className={`p-6 rounded-3xl ${theme.card} border ${theme.accent} shadow-xl relative overflow-hidden`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  <Sparkles size={18} /> Smart Insights
                </h3>
                <button 
                  onClick={fetchInsights}
                  disabled={isAnalyzing}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                >
                  <RefreshCw size={16} className={isAnalyzing ? 'animate-spin' : ''} />
                </button>
              </div>
              
              <div className="space-y-4">
                {isAnalyzing ? (
                  <div className="space-y-3">
                    <div className="h-20 bg-gray-200 animate-pulse rounded-xl"></div>
                    <div className="h-20 bg-gray-200 animate-pulse rounded-xl"></div>
                  </div>
                ) : (
                  insights.map((insight, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={idx} 
                      className="text-sm border-l-2 border-indigo-400 pl-3 py-1"
                    >
                      <p className="font-semibold text-gray-900">{insight.title}</p>
                      <p className="text-gray-600 mt-1">{insight.description}</p>
                      <p className="text-indigo-600 mt-2 font-medium italic">Suggestion: {insight.suggestedAction}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            <div className={`p-6 rounded-3xl bg-indigo-900 text-white shadow-xl`}>
              <h3 className="font-bold mb-2">Feeling different?</h3>
              <p className="text-sm opacity-80 mb-4">The mood changes the very structure and flow of your board. Try switching moods to see the transformation.</p>
              <div className="flex flex-wrap gap-2">
                {Object.values(Emotion).map(emo => (
                  <button 
                    key={emo}
                    onClick={() => setCurrentEmotion(emo)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {EMOTION_ICONS[emo]}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Add Modal */}
      <AddCardModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={addItem} 
        initialEmotion={currentEmotion}
      />
    </div>
  );
};

interface BoardCardProps {
  item: BoardItem;
  onRemove: (id: string) => void;
  theme: any;
}

const BoardCard: React.FC<BoardCardProps> = ({ item, onRemove, theme }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className={`relative group p-5 rounded-3xl ${theme.card} border ${theme.accent} shadow-md hover:shadow-2xl transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${theme.icon} bg-gray-50`}>
          {CONTENT_TYPE_ICONS[item.type]}
        </div>
        <button 
          onClick={() => onRemove(item.id)}
          className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {item.type === 'IMAGE' && (
        <div className="mb-4 overflow-hidden rounded-2xl h-48 bg-gray-100">
          <img src={item.content} alt={item.title} className="w-full h-full object-cover" />
        </div>
      )}

      <h4 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h4>
      
      {item.type !== 'IMAGE' && (
        <p className="text-sm opacity-80 line-clamp-4 mb-4">
          {item.content}
        </p>
      )}

      {item.type === 'LINK' && (
        <a 
          href={item.content} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`flex items-center gap-2 text-sm font-semibold ${theme.text} underline`}
        >
          Visit Source <ExternalLink size={14} />
        </a>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] uppercase tracking-widest opacity-40 font-bold">
        <span>{new Date(item.timestamp).toLocaleDateString()}</span>
        <span>{item.type}</span>
      </div>
    </motion.div>
  );
};

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<BoardItem, 'id' | 'timestamp'>) => void;
  initialEmotion: Emotion;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, onClose, onAdd, initialEmotion }) => {
  const [type, setType] = useState<ContentType>('NOTE');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState<Emotion>(initialEmotion);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Capture the Vibe</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Content Type</label>
              <div className="flex gap-2">
                {(['NOTE', 'IMAGE', 'LINK'] as ContentType[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 border transition-all ${
                      type === t ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    {CONTENT_TYPE_ICONS[t]}
                    <span className="text-sm font-medium">{t}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What is this?"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                {type === 'NOTE' ? 'Content' : type === 'IMAGE' ? 'Image URL' : 'Link URL'}
              </label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={type === 'NOTE' ? 'Type your thoughts...' : 'Paste URL here...'}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Tag with Emotion</label>
              <div className="flex gap-2 flex-wrap">
                {Object.values(Emotion).map(emo => (
                  <button
                    key={emo}
                    onClick={() => setEmotion(emo)}
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 border transition-all ${
                      emotion === emo ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    {EMOTION_ICONS[emo]}
                    <span className="text-sm font-medium">{THEMES[emo].label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onAdd({ type, title, content, emotion })}
              disabled={!title || !content}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:shadow-none transition-all mt-4"
            >
              Add to Board
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
