import { Product, Testimonial, BlogPost } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "Organic Black Garlic Cloves",
    slug: "organic-black-garlic-cloves",
    category: "Black Garlic",
    description:
      "Our premium Black Garlic is carefully aged for 40+ days using a slow fermentation process at controlled temperature and humidity. This transforms the pungent raw garlic into sweet, complex, umami-rich cloves with dramatically increased antioxidant levels. Each batch is lab-tested to ensure maximum potency and purity.",
    shortDescription:
      "40-day aged, sweet & complex umami-rich black garlic. 10x more antioxidants than raw garlic.",
    price: 599,
    originalPrice: 799,
    images: [
      "/images/products/black-garlic-1.jpg",
      "/images/products/black-garlic-2.jpg",
      "/images/products/black-garlic-3.jpg",
    ],
    weights: [
      { label: "100g", value: "100g", price: 599, originalPrice: 799, inStock: true },
      { label: "250g", value: "250g", price: 1299, originalPrice: 1699, inStock: true },
      { label: "500g", value: "500g", price: 2399, originalPrice: 2999, inStock: true },
    ],
    benefits: [
      "10x higher antioxidants than raw garlic",
      "Supports cardiovascular health",
      "Boosts immune system naturally",
      "Anti-inflammatory properties",
      "Rich in S-Allylcysteine (SAC)",
      "Aids in blood sugar regulation",
    ],
    ingredients:
      "100% Organically grown Black Garlic (Allium sativum). No additives, no preservatives.",
    nutritionalInfo: {
      servingSize: "3-4 cloves (approx. 15g)",
      calories: "20 kcal",
      protein: "0.8g",
      carbs: "4.8g",
      fat: "0.1g",
      fiber: "0.3g",
    },
    howToUse:
      "Eat 2-3 cloves daily on an empty stomach for best results. Can also be added to salads, rice dishes, or spread on bread. Store in a cool, dry place.",
    rating: 4.8,
    reviewCount: 256,
    inStock: true,
    isNew: false,
    isBestseller: true,
    isFeatured: true,
    tags: ["antioxidants", "immunity", "heart health", "superfood"],
    badge: "Bestseller",
  },
  {
    id: "2",
    name: "Black Garlic Extract Capsules",
    slug: "black-garlic-extract-capsules",
    category: "Black Garlic",
    description:
      "Concentrated black garlic extract in easy-to-swallow vegetable capsules. Each capsule delivers the equivalent benefits of multiple black garlic cloves in a convenient supplement form. Perfect for those who want the health benefits without the taste.",
    shortDescription:
      "Convenient capsule form of concentrated black garlic extract. 500mg per capsule.",
    price: 899,
    originalPrice: 1199,
    images: [
      "/images/products/bg-capsules-1.jpg",
      "/images/products/bg-capsules-2.jpg",
    ],
    weights: [
      { label: "60 caps", value: "60caps", price: 899, originalPrice: 1199, inStock: true },
      { label: "120 caps", value: "120caps", price: 1599, originalPrice: 2199, inStock: true },
    ],
    benefits: [
      "Standardized S-Allylcysteine content",
      "Easy to take — no smell or taste",
      "Supports liver detoxification",
      "Enhances gut microbiome health",
      "Promotes longevity",
    ],
    ingredients:
      "Black Garlic Extract (500mg per capsule), Vegetable Cellulose (capsule shell). Free from gluten, soy, dairy.",
    nutritionalInfo: {
      servingSize: "1 capsule",
      "Black Garlic Extract": "500mg",
      "S-Allylcysteine (SAC)": "≥0.1%",
    },
    howToUse:
      "Take 1-2 capsules daily with water, preferably with a meal. For therapeutic use, consult your healthcare provider.",
    rating: 4.7,
    reviewCount: 142,
    inStock: true,
    isBestseller: true,
    isFeatured: true,
    tags: ["capsules", "supplement", "immunity", "antioxidants"],
    badge: "Popular",
  },
  {
    id: "3",
    name: "Organic Tulsi Green Tea",
    slug: "organic-tulsi-green-tea",
    category: "Herbal Teas",
    description:
      "A blissful fusion of organic green tea and sacred Tulsi (Holy Basil). Sourced from the pristine tea gardens of Assam and the fertile plains where Tulsi thrives. This calming brew is an ancient Ayurvedic remedy modernized for everyday wellness.",
    shortDescription:
      "Calming Ayurvedic blend of organic green tea and sacred Tulsi (Holy Basil).",
    price: 449,
    originalPrice: 549,
    images: [
      "/images/products/tulsi-tea-1.jpg",
      "/images/products/tulsi-tea-2.jpg",
    ],
    weights: [
      { label: "100g", value: "100g", price: 449, originalPrice: 549, inStock: true },
      { label: "250g", value: "250g", price: 999, originalPrice: 1199, inStock: true },
      { label: "500g", value: "500g", price: 1799, originalPrice: 2199, inStock: false },
    ],
    benefits: [
      "Reduces stress and anxiety naturally",
      "Boosts immunity with Tulsi's adaptogenic properties",
      "Rich in antioxidants (EGCG)",
      "Supports respiratory health",
      "Improves mental clarity and focus",
      "Anti-inflammatory and antibacterial",
    ],
    ingredients:
      "Organic Green Tea (70%), Organic Tulsi Leaves (30%). No artificial flavors.",
    nutritionalInfo: {
      servingSize: "1 teaspoon (2g)",
      calories: "2 kcal",
      "Catechins (EGCG)": "30-40mg",
      caffeine: "~25mg",
    },
    howToUse:
      "Brew 1 tsp in 200ml water at 75-80°C for 2-3 minutes. Do not over-steep. Add honey for sweetness. Enjoy 1-3 cups daily.",
    rating: 4.9,
    reviewCount: 389,
    inStock: true,
    isNew: false,
    isBestseller: true,
    isFeatured: true,
    tags: ["tulsi", "green tea", "ayurveda", "stress relief", "immunity"],
    badge: "Top Rated",
  },
  {
    id: "4",
    name: "Ashwagandha Churna",
    slug: "ashwagandha-churna",
    category: "Ayurvedic",
    description:
      "Pure Ashwagandha root powder (Withania somnifera) processed using traditional Ayurvedic methods. Sourced from the dry regions of Rajasthan where it grows naturally. Our Ashwagandha is standardized to contain minimum 5% Withanolides for consistent potency.",
    shortDescription:
      "Pure Ashwagandha root powder. 5% Withanolides. Traditional Rajasthani source.",
    price: 379,
    originalPrice: 499,
    images: [
      "/images/products/ashwagandha-1.jpg",
      "/images/products/ashwagandha-2.jpg",
    ],
    weights: [
      { label: "100g", value: "100g", price: 379, originalPrice: 499, inStock: true },
      { label: "250g", value: "250g", price: 849, originalPrice: 1099, inStock: true },
      { label: "500g", value: "500g", price: 1499, originalPrice: 1999, inStock: true },
    ],
    benefits: [
      "Reduces cortisol levels (stress hormone)",
      "Improves physical strength and endurance",
      "Enhances sleep quality",
      "Supports thyroid function",
      "Boosts testosterone naturally",
      "Improves cognitive function",
    ],
    ingredients: "100% Pure Ashwagandha Root (Withania somnifera). No fillers, no additives.",
    nutritionalInfo: {
      servingSize: "1/2 teaspoon (3g)",
      "Withanolides": "≥5%",
    },
    howToUse:
      "Mix 1/2 tsp (3g) in warm milk, water, or smoothie. Take at bedtime for sleep benefits, or morning for energy. Not recommended during pregnancy.",
    rating: 4.7,
    reviewCount: 198,
    inStock: true,
    isNew: true,
    isFeatured: true,
    tags: ["ashwagandha", "adaptogen", "stress", "strength", "ayurveda"],
    badge: "New Arrival",
  },
  {
    id: "5",
    name: "Moringa Leaf Powder",
    slug: "moringa-leaf-powder",
    category: "Superfoods",
    description:
      "Hailed as the 'Miracle Tree', our Moringa is cold-pressed and carefully dried to preserve maximum nutrients. Contains 92 nutrients, 46 antioxidants, and 36 anti-inflammatory compounds. Sourced from organically grown Moringa trees in Tamil Nadu.",
    shortDescription:
      "The 'Miracle Tree' powder — 92 nutrients, 46 antioxidants. Cold-pressed, maximally nutritious.",
    price: 299,
    originalPrice: 399,
    images: [
      "/images/products/moringa-1.jpg",
      "/images/products/moringa-2.jpg",
    ],
    weights: [
      { label: "100g", value: "100g", price: 299, originalPrice: 399, inStock: true },
      { label: "250g", value: "250g", price: 649, originalPrice: 849, inStock: true },
      { label: "500g", value: "500g", price: 1199, originalPrice: 1499, inStock: true },
    ],
    benefits: [
      "7x more Vitamin C than oranges",
      "4x more Calcium than milk",
      "3x more Potassium than bananas",
      "Powerful anti-inflammatory",
      "Supports bone density",
      "Natural energy booster",
    ],
    ingredients: "100% Organic Moringa Oleifera Leaf Powder. No additives.",
    nutritionalInfo: {
      servingSize: "1 teaspoon (3g)",
      calories: "10 kcal",
      protein: "0.9g",
      "Vitamin C": "16mg",
      calcium: "62mg",
      iron: "1.7mg",
    },
    howToUse:
      "Add 1-2 tsp to smoothies, juices, soups, or warm water. Start with 1 tsp and gradually increase. Best consumed fresh (not heated).",
    rating: 4.6,
    reviewCount: 167,
    inStock: true,
    isNew: true,
    tags: ["moringa", "superfood", "nutrition", "energy", "vitamins"],
    badge: "New Arrival",
  },
  {
    id: "6",
    name: "Black Garlic Honey",
    slug: "black-garlic-honey",
    category: "Black Garlic",
    description:
      "A luxurious fusion of aged black garlic and pure raw forest honey. This unique combination creates a deeply complex flavor profile that is simultaneously sweet, savory, and umami-rich. The perfect health food that doubles as a gourmet ingredient.",
    shortDescription:
      "Luxurious fusion of aged black garlic in pure raw forest honey. Sweet, savory, umami.",
    price: 799,
    originalPrice: 999,
    images: [
      "/images/products/bg-honey-1.jpg",
      "/images/products/bg-honey-2.jpg",
    ],
    weights: [
      { label: "250g", value: "250g", price: 799, originalPrice: 999, inStock: true },
      { label: "500g", value: "500g", price: 1399, originalPrice: 1799, inStock: false },
    ],
    benefits: [
      "Combined antioxidant power of garlic + honey",
      "Soothes sore throat naturally",
      "Supports gut health with prebiotics",
      "Natural antimicrobial properties",
      "Improves digestion",
    ],
    ingredients: "Raw Forest Honey (65%), Aged Black Garlic Cloves (35%). No sugar added.",
    nutritionalInfo: {
      servingSize: "1 tablespoon (20g)",
      calories: "55 kcal",
      sugars: "13g (natural)",
    },
    howToUse:
      "Take 1 tbsp daily in the morning on empty stomach, or spread on toast, mix in warm tea (not boiling). Can be used as a glaze for cooking.",
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    isFeatured: true,
    tags: ["honey", "black garlic", "immunity", "gourmet", "sore throat"],
    badge: "Premium",
  },
  {
    id: "7",
    name: "Triphala Churna",
    slug: "triphala-churna",
    category: "Ayurvedic",
    description:
      "The cornerstone of Ayurvedic medicine — Triphala is a balanced blend of three sacred fruits: Amalaki (Indian Gooseberry), Bibhitaki, and Haritaki. Our Triphala is traditionally processed and tested for heavy metals and microbial safety.",
    shortDescription:
      "Classical Ayurvedic tri-fruit blend. Gentle detox, digestive support, and rejuvenation.",
    price: 329,
    originalPrice: 429,
    images: [
      "/images/products/triphala-1.jpg",
    ],
    weights: [
      { label: "100g", value: "100g", price: 329, originalPrice: 429, inStock: true },
      { label: "250g", value: "250g", price: 749, originalPrice: 949, inStock: true },
    ],
    benefits: [
      "Gentle yet effective digestive cleansing",
      "Rich in Vitamin C (from Amalaki)",
      "Supports healthy bowel movements",
      "Anti-aging and rejuvenating",
      "Detoxifies the liver and colon",
    ],
    ingredients:
      "Amalaki (Emblica officinalis) 33.3%, Bibhitaki (Terminalia bellirica) 33.3%, Haritaki (Terminalia chebula) 33.3%.",
    nutritionalInfo: {
      servingSize: "1/2 teaspoon (2g)",
      "Vitamin C": "~25mg",
      tannins: "naturally occurring",
    },
    howToUse:
      "Mix 1/2 tsp in warm water at bedtime. Or take with honey in the morning. Start with every other day, then increase to daily.",
    rating: 4.8,
    reviewCount: 145,
    inStock: true,
    tags: ["triphala", "ayurveda", "detox", "digestion", "cleanse"],
  },
  {
    id: "8",
    name: "Raw Organic Turmeric Powder",
    slug: "raw-organic-turmeric-powder",
    category: "Spices & Herbs",
    description:
      "Vibrant, high-curcumin turmeric from the famed Erode region of Tamil Nadu — the Turmeric Capital of India. Our turmeric contains minimum 3-5% curcumin (vs 1-2% in commercial varieties). Stone-ground and sun-dried to preserve phytonutrients.",
    shortDescription:
      "High-curcumin Erode turmeric. 3-5% curcumin content. Stone-ground, sun-dried.",
    price: 249,
    originalPrice: 329,
    images: [
      "/images/products/turmeric-1.jpg",
    ],
    weights: [
      { label: "100g", value: "100g", price: 249, originalPrice: 329, inStock: true },
      { label: "250g", value: "250g", price: 549, originalPrice: 749, inStock: true },
      { label: "500g", value: "500g", price: 999, originalPrice: 1299, inStock: true },
    ],
    benefits: [
      "Powerful anti-inflammatory (Curcumin)",
      "Supports joint health and mobility",
      "Liver protective properties",
      "Antioxidant and anti-cancer potential",
      "Improves brain function (BDNF)",
      "Natural antiseptic",
    ],
    ingredients: "100% Pure Organic Turmeric Powder (Curcuma longa). No fillers.",
    nutritionalInfo: {
      servingSize: "1 teaspoon (3g)",
      calories: "9 kcal",
      curcumin: "90-150mg",
    },
    howToUse:
      "Golden Milk: Mix 1/4 tsp in warm milk with black pepper and honey. Add to curries, soups, and smoothies. Combine with black pepper to enhance absorption 20x.",
    rating: 4.7,
    reviewCount: 213,
    inStock: true,
    isBestseller: true,
    tags: ["turmeric", "curcumin", "anti-inflammatory", "golden milk", "spice"],
    badge: "Bestseller",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    author: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    text: "I've been using GURUKRUPA NATURALS Black Garlic for 3 months now. My cholesterol levels have improved significantly and I feel so much more energetic. The quality is exceptional — you can taste the authenticity.",
    verified: true,
    product: "Organic Black Garlic Cloves",
  },
  {
    id: "2",
    author: "Rajesh Mehta",
    location: "Bangalore, Karnataka",
    rating: 5,
    text: "The Tulsi Green Tea is absolutely divine! I've replaced my morning chai with this and my stress levels have reduced noticeably. Packaging is beautiful and delivery was prompt. Highly recommend!",
    verified: true,
    product: "Organic Tulsi Green Tea",
  },
  {
    id: "3",
    author: "Ananya Krishnan",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    text: "Started with the Ashwagandha churna on my doctor's advice. Within 4 weeks, my sleep improved dramatically and I feel much calmer. The purity is evident — no artificial smell or taste.",
    verified: true,
    product: "Ashwagandha Churna",
  },
  {
    id: "4",
    author: "Vivek Patel",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    text: "The Black Garlic Honey is a revelation! I spread it on toast every morning and it's become my favourite thing. Also noticed my seasonal allergies have reduced. Premium product at a fair price.",
    verified: true,
    product: "Black Garlic Honey",
  },
  {
    id: "5",
    author: "Sanjana Nair",
    location: "Kochi, Kerala",
    rating: 5,
    text: "I'm a nutritionist and I recommend GURUKRUPA NATURALS to my clients. The lab reports are transparent, sourcing is ethical, and the potency is far superior to other brands I've tried. Trust is earned here.",
    verified: true,
  },
  {
    id: "6",
    author: "Arjun Singh",
    location: "New Delhi",
    rating: 4,
    text: "Excellent moringa powder. Mixed it into my post-workout smoothie and the nutritional boost is real. Packaging could be improved for resealability but the product itself is top notch.",
    verified: true,
    product: "Moringa Leaf Powder",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Surprising Health Benefits of Black Garlic You Need to Know",
    slug: "health-benefits-of-black-garlic",
    excerpt:
      "Black garlic — the dark, fermented version of regular garlic — has been used in Asian cuisine and medicine for centuries. Modern science is now confirming what traditional healers knew all along.",
    content: "",
    category: "Black Garlic",
    author: "Dr. Ayesha Sharma",
    publishedAt: "2024-12-15",
    readTime: 8,
    image: "/images/blog/black-garlic-benefits.jpg",
    tags: ["black garlic", "health", "antioxidants", "immunity"],
  },
  {
    id: "2",
    title: "The Ancient Wisdom of Ayurveda: 5 Daily Rituals for Modern Life",
    slug: "ayurveda-daily-rituals-for-modern-life",
    excerpt:
      "Ayurveda — India's 5,000-year-old science of life — offers profound wisdom for navigating the stresses of modern existence. Here are 5 rituals you can start today.",
    content: "",
    category: "Ayurveda",
    author: "Vaidya Ramesh Iyer",
    publishedAt: "2024-12-08",
    readTime: 6,
    image: "/images/blog/ayurveda-rituals.jpg",
    tags: ["ayurveda", "wellness", "morning routine", "holistic health"],
  },
  {
    id: "3",
    title: "Why Organic Matters: The Truth About Pesticides in Your Food",
    slug: "why-organic-matters-pesticides-in-food",
    excerpt:
      "Choosing organic is more than a lifestyle choice — it's a health decision backed by compelling science. We break down the real impact of pesticide exposure and why clean food matters.",
    content: "",
    category: "Organic Living",
    author: "Pooja Mehta",
    publishedAt: "2024-11-30",
    readTime: 7,
    image: "/images/blog/organic-farming.jpg",
    tags: ["organic", "pesticides", "clean eating", "health"],
  },
  {
    id: "4",
    title: "Moringa: The Tree of Life Explained Scientifically",
    slug: "moringa-tree-of-life-scientific-explanation",
    excerpt:
      "Moringa oleifera has been called many things: the Tree of Life, the Miracle Tree, a nutritional powerhouse. But what does the science actually say? We examine 40+ clinical studies.",
    content: "",
    category: "Superfoods",
    author: "Dr. Suresh Nair",
    publishedAt: "2024-11-22",
    readTime: 10,
    image: "/images/blog/moringa-science.jpg",
    tags: ["moringa", "nutrition", "superfood", "science"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export const categories = [
  { id: "1", name: "Black Garlic", slug: "black-garlic", count: 3 },
  { id: "2", name: "Herbal Teas", slug: "herbal-teas", count: 1 },
  { id: "3", name: "Ayurvedic", slug: "ayurvedic", count: 2 },
  { id: "4", name: "Superfoods", slug: "superfoods", count: 1 },
  { id: "5", name: "Spices & Herbs", slug: "spices-herbs", count: 1 },
];
