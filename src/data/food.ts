export interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  category: 'fruits' | 'vegetables' | 'proteins' | 'grains' | 'snacks';
  calories: number;
  protein: string;
  carbs: string;
  fiber: string;
  benefits: string;
  tip: string;
  image: string;
}

export const foodItems: FoodItem[] = [
  {
    id: 'oats',
    name: 'Oatmeal',
    emoji: '🥣',
    category: 'grains',
    calories: 150,
    protein: '6g',
    carbs: '27g',
    fiber: '4g',
    benefits: 'Sustained energy, supports heart health, and keeps you full longer.',
    tip: 'Top with berries and a drizzle of honey for a balanced breakfast.',
    image: 'https://images.pexels.com/photos/7167853/pexels-photo-7167853.jpeg?auto=compress&cs=tinysrgb&h=300&w=400',
  },
  {
    id: 'banana',
    name: 'Banana',
    emoji: '🍌',
    category: 'fruits',
    calories: 105,
    protein: '1.3g',
    carbs: '27g',
    fiber: '3g',
    benefits: 'Great pre-workout fuel, rich in potassium, and easy to digest.',
    tip: 'Pair with peanut butter for a protein boost.',
    image: 'https://images.pexels.com/photos/5946096/pexels-photo-5946096.jpeg?auto=compress&cs=tinysrgb&h=300&w=400',
  },
  {
    id: 'spinach',
    name: 'Spinach',
    emoji: '🥬',
    category: 'vegetables',
    calories: 23,
    protein: '2.9g',
    carbs: '3.6g',
    fiber: '2.2g',
    benefits: 'Packed with iron, folate, and antioxidants for energy and immunity.',
    tip: 'Add a handful to smoothies — you won\'t taste it but you\'ll get the nutrients.',
    image: 'https://images.pexels.com/photos/2255925/pexels-photo-2255925.jpeg?auto=compress&cs=tinysrgb&h=300&w=400',
  },
  {
    id: 'eggs',
    name: 'Eggs',
    emoji: '🥚',
    category: 'proteins',
    calories: 78,
    protein: '6g',
    carbs: '0.6g',
    fiber: '0g',
    benefits: 'Complete protein with choline for brain health and sustained energy.',
    tip: 'Boiled eggs make a portable, protein-rich snack.',
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&h=300&w=400',
  },
  {
    id: 'blueberries',
    name: 'Blueberries',
    emoji: '🫐',
    category: 'fruits',
    calories: 84,
    protein: '1.1g',
    carbs: '21g',
    fiber: '3.5g',
    benefits: 'One of the highest antioxidant foods — supports memory and focus.',
    tip: 'Keep a bag of frozen blueberries for smoothies and yogurt bowls.',
    image: 'https://images.pexels.com/photos/9562572/pexels-photo-9562572.jpeg?auto=compress&cs=tinysrgb&h=300&w=400',
  },
  {
    id: 'almonds',
    name: 'Almonds',
    emoji: '🌰',
    category: 'snacks',
    calories: 164,
    protein: '6g',
    carbs: '6g',
    fiber: '3.5g',
    benefits: 'Healthy fats, vitamin E, and magnesium for brain and heart health.',
    tip: 'A small handful (about 23) is one serving — great for afternoon slumps.',
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&h=300&w=400',
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    emoji: '🍠',
    category: 'vegetables',
    calories: 103,
    protein: '2.3g',
    carbs: '24g',
    fiber: '4g',
    benefits: 'Complex carbs with vitamin A for steady energy and eye health.',
    tip: 'Bake wedges with a sprinkle of cinnamon for a healthy side.',
    image: 'https://images.pexels.com/photos/2228575/pexels-photo-2228575.jpeg?auto=compress&cs=tinysrgb&h=300&w=400',
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt',
    emoji: '🥛',
    category: 'proteins',
    calories: 100,
    protein: '17g',
    carbs: '6g',
    fiber: '0g',
    benefits: 'High protein, probiotics for gut health, and calcium for bones.',
    tip: 'Choose plain and add your own fruit to avoid added sugars.',
    image: 'https://images.pexels.com/photos/5938862/pexels-photo-5938862.jpeg?auto=compress&cs=tinysrgb&h=300&w=400',
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    emoji: '🥦',
    category: 'vegetables',
    calories: 55,
    protein: '3.7g',
    carbs: '11g',
    fiber: '5g',
    benefits: 'Rich in vitamin C, fiber, and compounds that support detox.',
    tip: 'Steam lightly — overcooking reduces nutrients.',
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&h=300&w=400',
  },
  {
    id: 'apple',
    name: 'Apple',
    emoji: '🍎',
    category: 'fruits',
    calories: 95,
    protein: '0.5g',
    carbs: '25g',
    fiber: '4g',
    benefits: 'Fiber-rich for digestion, natural sugars for a quick energy lift.',
    tip: 'Keep the skin on — that\'s where most of the fiber lives.',
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&h=300&w=400',
  },
  {
    id: 'brown-rice',
    name: 'Brown Rice',
    emoji: '🍚',
    category: 'grains',
    calories: 216,
    protein: '5g',
    carbs: '45g',
    fiber: '4g',
    benefits: 'Whole grain with magnesium and selenium for sustained energy.',
    tip: 'Cook a big batch on Sunday for easy meals all week.',
    image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&h=300&w=400',
  },
  {
    id: 'chickpeas',
    name: 'Chickpeas',
    emoji: '🫘',
    category: 'proteins',
    calories: 269,
    protein: '15g',
    carbs: '45g',
    fiber: '13g',
    benefits: 'Plant protein and fiber for fullness and stable blood sugar.',
    tip: 'Roast with spices for a crunchy, protein-packed snack.',
    image: 'https://images.pexels.com/photos/7422998/pexels-photo-7422998.jpeg?auto=compress&cs=tinysrgb&h=300&w=400',
  },
];

export const foodCategories = [
  { id: 'all', label: 'All', emoji: '🍽️' },
  { id: 'fruits', label: 'Fruits', emoji: '🍎' },
  { id: 'vegetables', label: 'Vegetables', emoji: '🥦' },
  { id: 'proteins', label: 'Protein', emoji: '🥚' },
  { id: 'grains', label: 'Grains', emoji: '🥣' },
  { id: 'snacks', label: 'Nuts & Snacks', emoji: '🌰' },
] as const;

export interface FoodQuestion {
  id: string;
  question: string;
  answer: string;
}

export const foodQuestions: FoodQuestion[] = [
  {
    id: 'q1',
    question: 'What are good breakfast foods for energy?',
    answer: 'Great breakfast options include oatmeal with berries, eggs with whole-grain toast, or a smoothie with banana, spinach, and Greek yogurt. These combine complex carbs, protein, and fiber for steady energy throughout the morning.',
  },
  {
    id: 'q2',
    question: 'Which foods help me focus while studying?',
    answer: 'Foods rich in omega-3s (like walnuts), antioxidants (like blueberries), and complex carbs (like brown rice) support brain function. Dark chocolate (70%+) in small amounts can also help concentration.',
  },
  {
    id: 'q3',
    question: 'What are healthy snacks between classes?',
    answer: 'Try a handful of almonds, an apple with peanut butter, roasted chickpeas, or a small cup of Greek yogurt. These provide protein and fiber to keep you full without a sugar crash.',
  },
  {
    id: 'q4',
    question: 'How can I eat healthy on a student budget?',
    answer: 'Focus on affordable staples: oats, brown rice, eggs, beans, lentils, seasonal fruits, and frozen vegetables. Buying in bulk and meal prepping can save both money and time.',
  },
  {
    id: 'q5',
    question: 'What foods support better sleep?',
    answer: 'Foods with magnesium and tryptophan — like almonds, bananas, and oatmeal — can support relaxation. Avoid heavy meals and caffeine close to bedtime. A cup of chamomile tea can also help you wind down.',
  },
];
