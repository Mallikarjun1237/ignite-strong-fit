// Centralized dummy data + TypeScript interfaces.
// Structured so each export can later be swapped for a real API/DB call.

export interface Program {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  description: string;
  duration: string;
  icon: string;
}

export interface MembershipPlan {
  id: string;
  name: "Bronze" | "Silver" | "Gold";
  price: number;
  period: string;
  highlight: boolean;
  tagline: string;
  features: string[];
}

export interface Trainer {
  id: string;
  name: string;
  image: string;
  experience: string;
  specialization: string;
  certifications: string[];
  bio: string;
}

export interface Product {
  id: string;
  name: string;
  category: "Protein" | "Creatine" | "Pre-workout" | "Vitamins" | "BCAA";
  price: number;
  discount: number; // percent
  rating: number;
  reviews: number;
  image: string;
}

export interface DietPlan {
  id: string;
  name: string;
  goal: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: number;
  duration: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const CLUB = {
  name: "AK Boxing Club",
  address: "160 Broadway Ste 1115, New York, NY 10038",
  phone: "+1 (212) 555-0142",
  email: "train@akboxingclub.com",
  whatsapp: "12125550142",
  rating: 4.9,
  reviews: 64,
  mapsEmbed:
    "https://www.google.com/maps?q=160+Broadway+Ste+1115,+New+York,+NY+10038&output=embed",
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=160+Broadway+Ste+1115,+New+York,+NY+10038",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
  },
};

export const programs: Program[] = [
  { id: "p1", title: "Beginner Boxing", level: "Beginner", description: "Master stance, footwork and the fundamental punches in a supportive small-group setting.", duration: "60 min", icon: "Footprints" },
  { id: "p2", title: "Intermediate Boxing", level: "Intermediate", description: "Combination drills, defensive movement and pad work to sharpen technique and timing.", duration: "60 min", icon: "Zap" },
  { id: "p3", title: "Advanced Fighters", level: "Advanced", description: "Sparring, ring IQ and competition prep coached by championship-level trainers.", duration: "90 min", icon: "Swords" },
  { id: "p4", title: "HIIT Conditioning", level: "All Levels", description: "Explosive boxing-based circuits that torch calories and build fight-ready endurance.", duration: "45 min", icon: "Flame" },
  { id: "p5", title: "Women's Boxing", level: "All Levels", description: "An empowering, women-only class building strength, confidence and skill.", duration: "60 min", icon: "Heart" },
  { id: "p6", title: "Youth Boxing", level: "Beginner", description: "Discipline, focus and fitness for ages 8–16 in a safe, structured environment.", duration: "50 min", icon: "Users" },
];

export const memberships: MembershipPlan[] = [
  {
    id: "m1", name: "Bronze", price: 99, period: "month", highlight: false,
    tagline: "Get in the game",
    features: ["3 classes per week", "Access to all group programs", "Locker & shower access", "Free gloves on first class", "Community app access"],
  },
  {
    id: "m2", name: "Silver", price: 159, period: "month", highlight: true,
    tagline: "Train without limits",
    features: ["Unlimited classes", "All group programs", "Priority class booking", "1 guest pass / month", "Recovery zone access", "Monthly progress check-in"],
  },
  {
    id: "m3", name: "Gold", price: 279, period: "month", highlight: false,
    tagline: "The full champion package",
    features: ["Unlimited classes", "1-on-1 personal trainer", "Custom diet plan", "Unlimited guest passes", "Priority everything", "10% off supplements"],
  },
];

export const trainers: Trainer[] = [
  { id: "t1", name: "Andre 'AK' King", image: "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?w=800&q=80", experience: "15 years", specialization: "Pro Boxing & Footwork", certifications: ["USA Boxing Certified", "NASM-CPT", "Level 3 Coach"], bio: "Founder of AK Boxing Club and former regional champion with a passion for building fighters from the ground up." },
  { id: "t2", name: "Maria Delgado", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&q=80", experience: "10 years", specialization: "Women's Boxing & Conditioning", certifications: ["USA Boxing Certified", "Pre/Postnatal Specialist"], bio: "Maria leads our women's program with an energy that turns first-timers into lifelong fighters." },
  { id: "t3", name: "Devon Carter", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&q=80", experience: "8 years", specialization: "HIIT & Strength", certifications: ["NSCA-CSCS", "Kettlebell L2"], bio: "Devon's conditioning sessions are legendary — fight-ready endurance with a science-backed approach." },
  { id: "t4", name: "Sofia Nguyen", image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80", experience: "6 years", specialization: "Youth & Beginner Boxing", certifications: ["USA Boxing Certified", "Youth Coaching Cert"], bio: "Patient, encouraging and technical, Sofia is the perfect coach to learn the ropes from." },
];

export const products: Product[] = [
  { id: "s1", name: "Knockout Whey Protein", category: "Protein", price: 54.99, discount: 15, rating: 4.8, reviews: 212, image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&q=80" },
  { id: "s2", name: "Plant Power Protein", category: "Protein", price: 49.99, discount: 0, rating: 4.6, reviews: 98, image: "https://images.unsplash.com/photo-1607621048318-c2d5bdc0c0e6?w=600&q=80" },
  { id: "s3", name: "Pure Creatine Monohydrate", category: "Creatine", price: 29.99, discount: 10, rating: 4.9, reviews: 340, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80" },
  { id: "s4", name: "Round 12 Pre-Workout", category: "Pre-workout", price: 39.99, discount: 20, rating: 4.7, reviews: 156, image: "https://images.unsplash.com/photo-1606889464198-fcb18894cf50?w=600&q=80" },
  { id: "s5", name: "Daily Fighter Multivitamin", category: "Vitamins", price: 24.99, discount: 0, rating: 4.5, reviews: 77, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80" },
  { id: "s6", name: "Recovery BCAA Complex", category: "BCAA", price: 34.99, discount: 12, rating: 4.6, reviews: 121, image: "https://images.unsplash.com/photo-1622818425825-1a1c7a5e2b0a?w=600&q=80" },
  { id: "s7", name: "Omega-3 Fish Oil", category: "Vitamins", price: 19.99, discount: 5, rating: 4.4, reviews: 64, image: "https://images.unsplash.com/photo-1550572017-edd951aa8f7f?w=600&q=80" },
  { id: "s8", name: "Isolate Lean Protein", category: "Protein", price: 64.99, discount: 18, rating: 4.9, reviews: 188, image: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=600&q=80" },
  { id: "s9", name: "Creatine HCL Capsules", category: "Creatine", price: 32.99, discount: 0, rating: 4.5, reviews: 54, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" },
  { id: "s10", name: "Electrolyte BCAA Hydrate", category: "BCAA", price: 27.99, discount: 8, rating: 4.7, reviews: 90, image: "https://images.unsplash.com/photo-1622818426203-93b2d7d6c1f5?w=600&q=80" },
];

export const productCategories = ["All", "Protein", "Creatine", "Pre-workout", "Vitamins", "BCAA"] as const;

export const dietPlans: DietPlan[] = [
  { id: "d1", name: "Fat Loss Plan", goal: "Cut", calories: 1800, protein: 160, carbs: 140, fats: 55, meals: 5, duration: "8 weeks", description: "A high-protein, calorie-controlled plan engineered to strip fat while preserving lean muscle and ring energy." },
  { id: "d2", name: "Muscle Gain Plan", goal: "Bulk", calories: 2900, protein: 200, carbs: 320, fats: 80, meals: 6, duration: "12 weeks", description: "A clean surplus built for size and power, with strategically timed carbs around your training." },
  { id: "d3", name: "Boxing Performance Plan", goal: "Performance", calories: 2400, protein: 180, carbs: 250, fats: 70, meals: 5, duration: "10 weeks", description: "Fuel for explosive speed and endurance — balanced macros tuned to sustain intense sparring sessions." },
  { id: "d4", name: "Vegetarian Athlete Plan", goal: "Plant-based", calories: 2200, protein: 150, carbs: 260, fats: 65, meals: 5, duration: "10 weeks", description: "Complete plant-based nutrition delivering full amino profiles for recovery and performance." },
];

export const testimonials: Testimonial[] = [
  { id: "r1", name: "Jasmine T.", role: "Member, 1 year", quote: "AK Boxing changed my life. The coaches actually know your name and push you to be better every single round.", rating: 5 },
  { id: "r2", name: "Marcus W.", role: "Member, 8 months", quote: "Small classes mean real coaching. My technique improved more in 3 months here than in years at big-box gyms.", rating: 5 },
  { id: "r3", name: "Priya K.", role: "Women's Boxing", quote: "The most welcoming, empowering gym in NYC. I walked in nervous and walked out hooked.", rating: 5 },
  { id: "r4", name: "Daniel R.", role: "Member, 2 years", quote: "Black-owned, inclusive, and seriously legit training. This is the real deal.", rating: 5 },
];

export const faqs: FaqItem[] = [
  { q: "Do I need any experience to start?", a: "Not at all. Our Beginner Boxing and HIIT classes are designed for total newcomers. Coaches scale every drill to your level." },
  { q: "What should I bring to my first class?", a: "Just water, athletic clothes and a towel. Hand wraps and gloves are available to rent, and your first pair of gloves is on us with a Bronze membership." },
  { q: "Are the classes really small?", a: "Yes — we cap classes to keep coaching personal. You'll get real corrections and attention every session." },
  { q: "Is AK Boxing Club inclusive?", a: "Absolutely. We're proudly Black-owned and LGBTQ+ friendly. Everyone trains, everyone belongs." },
  { q: "Can I freeze or cancel my membership?", a: "Memberships are month-to-month. You can freeze for up to 60 days a year or cancel anytime with 14 days notice." },
];

export const gallery = [
  "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80",
  "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80",
  "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&q=80",
  "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=800&q=80",
  "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
];

// Time slots used by the booking page
export const timeSlots = ["6:00 AM", "7:30 AM", "9:00 AM", "12:00 PM", "5:00 PM", "6:30 PM", "8:00 PM"] as const;
export const fitnessLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const genders = ["Male", "Female", "Non-binary", "Prefer not to say"] as const;
