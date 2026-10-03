import { Droplets, Coffee, Footprints, Moon, type LucideIcon } from 'lucide-react';

export interface Habit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const dailyHabits: Habit[] = [
  {
    id: 'drink-water',
    title: 'Drink water regularly',
    description: 'Stay hydrated throughout the day.',
    icon: 'Droplets',
  },
  {
    id: 'study-breaks',
    title: 'Take study breaks',
    description: 'Take short breaks during long study sessions.',
    icon: 'Coffee',
  },
  {
    id: 'move-body',
    title: 'Move your body',
    description: 'Add some physical activity to your day.',
    icon: 'Footprints',
  },
  {
    id: 'healthy-sleep',
    title: 'Healthy sleep routine',
    description: 'Try to keep a consistent sleep and wake schedule.',
    icon: 'Moon',
  },
];

export const iconMap: Record<string, LucideIcon> = {
  Droplets,
  Coffee,
  Footprints,
  Moon,
};
