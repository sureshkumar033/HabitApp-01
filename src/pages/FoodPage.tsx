import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Lightbulb, X } from 'lucide-react';
import { foodItems, foodCategories, foodQuestions, type FoodItem } from '@/data/food';

const categoryTips: Record<string, string> = {
  all: 'Eating a variety of colorful whole foods gives your body a broad range of nutrients. Try to fill half your plate with vegetables at every meal.',
  fruits: 'Fresh fruits are packed with vitamins, antioxidants, and fiber. Aim for 2–3 servings a day and choose whole fruits over juices.',
  vegetables: 'Vegetables provide essential vitamins, minerals, and fiber. Dark leafy greens and colorful veggies offer the most nutrients.',
  proteins: 'Protein supports muscle repair, brain function, and sustained energy. Include a protein source with every meal.',
  grains: 'Whole grains provide complex carbohydrates for steady energy. Choose brown rice, oats, and whole-wheat over refined options.',
  snacks: 'Nuts and seeds offer healthy fats, protein, and minerals. A small handful makes a satisfying, nutrient-rich snack.',
};

export default function FoodPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);

  const filtered = foodItems.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const currentTip = categoryTips[activeCategory] ?? categoryTips.all;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 pt-6 pb-24 md:pb-10 space-y-5">
      {/* Heading */}
      <div className="animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-extrabold text-sage-800">Food & Nutrition</h1>
        <p className="text-sm text-sage-500 mt-1">Explore nutritious foods and healthy eating tips</p>
      </div>

      {/* Search */}
      <div className="relative animate-slide-up">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a food..."
          className="w-full bg-white border border-sage-100 rounded-2xl pl-11 pr-10 py-3 text-sm text-sage-800 placeholder-sage-400 outline-none focus:ring-2 ring-sage-200 transition-all shadow-sm"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-sage-400 hover:text-sage-600 hover:bg-sage-50 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 animate-slide-up">
        {foodCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-sage-500 text-white shadow-sm'
                : 'bg-white text-sage-600 border border-sage-100 hover:bg-sage-50'
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tip bar */}
      <div className="flex items-start gap-3 bg-mango-50 border border-mango-100 rounded-2xl px-4 py-3.5 animate-fade-in">
        <div className="w-8 h-8 rounded-lg bg-mango-100 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-4 h-4 text-mango-500" />
        </div>
        <p className="text-xs text-sage-700 leading-relaxed pt-1">{currentTip}</p>
      </div>

      {/* Food cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-sage-50 p-8 text-center">
          <p className="text-sm text-sage-400">No foods found. Try a different search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item: FoodItem, i) => {
            const expanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-sage-50 shadow-sm overflow-hidden hover:shadow-md transition-all animate-slide-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {/* Food image */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-lg shadow-sm">
                    {item.emoji}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <button
                  onClick={() => setExpandedId(expanded ? null : item.id)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sage-800 text-sm">{item.name}</h3>
                    {expanded ? (
                      <ChevronUp className="w-4 h-4 text-sage-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-sage-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-sage-500 mt-0.5">{item.calories} cal · {item.protein} protein</p>
                </button>

                {expanded && (
                  <div className="px-4 pb-4 animate-fade-in">
                    <p className="text-sm text-sage-600 mb-3 leading-relaxed">{item.benefits}</p>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div className="text-center bg-sage-50 rounded-lg py-2">
                        <p className="text-xs font-bold text-sage-700">{item.calories}</p>
                        <p className="text-[10px] text-sage-400">cal</p>
                      </div>
                      <div className="text-center bg-sky-50 rounded-lg py-2">
                        <p className="text-xs font-bold text-sky-600">{item.protein}</p>
                        <p className="text-[10px] text-sky-400">protein</p>
                      </div>
                      <div className="text-center bg-mango-50 rounded-lg py-2">
                        <p className="text-xs font-bold text-mango-600">{item.carbs}</p>
                        <p className="text-[10px] text-mango-400">carbs</p>
                      </div>
                      <div className="text-center bg-coral-50 rounded-lg py-2">
                        <p className="text-xs font-bold text-coral-500">{item.fiber}</p>
                        <p className="text-[10px] text-coral-400">fiber</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-cream-50 rounded-lg p-3">
                      <Lightbulb className="w-3.5 h-3.5 text-mango-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-sage-600 leading-relaxed">{item.tip}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Q&A section */}
      <div className="pt-2">
        <h2 className="font-bold text-sage-800 mb-3">Common Questions</h2>
        <div className="space-y-2">
          {foodQuestions.map((q) => {
            const open = openQuestionId === q.id;
            return (
              <div key={q.id} className="bg-white rounded-2xl border border-sage-50 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenQuestionId(open ? null : q.id)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left"
                >
                  <span className="text-sm font-medium text-sage-700">{q.question}</span>
                  {open ? (
                    <ChevronUp className="w-4 h-4 text-sage-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-sage-400 flex-shrink-0" />
                  )}
                </button>
                {open && (
                  <div className="px-4 pb-4 animate-fade-in">
                    <p className="text-sm text-sage-600 leading-relaxed">{q.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-sage-400 px-4 pb-2">
        Nutrition information is approximate and for general guidance only. Not medical advice.
      </p>
    </div>
  );
}
