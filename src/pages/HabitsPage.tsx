import { Check, Sparkles, type LucideIcon } from 'lucide-react';
import { dailyHabits, iconMap } from '@/data/habits';

interface HabitsPageProps {
  completedHabits: string[];
  onToggle: (habitId: string) => void;
}

const completionMessages: { threshold: number; msg: string }[] = [
  { threshold: 1, msg: 'All done! You completed every habit today — amazing work!' },
  { threshold: 0.75, msg: "Almost there — just one more to go!" },
  { threshold: 0.5, msg: "Halfway done. Keep the momentum going!" },
  { threshold: 0.25, msg: "Great start! Pick another habit to check off." },
  { threshold: 0, msg: "Every journey starts with a single step." },
];

export default function HabitsPage({ completedHabits, onToggle }: HabitsPageProps) {
  const completedCount = completedHabits.length;
  const total = dailyHabits.length;
  const progress = completedCount / total;
  const percentage = Math.round(progress * 100);

  const message = completionMessages.find((m) => progress >= m.threshold)?.msg ?? completionMessages[completionMessages.length - 1].msg;

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 pt-6 pb-24 md:pb-10 space-y-5">
      {/* Heading */}
      <div className="animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-extrabold text-sage-800">Today's Healthy Habits</h1>
        <p className="text-sm text-sage-500 mt-1">Small habits, better days.</p>
      </div>

      {/* Progress card */}
      <div className="bg-white rounded-2xl border border-sage-50 shadow-sm p-5 animate-slide-up">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-sage-800 text-sm">Today's Progress</span>
          <span className="text-sm font-semibold text-sage-500">
            {completedCount} of {total} completed · {percentage}%
          </span>
        </div>
        <div className="h-3 rounded-full bg-sage-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sage-400 to-sage-500 transition-all duration-500 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Sparkles className="w-3.5 h-3.5 text-mango-400 flex-shrink-0" />
          <p className="text-xs text-sage-500">{message}</p>
        </div>
      </div>

      {/* Habit cards */}
      <div className="space-y-3">
        {dailyHabits.map((habit, i) => {
          const Icon: LucideIcon = iconMap[habit.icon] ?? Check;
          const done = completedHabits.includes(habit.id);
          return (
            <button
              key={habit.id}
              onClick={() => onToggle(habit.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all animate-slide-up ${
                done
                  ? 'bg-sage-50 border-sage-200'
                  : 'bg-white border-sage-50 hover:border-sage-200 hover:shadow-md'
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                  done
                    ? 'bg-sage-500'
                    : 'bg-cream-50 border border-cream-100'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${done ? 'text-white' : 'text-sage-500'}`}
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-semibold text-sm transition-colors ${
                    done ? 'text-sage-400 line-through' : 'text-sage-800'
                  }`}
                >
                  {habit.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed mt-0.5 transition-colors ${
                    done ? 'text-sage-300' : 'text-sage-500'
                  }`}
                >
                  {habit.description}
                </p>
              </div>

              {/* Checkbox */}
              <div
                className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  done ? 'bg-sage-500 border-sage-500 animate-pop' : 'border-sage-200'
                }`}
              >
                {done && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
