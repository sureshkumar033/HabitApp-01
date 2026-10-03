export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ResponseRule {
  keywords: string[];
  response: string;
}

const responseRules: ResponseRule[] = [
  {
    keywords: ['sleep', 'tired', 'insomnia', 'rest', 'bedtime'],
    response:
      "Here are some general tips for better sleep:\n\n• Try to go to bed and wake up at the same time every day — consistency helps your body's internal clock.\n• Avoid screens for at least 30 minutes before bed. The blue light can keep you alert.\n• Keep your room cool, dark, and quiet.\n• A short wind-down routine — like reading or light stretching — signals your body it's time to rest.\n• Avoid caffeine in the late afternoon and evening.\n\nIf you're consistently struggling to sleep, consider talking to a healthcare professional.",
  },
  {
    keywords: ['water', 'hydrate', 'hydration', 'drink', 'thirsty'],
    response:
      "Staying hydrated is one of the simplest healthy habits you can build:\n\n• Aim for about 8 glasses of water a day — more if you're active or it's hot.\n• Keep a reusable water bottle with you during classes.\n• Start your morning with a glass of water before anything else.\n• If you don't love plain water, try infusing it with lemon, cucumber, or mint.\n• Your urine should be pale yellow — that's a good sign you're hydrated.",
  },
  {
    keywords: ['stress', 'anxious', 'anxiety', 'overwhelmed', 'pressure', 'mental'],
    response:
      "Managing stress is essential for overall wellness. Here are some gentle strategies:\n\n• Try 5 minutes of deep breathing — inhale for 4 counts, hold for 4, exhale for 6.\n• Break big tasks into small, manageable steps.\n• Take short breaks — even a 5-minute walk can reset your mind.\n• Talk to someone you trust about what's on your mind.\n• Prioritize sleep and nutrition — they directly affect your stress levels.\n\nIf stress feels overwhelming, your school's counseling service or a mental health professional can help.",
  },
  {
    keywords: ['energy', 'fatigue', 'sluggish', 'lazy', 'tiredness'],
    response:
      "If you're feeling low on energy, try these everyday habits:\n\n• Eat balanced meals with protein, complex carbs, and healthy fats — skipping meals drains you.\n• Get moving — even a 10-minute walk can boost energy more than a nap.\n• Drink enough water — dehydration is a sneaky cause of fatigue.\n• Check your sleep — most young adults need 7–8 hours.\n• Limit sugar-heavy snacks — they give a quick spike followed by a crash.",
  },
  {
    keywords: ['eat', 'food', 'diet', 'nutrition', 'healthy eating', 'meals'],
    response:
      "Building healthy eating habits doesn't have to be complicated:\n\n• Fill half your plate with vegetables at lunch and dinner.\n• Include a protein source with every meal — eggs, beans, yogurt, or chicken.\n• Choose whole grains like brown rice and oats over refined ones.\n• Snack on fruit, nuts, or yogurt instead of chips and candy.\n• Cooking at home lets you control ingredients and portions.\n\nCheck out the Food section for nutritious options and simple tips!",
  },
  {
    keywords: ['exercise', 'workout', 'gym', 'fitness', 'run', 'move', 'activity'],
    response:
      "Regular movement is one of the best things you can do for your body and mind:\n\n• Aim for at least 30 minutes of moderate activity most days — walking counts!\n• Find something you enjoy — dancing, cycling, swimming, or team sports.\n• Short bouts add up: three 10-minute walks are just as good as one 30-minute session.\n• Add some strength training twice a week — bodyweight exercises like push-ups and squats are great.\n• Don't forget to warm up and cool down to prevent injury.",
  },
  {
    keywords: ['study', 'focus', 'concentrate', 'exam', 'productivity', 'procrastination'],
    response:
      "Healthy habits and study success go hand in hand:\n\n• Sleep is your brain's best friend — pulling an all-nighter actually hurts memory.\n• Take a 5-minute break every 25–30 minutes (the Pomodoro technique).\n• Fuel up with brain foods like blueberries, walnuts, and dark chocolate.\n• Hydrate while studying — even mild dehydration reduces focus.\n• A short walk between study sessions can boost creativity and retention.",
  },
  {
    keywords: ['morning', 'routine', 'start', 'begin'],
    response:
      "A simple morning routine sets a healthy tone for your whole day:\n\n• Drink a glass of water first thing to rehydrate.\n• Do 5–10 minutes of light stretching to wake your body up.\n• Eat a balanced breakfast — oats, eggs, or a smoothie are great choices.\n• Get some natural light — it helps regulate your energy and sleep cycle.\n• Write down 1–3 priorities for the day.",
  },
  {
    keywords: ['hello', 'hi', 'hey', 'start', 'help'],
    response:
      "Hi there! I'm HealthyMate, your personal wellness assistant. I can share general tips about:\n\n• Sleep habits\n• Hydration\n• Nutrition and healthy eating\n• Exercise and movement\n• Stress management\n• Study and focus tips\n\nWhat would you like to talk about? Remember, I offer general wellness suggestions — not medical advice.",
  },
];

const defaultResponse =
  "That's a great question! Here are some general wellness tips that might help:\n\n• Drink plenty of water throughout the day.\n• Aim for 7–8 hours of sleep each night.\n• Include vegetables and protein in your meals.\n• Move your body for at least 30 minutes daily.\n• Take short breaks during study sessions.\n• Practice a few minutes of deep breathing when stressed.\n\nFeel free to ask me about sleep, nutrition, exercise, stress, or study habits — I'm happy to share more specific suggestions!";

export function getAssistantResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  for (const rule of responseRules) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.response;
    }
  }
  return defaultResponse;
}

export const suggestedPrompts = [
  'How can I sleep better?',
  'Tips for staying hydrated?',
  'I feel stressed, what can I do?',
  'How do I eat healthier as a student?',
  'What are good study habits?',
];
