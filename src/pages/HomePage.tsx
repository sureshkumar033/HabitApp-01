import {
  Heart, Droplets, Coffee, Footprints, Moon, ArrowRight, Sparkles,
  MessageCircle, CheckSquare, Apple, TrendingUp, Check, type LucideIcon,
} from 'lucide-react';
import type { Page } from '@/components/Navbar';
import { dailyHabits, iconMap } from '@/data/habits';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  completedHabits: string[];
}

const quickActions: { icon: LucideIcon; label: string; page: Page; color: string }[] = [
  { icon: MessageCircle, label: 'Ask AI', page: 'chat', color: 'bg-sage-100 text-sage-600' },
  { icon: CheckSquare, label: 'Habits', page: 'habits', color: 'bg-sky-100 text-sky-600' },
  { icon: Apple, label: 'Food Guide', page: 'food', color: 'bg-mango-100 text-mango-600' },
  { icon: TrendingUp, label: 'Progress', page: 'progress', color: 'bg-coral-100 text-coral-500' },
];

const healthyTip = 'Drinking a glass of water right after waking up helps rehydrate your body and kickstart your metabolism for the day.';

const foodImages = [
  'https://images.pexels.com/photos/7167853/pexels-photo-7167853.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
  'https://images.pexels.com/photos/6978242/pexels-photo-6978242.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
  'https://images.pexels.com/photos/6065181/pexels-photo-6065181.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
];

export default function HomePage({ onNavigate, completedHabits }: HomePageProps) {
  const completedCount = completedHabits.length;
  const total = dailyHabits.length;
  const progress = completedCount / total;
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 pt-6 pb-24 md:pb-10 space-y-6">
      {/* Welcome */}
      <div className="animate-fade-in">
        <p className="text-sm text-sage-500 font-medium">{greeting}!</p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-sage-800 mt-0.5">
          Let's make today healthy
        </h1>
      </div>

      {/* Hero card */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sage-500 to-sage-700 px-6 py-8 md:px-10 md:py-12 animate-slide-up">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-52 h-52 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
        <div className="relative flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="text-white font-bold text-lg">HealthyMate</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white leading-snug max-w-md mb-2">
          Your personal wellness companion
        </h2>
        <p className="text-sm text-sage-100 mb-6 max-w-md">
          Build better habits, eat well, and track your progress — one day at a time.
        </p>
        <button
          onClick={() => onNavigate('chat')}
          className="group inline-flex items-center gap-2 bg-white text-sage-700 font-semibold px-5 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all text-sm"
        >
          Start chatting
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      {/* Two-column: habit progress + water */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Today's habit progress */}
        <div className="bg-white rounded-2xl border border-sage-50 shadow-sm p-5 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sage-800 text-sm">Today's Habits</h3>
              <p className="text-xs text-sage-400 mt-0.5">{completedCount} of {total} completed</p>
            </div>
            <button
              onClick={() => onNavigate('habits')}
              className="text-xs font-medium text-sage-500 hover:text-sage-700 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="h-2.5 rounded-full bg-sage-100 overflow-hidden mb-4">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sage-400 to-sage-500 transition-all duration-500 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {dailyHabits.map((h) => {
              const Icon = iconMap[h.icon] ?? Check;
              const done = completedHabits.includes(h.id);
              return (
                <div
                  key={h.id}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2 transition-colors ${
                    done ? 'bg-sage-50' : 'bg-cream-50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${
                    done ? 'bg-sage-500' : 'bg-sage-100'
                  }`}>
                    {done ? (
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    ) : (
                      <Icon className="w-3.5 h-3.5 text-sage-400" />
                    )}
                  </div>
                  <span className={`text-xs font-medium truncate ${done ? 'text-sage-500' : 'text-sage-600'}`}>
                    {h.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Water / hydration card */}
        <div className="bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl shadow-sm p-5 text-white animate-slide-up relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Hydration</h3>
                <p className="text-xs text-sky-100">Stay hydrated today</p>
              </div>
            </div>
            <div className="flex items-end gap-1.5 h-24 mb-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-md transition-all duration-300 ${
                    i < 3 ? 'bg-white/80' : 'bg-white/20'
                  }`}
                  style={{ height: `${50 + i * 6}%` }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">3 / 8</span>
              <span className="text-xs text-sky-100">glasses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((a, i) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              onClick={() => onNavigate(a.page)}
              className="group bg-white rounded-2xl p-4 text-center shadow-sm border border-sage-50 hover:shadow-md hover:-translate-y-0.5 transition-all animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`w-11 h-11 rounded-xl ${a.color} flex items-center justify-center mb-2.5 mx-auto group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-sage-700">{a.label}</span>
            </button>
          );
        })}
      </div>

      {/* Healthy tip + food images */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Tip card */}
        <div className="bg-white rounded-2xl border border-sage-50 shadow-sm p-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-mango-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-mango-500" />
            </div>
            <h3 className="font-bold text-sage-800 text-sm">Healthy Tip of the Day</h3>
          </div>
          <p className="text-sm text-sage-600 leading-relaxed">{healthyTip}</p>
        </div>

        {/* Food images */}
        <div className="grid grid-cols-3 gap-2 animate-fade-in">
          {foodImages.map((src, i) => (
            <div key={i} className="rounded-xl overflow-hidden h-full min-h-[120px]">
              <img
                src={src}
                alt="Healthy food"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-sage-400 px-4 pb-2">
        HealthyMate provides general wellness suggestions and does not offer medical diagnosis or treatment.
        Always consult a healthcare professional for medical concerns.
      </p>
    </div>
  );
}
