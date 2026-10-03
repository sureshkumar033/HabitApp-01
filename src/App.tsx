import { useState, useEffect } from 'react';
import Navbar, { type Page } from '@/components/Navbar';
import HomePage from '@/pages/HomePage';
import ChatPage from '@/pages/ChatPage';
import HabitsPage from '@/pages/HabitsPage';
import FoodPage from '@/pages/FoodPage';
import ProgressPage from '@/pages/ProgressPage';

function App() {
  const [page, setPage] = useState<Page>('home');
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('healthyMate-completedHabits');
    if (saved) {
      try {
        setCompletedHabits(JSON.parse(saved));
      } catch {
        setCompletedHabits([]);
      }
    }
  }, []);

  const toggleHabit = (habitId: string) => {
    setCompletedHabits((prev) => {
      const next = prev.includes(habitId)
        ? prev.filter((id) => id !== habitId)
        : [...prev, habitId];
      localStorage.setItem('healthyMate-completedHabits', JSON.stringify(next));
      return next;
    });
  };

  const handleNavigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar currentPage={page} onNavigate={handleNavigate} />
      <main className="md:ml-64">
        {page === 'home' && <HomePage onNavigate={handleNavigate} completedHabits={completedHabits} />}
        {page === 'chat' && <ChatPage />}
        {page === 'habits' && (
          <HabitsPage completedHabits={completedHabits} onToggle={toggleHabit} />
        )}
        {page === 'food' && <FoodPage />}
        {page === 'progress' && <ProgressPage completedHabits={completedHabits} />}
      </main>
    </div>
  );
}

export default App;
