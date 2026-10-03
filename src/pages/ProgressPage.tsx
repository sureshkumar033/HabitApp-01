import {
  Check, Trophy, Droplets, Calendar, TrendingUp, type LucideIcon,
} from 'lucide-react';
import { dailyHabits, iconMap } from '@/data/habits';
import ProgressRing from '@/components/ProgressRing';

interface ProgressPageProps {
  completedHabits: string[];
}

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weeklyData = [3, 2, 4, 3, 4, 2, 0];

export default function ProgressPage({ completedHabits }: ProgressPageProps) {
  const completed = dailyHabits.filter((h) => completedHabits.includes(h.id));
  const remaining = dailyHabits.filter((h) => !completedHabits.includes(h.id));
  const progress = completedHabits.length / dailyHabits.length;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const motivationalMessages = [
    { threshold: 1, msg: "Amazing! You completed all your habits today. Keep this streak going!" },
    { threshold: 0.75, msg: "Great progress! You're almost there — finish strong!" },
    { threshold: 0.5, msg: "You're halfway there. Keep the momentum going!" },
    { threshold: 0.25, msg: "Good start! Pick one more habit to check off." },
    { threshold: 0, msg: "Every journey starts with a single step. Try checking off one habit!" },
  ];

  const message = motivationalMessages.find((m) => progress >= m.threshold)?.msg ?? motivationalMessages[motivationalMessages.length - 1].msg;
  const maxWeekly = Math.max(...weeklyData, 1);
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 pt-6 pb-24 md:pb-10 space-y-5">
      {/* Heading */}
      <div className="animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-extrabold text-sage-800">Progress</h1>
        <p className="text-sm text-sage-500 mt-1">{today}</p>
      </div>

      {/* Main progress card */}
      <div className="bg-gradient-to-br from-sage-500 to-sage-700 rounded-3xl p-6 md:p-8 text-center animate-slide-up relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="relative">
          <ProgressRing
            progress={progress}
            size={130}
            strokeWidth={11}
            label={`${Math.round(progress * 100)}%`}
            sublabel="complete"
            trackColor="stroke-white/20"
            activeColor="stroke-white"
            labelColor="text-white"
            sublabelColor="text-sage-100"
          />
          <div className="flex items-center justify-center gap-2 mt-4">
            <Trophy className="w-5 h-5 text-cream-200" />
            <p className="text-cream-100 text-sm font-medium">
              {completedHabits.length} of {dailyHabits.length} habits done
            </p>
          </div>
          <p className="text-sage-100 text-sm mt-2 max-w-sm mx-auto">{message}</p>
        </div>
      </div>

      {/* Weekly chart + Water tracking */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Weekly chart */}
        <div className="bg-white rounded-2xl border border-sage-50 shadow-sm p-5 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-sage-500" />
            <h2 className="font-bold text-sage-800 text-sm">Weekly Habits</h2>
          </div>
          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex-1 flex items-end">
                  <div
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      i === todayIndex ? 'bg-sage-500' : 'bg-sage-200'
                    }`}
                    style={{ height: `${(val / maxWeekly) * 100}%`, minHeight: val > 0 ? '8px' : '2px' }}
                  />
                </div>
                <span className={`text-[10px] font-medium ${i === todayIndex ? 'text-sage-700' : 'text-sage-400'}`}>
                  {weekDays[i]}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-sage-50">
            <TrendingUp className="w-3.5 h-3.5 text-sage-400" />
            <span className="text-xs text-sage-500">This week's average: {(weeklyData.reduce((a, b) => a + b, 0) / 7).toFixed(1)} / {dailyHabits.length}</span>
          </div>
        </div>

        {/* Water tracking */}
        <div className="bg-white rounded-2xl border border-sage-50 shadow-sm p-5 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-4 h-4 text-sky-500" />
            <h2 className="font-bold text-sage-800 text-sm">Water Today</h2>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-extrabold text-sky-500">3<span className="text-base text-sage-400 font-medium"> / 8</span></span>
            <span className="text-xs text-sage-400">glasses</span>
          </div>
          <div className="flex items-center gap-1.5 mb-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-7 rounded-md transition-all duration-300 ${
                  i < 3 ? 'bg-sky-400' : 'bg-sky-50'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-sage-400">Aim for 8 glasses throughout the day to stay well hydrated.</p>
        </div>
      </div>

      {/* Completed habits */}
      <div className="bg-white rounded-2xl border border-sage-50 shadow-sm p-5 animate-slide-up">
        <h2 className="font-bold text-sage-800 text-sm mb-4 flex items-center gap-2">
          <Check className="w-4 h-4 text-sage-500" strokeWidth={3} />
          Completed ({completed.length})
        </h2>
        {completed.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-sage-400">No habits completed yet today.</p>
            <p className="text-xs text-sage-400 mt-1">Head to the Habits page to get started!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {completed.map((habit) => {
              const Icon: LucideIcon = iconMap[habit.icon] ?? Check;
              return (
                <div
                  key={habit.id}
                  className="flex items-center gap-3 bg-sage-50 rounded-xl p-3 animate-slide-in"
                >
                  <div className="w-7 h-7 rounded-lg bg-sage-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <Icon className="w-4 h-4 text-sage-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-sage-600 line-through">{habit.title}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Remaining habits */}
      {remaining.length > 0 && (
        <div className="bg-white rounded-2xl border border-sage-50 shadow-sm p-5 animate-slide-up">
          <h2 className="font-bold text-sage-800 text-sm mb-4">Still to do ({remaining.length})</h2>
          <div className="space-y-2">
            {remaining.map((habit) => {
              const Icon: LucideIcon = iconMap[habit.icon] ?? Check;
              return (
                <div
                  key={habit.id}
                  className="flex items-center gap-3 bg-cream-50 rounded-xl p-3"
                >
                  <div className="w-7 h-7 rounded-lg border-2 border-sage-200 flex-shrink-0" />
                  <Icon className="w-4 h-4 text-sage-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-sage-600">{habit.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
