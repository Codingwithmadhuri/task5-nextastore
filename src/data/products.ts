import { Product } from '../types/product';
import electronicsImg from '../assets/images/category_electronics_1791039316992.jpg';
import fashionImg from '../assets/images/category_fashion_1791039333239.jpg';
import accessoriesImg from '../assets/images/category_accessories_1791039344008.jpg';
import homeImg from '../assets/images/category_home_1791039353135.jpg';

export const PRODUCTS: Product[] = [
  // --- ELECTRONICS ---
  {
    id: 'prod-elec-01',
    name: 'AcousticPro ANC Wireless Headphones',
    category: 'Electronics',
    price: 14999,
    originalPrice: 18999,
    description: 'Studio-grade hybrid active noise-cancellation with 40mm beryllium drivers, 38-hour battery endurance, and plush memory foam earcups encased in anodized aluminum.',
    features: [
      'Hybrid 4-mic Active Noise Cancellation',
      'Lossless LDAC & aptX HD Bluetooth 5.3',
      '38-Hour Battery with Fast USB-C Quick Charge (10 min = 5 hrs)',
      'Multi-point device pairing with seamless handoff'
    ],
    image: electronicsImg,
    fallbackGradient: 'from-slate-900 to-slate-800',
    rating: 4.8,
    reviewCount: 142,
    stock: 24,
    isFeatured: true,
    isNewArrival: false,
    tags: ['Best Seller', 'Wireless', 'Audio']
  },
  {
    id: 'prod-elec-02',
    name: 'NovaMechanical Slim Wireless Keyboard',
    category: 'Electronics',
    price: 7499,
    originalPrice: 8999,
    description: 'Low-profile mechanical tactile keyboard with custom lubricated switches, CNC machined aluminum chassis, and hot-swappable key switches.',
    features: [
      'Low-profile tactile quiet switches',
      'Triple connectivity: 2.4GHz dongle, Bluetooth 5.2 & Type-C',
      'PBT double-shot keycaps with subtle white backlighting',
      'Compatible with macOS, Windows, Linux, and iPadOS'
    ],
    image: electronicsImg,
    fallbackGradient: 'from-zinc-800 to-zinc-900',
    rating: 4.7,
    reviewCount: 88,
    stock: 18,
    isFeatured: true,
    isNewArrival: true,
    tags: ['Workspace', 'Tactile']
  },
  {
    id: 'prod-elec-03',
    name: 'PrecisionTrack Ergonomic Wireless Mouse',
    category: 'Electronics',
    price: 4299,
    originalPrice: 4999,
    description: 'Sculpted vertical ergonomic silhouette engineered to eliminate forearm strain. Featuring a high-precision 8000 DPI sensor and silent tactile click switches.',
    features: [
      '57-degree natural handshake ergonomic angle',
      'Hyper-fast electromagnetic MagScroll wheel',
      'Rechargeable 500mAh cell with 70 days endurance',
      'Customizable thumb gestures and side buttons'
    ],
    image: electronicsImg,
    fallbackGradient: 'from-neutral-800 to-slate-900',
    rating: 4.6,
    reviewCount: 65,
    stock: 31,
    isFeatured: false,
    isNewArrival: false,
    tags: ['Ergonomics', 'Office']
  },
  {
    id: 'prod-elec-04',
    name: 'SoundOrbit 360 Spatial Desk Speaker',
    category: 'Electronics',
    price: 9999,
    originalPrice: 12499,
    description: 'Omnidirectional ambient room audio wrapped in acoustic Danish wool fabric, driven by dual passive radiators and balanced silk-dome tweeters.',
    features: [
      'True 360-degree acoustic dispersion wavefront',
      'Aux-in 3.5mm and high-res Wi-Fi / Bluetooth streaming',
      'Room-sensing acoustic calibration',
      'Integrated touch-sensitive glass top control panel'
    ],
    image: electronicsImg,
    fallbackGradient: 'from-stone-800 to-stone-900',
    rating: 4.9,
    reviewCount: 54,
    stock: 12,
    isFeatured: true,
    isNewArrival: true,
    tags: ['Home Audio', 'Hi-Fi']
  },

  // --- FASHION ---
  {
    id: 'prod-fash-01',
    name: 'Structured Merino Wool Overshirt',
    category: 'Fashion',
    price: 5999,
    originalPrice: 7999,
    description: 'Crafted from 100% fine Australian merino wool with a dense twill weave. Designed as an all-season layering piece with horn buttons and utility chest pockets.',
    features: [
      'Pure 280 GSM Merino Wool twill weave',
      'Natural temperature-regulating and odor-resistant fibers',
      'Reinforced double-needle seam construction',
      'Tailored relaxed drape suitable for layering'
    ],
    image: fashionImg,
    fallbackGradient: 'from-stone-700 to-stone-800',
    rating: 4.8,
    reviewCount: 97,
    stock: 22,
    isFeatured: true,
    isNewArrival: false,
    tags: ['Merino Wool', 'Layering']
  },
  {
    id: 'prod-fash-02',
    name: 'Relaxed Tapered Organic Cotton Chino',
    category: 'Fashion',
    price: 3499,
    originalPrice: 4299,
    description: 'Cut from premium 10oz organic cotton twill with 2% elastane for unrestricted movement. Finished with a garment-dye wash for soft lived-in texture.',
    features: [
      'GOTS-certified 100% organic cotton base',
      'Mid-rise waist with internal drawstring option',
      'Bar-tacked stress points for long-term durability',
      'Pre-shrunk Japanese garment dye technique'
    ],
    image: fashionImg,
    fallbackGradient: 'from-neutral-700 to-stone-800',
    rating: 4.5,
    reviewCount: 73,
    stock: 15,
    isFeatured: false,
    isNewArrival: false,
    tags: ['Organic', 'Trousers']
  },
  {
    id: 'prod-fash-03',
    name: 'Minimalist Heavyweight Pima Tee (2-Pack)',
    category: 'Fashion',
    price: 2499,
    originalPrice: 2999,
    description: 'Extra-long staple Peruvian Pima cotton knit in a substantial 240 GSM weight. Retains shape and ultra-soft hand feel after repeated washes.',
    features: [
      '100% Extra-long staple Pima Cotton',
      'Double-ribbed anti-stretch collar',
      'Preshrunk heavyweight 240 GSM jersey',
      'Tagless back neck label for zero friction'
    ],
    image: fashionImg,
    fallbackGradient: 'from-slate-700 to-zinc-800',
    rating: 4.9,
    reviewCount: 210,
    stock: 45,
    isFeatured: true,
    isNewArrival: true,
    tags: ['Essential', 'Pack of 2']
  },
  {
    id: 'prod-fash-04',
    name: 'All-Weather Technical Storm Parka',
    category: 'Fashion',
    price: 11999,
    originalPrice: 14999,
    description: 'Three-layer waterproof breathable shell fabric with taped seams, YKK AquaGuard zips, and an articulated hood designed for adverse urban climates.',
    features: [
      '20,000mm Waterproof / 15,000g Breathability rating',
      'Fully sealed seams with recycled fleece thermal lining',
      'Dual zippered interior security and device pockets',
      'Magnetic storm flap closure over main two-way zipper'
    ],
    image: fashionImg,
    fallbackGradient: 'from-zinc-800 to-slate-900',
    rating: 4.7,
    reviewCount: 41,
    stock: 9,
    isFeatured: false,
    isNewArrival: true,
    tags: ['Waterproof', 'Outerwear']
  },

  // --- ACCESSORIES ---
  {
    id: 'prod-acc-01',
    name: 'Chronos Titanium Automatic Watch',
    category: 'Accessories',
    price: 18999,
    originalPrice: 22999,
    description: 'Grade 2 Titanium field watch featuring an exhibition caseback displaying a 24-jewel Japanese mechanical movement with 41-hour reserve.',
    features: [
      'Scratch-resistant sapphire crystal with AR coating',
      'Surgical Grade 2 matte titanium case (40mm)',
      '100m (10 ATM) water resistance with screw-down crown',
      'Quick-release Italian vegetable-tanned leather strap'
    ],
    image: accessoriesImg,
    fallbackGradient: 'from-stone-800 to-zinc-900',
    rating: 4.9,
    reviewCount: 84,
    stock: 8,
    isFeatured: true,
    isNewArrival: false,
    tags: ['Automatic', 'Titanium']
  },
  {
    id: 'prod-acc-02',
    name: 'Artisan Full-Grain Leather Cardholder',
    category: 'Accessories',
    price: 1999,
    originalPrice: 2499,
    description: 'Hand-burnished Italian vegetable-tanned leather with 6 card slots and a central currency fold compartment. Develops a rich patina with use.',
    features: [
      '100% full-grain Tuscan vegetable-tanned leather',
      'Hand-stitched with waxed polyester thread',
      'Integrated RFID-blocking mesh lining',
      'Slim 5mm profile holds up to 8 cards easily'
    ],
    image: accessoriesImg,
    fallbackGradient: 'from-amber-950 to-stone-900',
    rating: 4.8,
    reviewCount: 162,
    stock: 35,
    isFeatured: true,
    isNewArrival: false,
    tags: ['Handcrafted', 'Leather']
  },
  {
    id: 'prod-acc-03',
    name: 'Vantage Polarized Acetate Sunglasses',
    category: 'Accessories',
    price: 4999,
    originalPrice: 6299,
    description: 'Handcrafted cellulose acetate frames with five-barrel hinges and category 3 polarized lenses offering complete UV400 protection.',
    features: [
      'Bio-acetate frame carved from plant-based acetate',
      'Triacetate Cellulose (TAC) anti-scratch polarized lenses',
      'Custom wire core temples for precision fit adjustments',
      'Includes protective structured hard case and microfiber cloth'
    ],
    image: accessoriesImg,
    fallbackGradient: 'from-stone-900 to-amber-950',
    rating: 4.6,
    reviewCount: 52,
    stock: 19,
    isFeatured: false,
    isNewArrival: true,
    tags: ['Polarized', 'Eyewear']
  },
  {
    id: 'prod-acc-04',
    name: 'Komorebi Cordura Commuter Backpack',
    category: 'Accessories',
    price: 6499,
    originalPrice: 7999,
    description: '22L weatherproof commuter pack built from 500D Cordura ballistic nylon. Features a dedicated 16-inch suspended laptop sleeve and luggage pass-through.',
    features: [
      '500D CORDURA nylon with DWR water-repellent finish',
      'Suspended padded compartment for up to 16" laptops',
      'Ergonomic EVA foam molded back panel with airflow channels',
      'YKK AquaGuard weather-resistant zipper closures'
    ],
    image: accessoriesImg,
    fallbackGradient: 'from-slate-800 to-neutral-900',
    rating: 4.8,
    reviewCount: 119,
    stock: 14,
    isFeatured: true,
    isNewArrival: false,
    tags: ['Travel', 'Commute']
  },

  // --- HOME & LIVING ---
  {
    id: 'prod-home-01',
    name: 'Aura Matte Ceramic Ultrasonic Diffuser',
    category: 'Home',
    price: 3899,
    originalPrice: 4699,
    description: 'Handcrafted stoneware ceramic cover with whisper-quiet ultrasonic atomization. Features ambient warm LED glow and 8-hour interval diffusion mode.',
    features: [
      'Hand-thrown bisqued ceramic shell with matte glaze',
      'Ultrasonic vibration at 2.4MHz for cool micro-fine mist',
      'Warm 2700K ambient LED glow with dimmable settings',
      'Auto-shutoff safety sensor when water reservoir depletes'
    ],
    image: homeImg,
    fallbackGradient: 'from-stone-700 to-amber-900',
    rating: 4.9,
    reviewCount: 138,
    stock: 20,
    isFeatured: true,
    isNewArrival: true,
    tags: ['Aromatherapy', 'Ceramic']
  },
  {
    id: 'prod-home-02',
    name: 'Solace Brushed Brass Architect Desk Lamp',
    category: 'Home',
    price: 6999,
    originalPrice: 8499,
    description: 'Weighted solid brass desk luminaire with a precision counterbalanced articulated arm and 95+ CRI warm spectrum dimmable LEDs.',
    features: [
      'Solid spun brass shade with brushed natural patina finish',
      'High color rendering index (CRI 97) natural light spectrum',
      'Stepless rotary brass knob dimmer on weighted base',
      'Braided cotton electrical cable with brass grounded plug'
    ],
    image: homeImg,
    fallbackGradient: 'from-amber-900 to-stone-900',
    rating: 4.7,
    reviewCount: 46,
    stock: 11,
    isFeatured: false,
    isNewArrival: false,
    tags: ['Lighting', 'Brass']
  },
  {
    id: 'prod-home-03',
    name: 'Vase No. 4 Sculptural Stoneware Vessel',
    category: 'Home',
    price: 3299,
    originalPrice: 3999,
    description: 'Organic asymmetric form thrown from coarse grogged stoneware clay. Beautiful as a standalone sculptural object or filled with dry botanicals.',
    features: [
      'Handcrafted ceramic with sand-textured exterior',
      'Water-tight glazed interior suitable for fresh floral stems',
      'Dimensions: 24cm H x 18cm W x 14cm D',
      'Handmade in limited seasonal studio firings'
    ],
    image: homeImg,
    fallbackGradient: 'from-stone-600 to-stone-800',
    rating: 4.8,
    reviewCount: 67,
    stock: 16,
    isFeatured: true,
    isNewArrival: false,
    tags: ['Decor', 'Handmade']
  },
  {
    id: 'prod-home-04',
    name: 'Belgian Linen Waffle Throw Blanket',
    category: 'Home',
    price: 4499,
    originalPrice: 5499,
    description: 'Pre-washed 100% Belgian flax linen woven in a dimensional waffle texture. Breathable in summer and cozy in winter with fringe-trimmed hem.',
    features: [
      '100% European Flax certified Belgian linen',
      'Dimensional honeycomb waffle weave (350 GSM)',
      'Garment washed for supreme softness from day one',
      'Generous 140cm x 200cm dimension'
    ],
    image: homeImg,
    fallbackGradient: 'from-stone-500 to-stone-700',
    rating: 4.9,
    reviewCount: 89,
    stock: 25,
    isFeatured: false,
    isNewArrival: true,
    tags: ['Linen', 'Comfort']
  }
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const current = getProductById(productId);
  if (!current) return PRODUCTS.slice(0, limit);

  // Return items from the same category first, excluding itself
  const sameCategory = PRODUCTS.filter((p) => p.category === current.category && p.id !== productId);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // Fill up with featured items
  const otherItems = PRODUCTS.filter((p) => p.id !== productId && p.category !== current.category);
  return [...sameCategory, ...otherItems].slice(0, limit);
}
