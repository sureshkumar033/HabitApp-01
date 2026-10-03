import { Home, MessageCircle, CheckSquare, Apple, TrendingUp, Heart } from 'lucide-react';

export type Page = 'home' | 'chat' | 'habits' | 'food' | 'progress';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'chat', label: 'AI Chat', icon: MessageCircle },
  { id: 'habits', label: 'Habits', icon: CheckSquare },
  { id: 'food', label: 'Food & Nutrition', icon: Apple },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-64 flex-col bg-white border-r border-sage-100 z-40">
        <div className="px-6 py-7">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-sage-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div className="text-left">
              <span className="font-bold text-lg text-sage-800 block leading-tight">HealthyMate</span>
              <span className="text-[10px] text-sage-400 font-medium">Wellness Companion</span>
            </div>
          </button>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-sage-500 text-white shadow-sm shadow-sage-200'
                    : 'text-sage-600 hover:bg-sage-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-sage-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-6 py-5 border-t border-sage-50">
          <p className="text-[10px] text-sage-400 leading-relaxed">
            General wellness tips, not medical advice. Always consult a healthcare professional.
          </p>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-sage-100 px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all"
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  active ? 'bg-sage-500 scale-110' : 'scale-100'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${active ? 'text-white' : 'text-sage-400'}`}
                />
              </div>
              <span
                className={`text-[9px] font-medium ${
                  active ? 'text-sage-700' : 'text-sage-400'
                }`}
              >
                {item.label === 'Food & Nutrition' ? 'Food' : item.label === 'AI Chat' ? 'Chat' : item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
