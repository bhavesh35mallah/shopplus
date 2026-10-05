import { useState, useEffect } from "react";

export interface ProductColorSwatch {
  name: string;
  colorHex: string;
  imageUrl?: string;
}

export interface ProductSpecification {
  key: string;
  value: string;
}

export interface StoredProduct {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription?: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  images: string[];
  swatches?: ProductColorSwatch[];
  sizes?: string[];
  highlights?: string[];
  specifications?: ProductSpecification[];
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  brand?: string;
  tags: string[];
  eventTags: string[];
  stock: number;
  lowStockThreshold?: number;
  barcode?: string;
  rating: number;
  reviewsCount: number;
  status: "active" | "inactive";
  sales?: number;
  isHotDrop?: boolean;
  isFeatured?: boolean;
  badge?: string;
}

export interface StoredOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  destination: string;
  itemsCount: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  date: string;
  city: string;
  carrier?: string;
  trackingNumber?: string;
  items: {
    name: string;
    image: string;
    price: number;
    qty: number;
  }[];
  steps: {
    label: string;
    completed: boolean;
    date: string;
  }[];
}

export interface StoredCampaign {
  id: string;
  name: string;
  code: string;
  discountPercent: number;
  active: boolean;
  bannerText: string;
  expiresIn: string;
}

export interface StoredAddress {
  id: string;
  tag: string;
  fullName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  isDefault: boolean;
}

export interface StoredWarranty {
  id: string;
  productName: string;
  serialNumber: string;
  purchaseDate: string;
  expiryDate: string;
  status: "active" | "expired";
  category: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  image: string;
  stats?: string;
}

export interface HomePageConfig {
  heroSection: {
    enabled: boolean;
    autoplaySpeed: number;
    slides: HeroSlide[];
  };
  flashBanner: {
    enabled: boolean;
    badge: string;
    text: string;
    code: string;
    discountPercent: number;
    link: string;
    timerText: string;
  };
  partnerBrands: {
    enabled: boolean;
    title: string;
    brands: string[];
  };
  trustBadges: {
    enabled: boolean;
    items: { icon: string; title: string; desc: string }[];
  };
  featuredCollections: {
    enabled: boolean;
    title: string;
    subtitle: string;
    collections: {
      id: string;
      title: string;
      subtitle: string;
      category: string;
      image: string;
      tag: string;
    }[];
  };
  trendingSection: {
    enabled: boolean;
    title: string;
    subtitle: string;
    badge: string;
    limit: number;
  };
  dealOfTheDay: {
    enabled: boolean;
    title: string;
    subtitle: string;
    discountBadge: string;
    productTitle: string;
    price: number;
    originalPrice: number;
    image: string;
    link: string;
    endsInHours: number;
  };
  testimonials: {
    enabled: boolean;
    title: string;
    subtitle: string;
    items: {
      id: string;
      name: string;
      role: string;
      comment: string;
      rating: number;
      avatar: string;
    }[];
  };
  newsletterSection: {
    enabled: boolean;
    title: string;
    subtitle: string;
    badge: string;
    discountOffer: string;
  };
  faqSection: {
    enabled: boolean;
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  advancedSections?: {
    livePulse?: boolean;
    almostSoldOut?: boolean;
    compareAndDecide?: boolean;
    premiumCollection?: boolean;
    mysteryDeals?: boolean;
    spinAndWin?: boolean;
    rewardsPoints?: boolean;
    socialFeed?: boolean;
    completeTheLook?: boolean;
    shopByNeed?: boolean;
    contextAware?: boolean;
    seasonalCalendar?: boolean;
    weeklyAwards?: boolean;
    productBattle?: boolean;
    buyMoreSaveMore?: boolean;
    recentlyViewed?: boolean;
    upcomingEventCountdown?: boolean;
  };
}

export const DEFAULT_HOME_PAGE_CONFIG: HomePageConfig = {
  heroSection: {
    enabled: true,
    autoplaySpeed: 5000,
    slides: [
      {
        id: "slide-1",
        title: "Tournament-Grade English Willow Crafted For Power",
        subtitle: "Engineered with Grade 1 hand-selected willow, calibrated balance pickup, and explosive rebound edges for premier leagues.",
        tag: "PRO SERIES 2026",
        tagColor: "bg-rose-500",
        ctaText: "Shop Tournament Bats",
        ctaLink: "/shop?category=cricket",
        secondaryCtaText: "Explore Collection",
        secondaryCtaLink: "/shop",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600&auto=format&fit=crop&q=90",
        stats: "Used by 42+ League Pros",
      },
      {
        id: "slide-2",
        title: "Next-Gen Track & Turf Performance Footwear",
        subtitle: "AeroSpike aerodynamic spikes with multi-directional turf grip and high-energy propulsion plates for game-winning acceleration.",
        tag: "LIMITED DROP",
        tagColor: "bg-amber-500",
        ctaText: "Discover AeroSpike",
        ctaLink: "/shop?category=footwear",
        secondaryCtaText: "View Technology",
        secondaryCtaLink: "/shop",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&auto=format&fit=crop&q=90",
        stats: "Ultra-Lightweight 185g",
      },
      {
        id: "slide-3",
        title: "Official Matchday Supporter Kits & Team Wear",
        subtitle: "Moisture-wicking dry-knit fan jerseys with laser heat-zone ventilation, official championship badges, and precision athletic tailoring.",
        tag: "SUPPORTERS VAULT",
        tagColor: "bg-blue-600",
        ctaText: "Get Matchday Ready",
        ctaLink: "/shop?category=mens-fashion",
        secondaryCtaText: "Custom Name Print",
        secondaryCtaLink: "/shop",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1600&auto=format&fit=crop&q=90",
        stats: "Official Authentic Weave",
      },
      {
        id: "slide-4",
        title: "Immersive Studio Audio For Athletes & Creators",
        subtitle: "Aura Studio active noise cancellation with 40mm beryllium drivers, 45-hour playback, and instant low-latency game sync.",
        tag: "STUDIO GRADE",
        tagColor: "bg-purple-600",
        ctaText: "Experience Aura Sound",
        ctaLink: "/shop?category=electronics",
        secondaryCtaText: "Technical Specs",
        secondaryCtaLink: "/shop",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format&fit=crop&q=90",
        stats: "Hi-Res LDAC Certified",
      },
    ],
  },
  flashBanner: {
    enabled: true,
    badge: "SUPER OVER SPECIAL",
    text: "FLASH SALE: FLAT 60% OFF ON ALL CRICKET GEAR & SUPPORTERS APPAREL",
    code: "MATCH60",
    discountPercent: 60,
    link: "/shop?category=cricket",
    timerText: "Ends in 03:42:19",
  },
  partnerBrands: {
    enabled: true,
    title: "Official Equipment & Apparel Partners",
    brands: [
      "PulseSport",
      "AuraTech",
      "UrbanStitch",
      "LuxeFemme",
      "StrideX",
      "ChronoCraft",
      "ApexGrid",
      "Loom & Stone",
    ],
  },
  trustBadges: {
    enabled: true,
    items: [
      {
        icon: "Truck",
        title: "Express Priority Shipping",
        desc: "Same-day courier dispatch across India",
      },
      {
        icon: "ShieldCheck",
        title: "100% Verified Authentic",
        desc: "Certified gear backed by maker guarantee",
      },
      {
        icon: "RotateCcw",
        title: "30-Day Hassle-Free Returns",
        desc: "Instant doorstep pickup & refund policy",
      },
      {
        icon: "Zap",
        title: "24/7 Matchday Support",
        desc: "Live specialist assistance around the clock",
      },
    ],
  },
  featuredCollections: {
    enabled: true,
    title: "Curated Tournament Collections",
    subtitle: "Engineered for elite competitors, training warriors, and stadium crowds",
    collections: [
      {
        id: "col-1",
        title: "Tournament Cricket Gear",
        subtitle: "English Willow Bats, Match Pads & Jerseys",
        category: "cricket",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
        tag: "PRO SERIES",
      },
      {
        id: "col-2",
        title: "Urban Menswear",
        subtitle: "Heavyweight Cotton Tees & Relaxed Denim",
        category: "mens-fashion",
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80",
        tag: "NEW SEASON",
      },
      {
        id: "col-3",
        title: "Pro Footwear",
        subtitle: "High-Traction Turf Spikes & Daily Runners",
        category: "footwear",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        tag: "LIMITED SIZES",
      },
      {
        id: "col-4",
        title: "Audio & Wearables",
        subtitle: "Active Noise-Cancelling Cans & Smart Trackers",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
        tag: "HI-RES AUDIO",
      },
    ],
  },
  trendingSection: {
    enabled: true,
    title: "Trending In The Stadium Vault",
    subtitle: "High-demand gear, matchday apparel, and tournament drops selling out fast",
    badge: "LIVE FEED",
    limit: 8,
  },
  dealOfTheDay: {
    enabled: true,
    title: "Super Over Flash Deal",
    subtitle: "Available at this unprecedented price for the next few hours only",
    discountBadge: "SAVE $80 TODAY",
    productTitle: "Aura Pro Grade 1 English Willow Cricket Bat",
    price: 349.99,
    originalPrice: 429.99,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    link: "/shop?category=cricket",
    endsInHours: 8,
  },
  testimonials: {
    enabled: true,
    title: "Trusted By Athletes & League Players",
    subtitle: "Real matchday reviews from customers across India and abroad",
    items: [
      {
        id: "rev-1",
        name: "Vikram Rathore",
        role: "State League Captain",
        comment: "The Aura Grade 1 Willow has the best pickup and balance I have held. The ping off the middle is explosive.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      },
      {
        id: "rev-2",
        name: "Ananya Deshmukh",
        role: "Triathlete & Marathoner",
        comment: "AeroSpike runners gave me zero blister friction during my 21km trial. Express courier arrived in 24 hours.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      },
      {
        id: "rev-3",
        name: "Sameer Khanna",
        role: "Verified Matchday Fan",
        comment: "Authentic moisture-wicking jersey fits true to size. The stitching and breathable weave are stadium grade.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      },
    ],
  },
  newsletterSection: {
    enabled: true,
    title: "Join The Pulse Athletes Club",
    subtitle: "Get exclusive tournament early-access, secret drop codes, and member perks directly in your inbox.",
    badge: "VIP COMMUNITY",
    discountOffer: "Get 15% OFF your first order with code WELCOME15",
  },
  faqSection: {
    enabled: true,
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about gear warranties, shipping, and matchday delivery",
    items: [
      {
        q: "Are all cricket bats knocked-in before shipping?",
        a: "Yes! All Pro Series English Willow bats receive 10,000 automated machine knocks and linseed oiling prior to dispatch, making them match-ready immediately upon unboxing.",
      },
      {
        q: "What is the return and replacement window?",
        a: "We offer a 30-day doorstep return and size-exchange policy with zero questions asked, as long as tags and original seals are intact.",
      },
      {
        q: "How does the certified warranty work?",
        a: "Every product includes an authenticity QR code and serial number. You can register your warranty certificate in your User Profile for 2-year manufacturer coverage.",
      },
      {
        q: "Do you ship express to tournament locations across India?",
        a: "Yes, our Mumbai and Bangalore fulfillment hubs operate 24/7 with express air shipping reaching most major cities within 24 to 48 hours.",
      },
    ],
  },
  advancedSections: {
    livePulse: true,
    almostSoldOut: true,
    compareAndDecide: true,
    premiumCollection: true,
    mysteryDeals: true,
    spinAndWin: true,
    rewardsPoints: true,
    socialFeed: true,
    completeTheLook: true,
    shopByNeed: true,
    contextAware: true,
    seasonalCalendar: true,
    weeklyAwards: true,
    productBattle: true,
    buyMoreSaveMore: true,
    recentlyViewed: true,
    upcomingEventCountdown: true,
  },
};

const DEFAULT_PRODUCTS: StoredProduct[] = [
  {
    _id: "prod-1",
    id: "prod-1",
    name: "Aura Pro Grade 1 English Willow Cricket Bat",
    slug: "aura-pro-grade-1-english-willow",
    sku: "BAT-AUR-G1",
    description: "Handcrafted masterclass English willow cricket bat with dynamic rebound, lightweight pickup, and oversized edges.",
    price: 349.99,
    compareAtPrice: 429.99,
    images: ["https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80"],
    category: { _id: "cat-cricket", name: "Cricket Gear", slug: "cricket" },
    brand: "PulseSport",
    tags: ["Grade 1", "Tournament Series", "Willow"],
    eventTags: ["IPL Drop", "Limited Edition"],
    stock: 24,
    rating: 4.9,
    reviewsCount: 142,
    status: "active",
    sales: 142,
    isHotDrop: true,
  },
  {
    _id: "prod-2",
    id: "prod-2",
    name: "Apex Elite Tournament Batting Pads (Ultralight)",
    slug: "apex-elite-tournament-batting-pads",
    sku: "PAD-APX-02",
    description: "High-density molded cane guards with gel knee cups providing maximum pace deflection and swift running agility.",
    price: 89.99,
    compareAtPrice: 119.99,
    images: ["https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&auto=format&fit=crop&q=80"],
    category: { _id: "cat-cricket", name: "Cricket Gear", slug: "cricket" },
    brand: "ApexGrid",
    tags: ["Protection", "Batting Pads"],
    eventTags: ["Pro Kit"],
    stock: 45,
    rating: 4.8,
    reviewsCount: 88,
    status: "active",
    sales: 210,
  },
  {
    _id: "prod-3",
    id: "prod-3",
    name: "ShopPulse AeroSpike Cricket Bowling Shoes",
    slug: "shoppulse-aerospike-cricket-shoes",
    sku: "SHO-AER-11",
    description: "Engineered metal spike layout with shock-absorbing midsole designed for relentless pacers on firm pitches.",
    price: 119.5,
    compareAtPrice: 149.99,
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80"],
    category: { _id: "cat-footwear", name: "Footwear", slug: "footwear" },
    brand: "StrideX",
    tags: ["Bowling Spikes", "Athletics"],
    eventTags: ["IPL Edition"],
    stock: 8,
    rating: 4.9,
    reviewsCount: 95,
    status: "active",
    sales: 88,
  },
  {
    _id: "prod-4",
    id: "prod-4",
    name: "Carbon-Infused Titanium Cricket Helmet",
    slug: "carbon-infused-titanium-cricket-helmet",
    sku: "HLM-CRB-09",
    description: "ICC regulation approved titanium grilled helmet with multi-density EPS liner and adjustable rear headband dial.",
    price: 149.0,
    compareAtPrice: 189.0,
    images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80"],
    category: { _id: "cat-cricket", name: "Cricket Gear", slug: "cricket" },
    brand: "PulseSport",
    tags: ["Protection", "Helmets"],
    eventTags: ["Safety Certified"],
    stock: 3,
    rating: 4.9,
    reviewsCount: 64,
    status: "active",
    sales: 64,
    isHotDrop: true,
  },
  {
    _id: "prod-5",
    id: "prod-5",
    name: "Pro-Dry IPL Edition Moisture-Wicking Jersey",
    slug: "pro-dry-ipl-edition-jersey",
    sku: "JRS-DRY-88",
    description: "Laser-perforated cooling panels with anti-odor silver ion weave. Official supporters edition.",
    price: 49.99,
    compareAtPrice: 65.0,
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80"],
    category: { _id: "cat-mens", name: "Men's Apparel", slug: "mens-fashion" },
    brand: "UrbanStitch",
    tags: ["Apparel", "Supporters Kit"],
    eventTags: ["Fan Exclusive"],
    stock: 32,
    rating: 4.7,
    reviewsCount: 130,
    status: "active",
    sales: 310,
  },
  {
    _id: "prod-6",
    id: "prod-6",
    name: "Aura Studio ANC Wireless Headphones",
    slug: "aura-studio-anc-wireless-headphones",
    sku: "AUD-ANC-01",
    description: "Active noise cancelling with 40mm beryllium drivers, 45-hour battery life, and ultra-low latency game sync.",
    price: 199.99,
    compareAtPrice: 249.99,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"],
    category: { _id: "cat-gadgets", name: "Electronics", slug: "electronics" },
    brand: "AuraTech",
    tags: ["Audio", "Wireless", "ANC"],
    eventTags: ["Hot Tech"],
    stock: 19,
    rating: 4.9,
    reviewsCount: 220,
    status: "active",
    sales: 180,
  },
];

const DEFAULT_ORDERS: StoredOrder[] = [
  {
    id: "ord-1",
    orderNumber: "SP-89210",
    customerName: "Alex Morgan",
    customerEmail: "customer@shoppulse.com",
    destination: "Flat 402, Highrise Palms, Bandra West, Mumbai (400050)",
    itemsCount: 2,
    total: 369.98,
    status: "processing",
    paymentMethod: "Razorpay / UPI",
    date: "Today, 10:14 AM",
    city: "Mumbai, MH",
    carrier: "BlueDart Express",
    trackingNumber: "BLUEDART-88210-EXP",
    items: [
      {
        name: "Aura Pro Grade 1 English Willow Cricket Bat",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80",
        price: 349.99,
        qty: 1,
      },
      {
        name: "Pro-Grip Silicone Bat Grip (Pack of 3)",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=80",
        price: 19.99,
        qty: 1,
      },
    ],
    steps: [
      { label: "Order Placed", completed: true, date: "10:14 AM" },
      { label: "Oiled & Knocked In", completed: true, date: "11:30 AM" },
      { label: "Dispatched from Mumbai Hub", completed: false, date: "Expected 4:00 PM" },
      { label: "Out for Delivery", completed: false, date: "Tomorrow" },
    ],
  },
  {
    id: "ord-2",
    orderNumber: "SP-88340",
    customerName: "Alex Morgan",
    customerEmail: "customer@shoppulse.com",
    destination: "Flat 402, Highrise Palms, Bandra West, Mumbai (400050)",
    itemsCount: 1,
    total: 119.5,
    status: "delivered",
    paymentMethod: "Credit Card (Stripe)",
    date: "Sep 22, 2026",
    city: "Mumbai, MH",
    carrier: "Delhivery Air",
    trackingNumber: "DELHIVERY-99214-DOM",
    items: [
      {
        name: "ShopPulse AeroSpike Bowling Spikes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80",
        price: 119.5,
        qty: 1,
      },
    ],
    steps: [
      { label: "Order Placed", completed: true, date: "Sep 22" },
      { label: "Packed & Inspected", completed: true, date: "Sep 22" },
      { label: "Shipped", completed: true, date: "Sep 23" },
      { label: "Delivered", completed: true, date: "Sep 24" },
    ],
  },
  {
    id: "ord-3",
    orderNumber: "SP-89209",
    customerName: "Jessica Wong",
    customerEmail: "jwong@example.com",
    destination: "Camden, London, UK",
    itemsCount: 1,
    total: 119.5,
    status: "shipped",
    paymentMethod: "Credit Card (Stripe)",
    date: "Today, 08:30 AM",
    city: "London, UK",
    carrier: "BlueDart Express",
    trackingNumber: "BLUEDART-88209-INTL",
    items: [
      {
        name: "ShopPulse AeroSpike Cricket Bowling Shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80",
        price: 119.5,
        qty: 1,
      },
    ],
    steps: [
      { label: "Order Placed", completed: true, date: "08:30 AM" },
      { label: "Packed & Label Generated", completed: true, date: "09:15 AM" },
      { label: "Handed over to BlueDart", completed: true, date: "10:00 AM" },
      { label: "In Flight Transit", completed: false, date: "Arriving Friday" },
    ],
  },
];

const DEFAULT_CAMPAIGNS: StoredCampaign[] = [
  {
    id: "camp-1",
    name: "IPL Super Over Flash Drop",
    code: "SUPERSIX25",
    discountPercent: 25,
    active: true,
    bannerText: "IPL Final Round: Flat 25% OFF on Grade 1 Willow Bats & Pads with code SUPERSIX25",
    expiresIn: "08h 42m remaining",
  },
  {
    id: "camp-2",
    name: "Midnight Weekend Rush",
    code: "MIDNIGHT15",
    discountPercent: 15,
    active: false,
    bannerText: "Midnight Spike: 15% OFF Sitewide for Club Members!",
    expiresIn: "Starts Friday 11:59 PM",
  },
  {
    id: "camp-3",
    name: "Monsoon Cricket Gear Clearance",
    code: "MONSOON30",
    discountPercent: 30,
    active: true,
    bannerText: "Pre-Season Clearance: Up to 30% OFF Pro Spikes & Cricket Kits",
    expiresIn: "3 days remaining",
  },
];

const DEFAULT_ADDRESSES: StoredAddress[] = [
  {
    id: "addr-1",
    tag: "Home",
    fullName: "Alex Morgan",
    street: "Flat 402, Highrise Palms, Pali Hill",
    apartment: "Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    zip: "400050",
    phone: "+91 98200 44210",
    isDefault: true,
  },
  {
    id: "addr-2",
    tag: "Club Academy",
    fullName: "Alex Morgan (Coach Desk)",
    street: "Wankhede Cricket Practice Pavilion",
    city: "Mumbai",
    state: "Maharashtra",
    zip: "400020",
    phone: "+91 98200 44210",
    isDefault: false,
  },
];

const DEFAULT_WARRANTIES: StoredWarranty[] = [
  {
    id: "w-1",
    productName: "Aura Pro Grade 1 English Willow Cricket Bat",
    serialNumber: "BAT-AUR-G1-998210",
    purchaseDate: "Oct 05, 2026",
    expiryDate: "Apr 05, 2027 (6 Months Willow Guard)",
    status: "active",
    category: "Bat Willow Protection",
  },
  {
    id: "w-2",
    productName: "ShopPulse AeroSpike Bowling Spikes",
    serialNumber: "SHO-AER-11-482910",
    purchaseDate: "Sep 22, 2026",
    expiryDate: "Sep 22, 2027 (1 Year Sole & Spike Guarantee)",
    status: "active",
    category: "Athletic Footwear",
  },
];

// Helper to notify listeners across the application
const notifyUpdate = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("shoppulse_store_update"));
  }
};

export const dynamicStore = {
  // PRODUCTS
  getProducts: (): StoredProduct[] => {
    try {
      const data = localStorage.getItem("shoppulse_products");
      return data ? JSON.parse(data) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  },

  syncServerProducts: (serverProducts: StoredProduct[]): StoredProduct[] => {
    if (!serverProducts || serverProducts.length === 0) {
      return dynamicStore.getProducts();
    }
    const current = dynamicStore.getProducts();
    const productMap = new Map<string, StoredProduct>();

    // Add all server products
    serverProducts.forEach((sp) => {
      const idKey = sp._id || sp.id || sp.slug;
      if (idKey) {
        productMap.set(idKey, {
          ...sp,
          id: sp._id || sp.id,
        });
      }
    });

    // Merge locally created or edited products
    current.forEach((lp) => {
      const idKey = lp._id || lp.id || lp.slug;
      if (idKey) {
        const existing = productMap.get(idKey);
        if (existing) {
          productMap.set(idKey, { ...existing, ...lp });
        } else {
          productMap.set(idKey, lp);
        }
      }
    });

    const merged = Array.from(productMap.values());
    localStorage.setItem("shoppulse_products", JSON.stringify(merged));
    notifyUpdate();
    return merged;
  },

  addProduct: (product: StoredProduct): StoredProduct => {
    const list = dynamicStore.getProducts();
    const updated = [product, ...list];
    localStorage.setItem("shoppulse_products", JSON.stringify(updated));
    notifyUpdate();
    return product;
  },

  updateProduct: (id: string, updates: Partial<StoredProduct>): void => {
    const list = dynamicStore.getProducts();
    const updated = list.map((p) =>
      p._id === id || p.id === id ? { ...p, ...updates } : p
    );
    localStorage.setItem("shoppulse_products", JSON.stringify(updated));
    notifyUpdate();
  },

  deleteProduct: (id: string): void => {
    const list = dynamicStore.getProducts();
    const updated = list.filter((p) => p._id !== id && p.id !== id);
    localStorage.setItem("shoppulse_products", JSON.stringify(updated));
    notifyUpdate();
  },

  // ORDERS
  getOrders: (): StoredOrder[] => {
    try {
      const data = localStorage.getItem("shoppulse_orders");
      return data ? JSON.parse(data) : DEFAULT_ORDERS;
    } catch {
      return DEFAULT_ORDERS;
    }
  },

  addOrder: (order: StoredOrder): void => {
    const list = dynamicStore.getOrders();
    const updated = [order, ...list];
    localStorage.setItem("shoppulse_orders", JSON.stringify(updated));
    notifyUpdate();
  },

  updateOrderStatus: (
    orderId: string,
    status: StoredOrder["status"],
    trackingNumber?: string
  ): void => {
    const list = dynamicStore.getOrders();
    const updated = list.map((o) => {
      if (o.id === orderId || o.orderNumber === orderId) {
        return {
          ...o,
          status,
          trackingNumber: trackingNumber || o.trackingNumber,
        };
      }
      return o;
    });
    localStorage.setItem("shoppulse_orders", JSON.stringify(updated));
    notifyUpdate();
  },

  syncServerOrders: (serverOrders: StoredOrder[]): StoredOrder[] => {
    if (!serverOrders || serverOrders.length === 0) {
      return dynamicStore.getOrders();
    }
    const current = dynamicStore.getOrders();
    const orderMap = new Map<string, StoredOrder>();

    serverOrders.forEach((so) => {
      const key = so.id || so.orderNumber;
      if (key) {
        orderMap.set(key, so);
      }
    });

    current.forEach((lo) => {
      const key = lo.id || lo.orderNumber;
      if (key && !orderMap.has(key)) {
        orderMap.set(key, lo);
      }
    });

    const merged = Array.from(orderMap.values());
    try {
      localStorage.setItem("shoppulse_orders", JSON.stringify(merged));
    } catch {
      // ignore
    }
    notifyUpdate();
    return merged;
  },

  // CAMPAIGNS & FLASH DROPS
  getCampaigns: (): StoredCampaign[] => {
    try {
      const data = localStorage.getItem("shoppulse_campaigns");
      return data ? JSON.parse(data) : DEFAULT_CAMPAIGNS;
    } catch {
      return DEFAULT_CAMPAIGNS;
    }
  },

  toggleCampaign: (id: string): void => {
    const list = dynamicStore.getCampaigns();
    const updated = list.map((c) =>
      c.id === id ? { ...c, active: !c.active } : c
    );
    localStorage.setItem("shoppulse_campaigns", JSON.stringify(updated));
    notifyUpdate();
  },

  // SAVED ADDRESSES
  getAddresses: (): StoredAddress[] => {
    try {
      const data = localStorage.getItem("shoppulse_addresses");
      return data ? JSON.parse(data) : DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  },

  addAddress: (addr: StoredAddress): void => {
    let list = dynamicStore.getAddresses();
    if (addr.isDefault) {
      list = list.map((a) => ({ ...a, isDefault: false }));
    }
    const updated = [addr, ...list];
    localStorage.setItem("shoppulse_addresses", JSON.stringify(updated));
    notifyUpdate();
  },

  setDefaultAddress: (id: string): void => {
    const list = dynamicStore.getAddresses();
    const updated = list.map((a) => ({ ...a, isDefault: a.id === id }));
    localStorage.setItem("shoppulse_addresses", JSON.stringify(updated));
    notifyUpdate();
  },

  deleteAddress: (id: string): void => {
    const list = dynamicStore.getAddresses();
    const updated = list.filter((a) => a.id !== id);
    localStorage.setItem("shoppulse_addresses", JSON.stringify(updated));
    notifyUpdate();
  },

  // WARRANTIES
  getWarranties: (): StoredWarranty[] => {
    try {
      const data = localStorage.getItem("shoppulse_warranties");
      return data ? JSON.parse(data) : DEFAULT_WARRANTIES;
    } catch {
      return DEFAULT_WARRANTIES;
    }
  },

  addWarranty: (w: StoredWarranty): void => {
    const list = dynamicStore.getWarranties();
    const updated = [w, ...list];
    localStorage.setItem("shoppulse_warranties", JSON.stringify(updated));
    notifyUpdate();
  },

  // WALLET
  getWalletBalance: (): number => {
    try {
      const b = localStorage.getItem("shoppulse_wallet");
      return b ? parseFloat(b) : 38420.0;
    } catch {
      return 38420.0;
    }
  },

  updateWalletBalance: (delta: number): number => {
    const current = dynamicStore.getWalletBalance();
    const next = Math.max(0, current + delta);
    localStorage.setItem("shoppulse_wallet", next.toString());
    notifyUpdate();
    return next;
  },
  // HOME PAGE CMS CONFIG
  getHomePageConfig: (): HomePageConfig => {
    try {
      const data = localStorage.getItem("shoppulse_home_config");
      if (!data) return DEFAULT_HOME_PAGE_CONFIG;
      const parsed = JSON.parse(data);
      return {
        ...DEFAULT_HOME_PAGE_CONFIG,
        ...parsed,
        heroSection: { ...DEFAULT_HOME_PAGE_CONFIG.heroSection, ...parsed.heroSection },
        flashBanner: { ...DEFAULT_HOME_PAGE_CONFIG.flashBanner, ...parsed.flashBanner },
        partnerBrands: { ...DEFAULT_HOME_PAGE_CONFIG.partnerBrands, ...parsed.partnerBrands },
        trustBadges: { ...DEFAULT_HOME_PAGE_CONFIG.trustBadges, ...parsed.trustBadges },
        featuredCollections: { ...DEFAULT_HOME_PAGE_CONFIG.featuredCollections, ...parsed.featuredCollections },
        trendingSection: { ...DEFAULT_HOME_PAGE_CONFIG.trendingSection, ...parsed.trendingSection },
        dealOfTheDay: { ...DEFAULT_HOME_PAGE_CONFIG.dealOfTheDay, ...parsed.dealOfTheDay },
        testimonials: { ...DEFAULT_HOME_PAGE_CONFIG.testimonials, ...parsed.testimonials },
        newsletterSection: { ...DEFAULT_HOME_PAGE_CONFIG.newsletterSection, ...parsed.newsletterSection },
        faqSection: { ...DEFAULT_HOME_PAGE_CONFIG.faqSection, ...parsed.faqSection },
        advancedSections: { ...DEFAULT_HOME_PAGE_CONFIG.advancedSections, ...(parsed.advancedSections || {}) },
      };
    } catch {
      return DEFAULT_HOME_PAGE_CONFIG;
    }
  },

  updateHomePageConfig: (updates: Partial<HomePageConfig>): HomePageConfig => {
    const current = dynamicStore.getHomePageConfig();
    const updated: HomePageConfig = {
      ...current,
      ...updates,
    };
    localStorage.setItem("shoppulse_home_config", JSON.stringify(updated));
    notifyUpdate();
    return updated;
  },

  resetHomePageConfig: (): HomePageConfig => {
    localStorage.setItem("shoppulse_home_config", JSON.stringify(DEFAULT_HOME_PAGE_CONFIG));
    notifyUpdate();
    return DEFAULT_HOME_PAGE_CONFIG;
  },
};

// React hook to automatically subscribe to store mutations
export const useDynamicStore = () => {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setVersion((v) => v + 1);
    };

    window.addEventListener("shoppulse_store_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("shoppulse_store_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return {
    version,
    products: dynamicStore.getProducts(),
    orders: dynamicStore.getOrders(),
    campaigns: dynamicStore.getCampaigns(),
    addresses: dynamicStore.getAddresses(),
    warranties: dynamicStore.getWarranties(),
    walletBalance: dynamicStore.getWalletBalance(),
    homeConfig: dynamicStore.getHomePageConfig(),
    ...dynamicStore,
  };
};
