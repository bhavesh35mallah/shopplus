import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const categoriesData = [
  { name: "Cricket & Sports", slug: "cricket", description: "Cricket gear, sportswear, and fitness equipment" },
  { name: "Electronics & Audio", slug: "electronics", description: "Smart devices, headphones, and modern gadgets" },
  { name: "Men's Apparel", slug: "mens-fashion", description: "Casual, formal, and athletic clothing for men" },
  { name: "Women's Apparel", slug: "womens-fashion", description: "Dresses, tops, athleisure, and ethnic wear" },
  { name: "Footwear & Sneakers", slug: "footwear", description: "Running shoes, casual sneakers, and formal boots" },
  { name: "Watches & Accessories", slug: "accessories", description: "Smartwatches, sunglasses, backpacks, and wallets" },
  { name: "Gaming Gear", slug: "gaming", description: "Keyboards, controllers, gaming mice, and headsets" },
  { name: "Home & Desk Essentials", slug: "home-lifestyle", description: "Minimalist desk lamps, bottles, and lifestyle gear" }
];

// Curated high quality product image sets
const imagePool: Record<string, string[]> = {
  cricket: [
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&auto=format&fit=crop&q=80"
  ],
  electronics: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80"
  ],
  "mens-fashion": [
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80"
  ],
  "womens-fashion": [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80"
  ],
  footwear: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80"
  ],
  accessories: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80"
  ],
  gaming: [
    "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1598550476439-6847785fdd52?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1612287232231-64d505be174d?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80"
  ],
  "home-lifestyle": [
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80"
  ]
};

// Item templates per category for realistic naming & catalog generation
const catalogTemplates = [
  {
    categorySlug: "cricket",
    brand: "PulseSport",
    eventTags: ["cricket", "world-cup", "ipl-2026", "sports-fever"],
    items: [
      { name: "Pro Willow English Cricket Bat", price: 6499, compare: 7999, tags: ["bat", "cricket", "english-willow"] },
      { name: "Official Match Test Leather Ball (Pack of 2)", price: 899, compare: 1199, tags: ["ball", "leather", "cricket"] },
      { name: "Pro-Flex Lightweight Batting Pads", price: 2199, compare: 2799, tags: ["pads", "guard", "protection"] },
      { name: "Impact Guard Batting Gloves", price: 1499, compare: 1899, tags: ["gloves", "batting", "cricket"] },
      { name: "Club Edition Cricket Kit Bag with Wheels", price: 3499, compare: 4499, tags: ["bag", "kitbag", "gear"] },
      { name: "Premium Titanium Cricket Helmet", price: 2799, compare: 3499, tags: ["helmet", "protection", "headgear"] },
      { name: "Rubber Stud Cricket Spike Shoes", price: 2499, compare: 3199, tags: ["shoes", "spikes", "footwear"] },
      { name: "India Fan Supporter Tracksuit", price: 1999, compare: 2499, tags: ["jersey", "tracksuit", "india"] },
      { name: "High-Grip Bat Grips Bundle (Set of 4)", price: 499, compare: 699, tags: ["grips", "accessories"] },
      { name: "Cricket Umpire Hat & Sweatband Combo", price: 599, compare: 799, tags: ["hat", "sweatband", "apparel"] },
      { name: "Speed Arm Ball Thrower Trainer", price: 899, compare: 1299, tags: ["training", "bowling", "trainer"] },
      { name: "Thigh & Inner Thigh Combo Pad", price: 1199, compare: 1599, tags: ["pads", "protection"] },
      { name: "Wicket Keeping Poly Pro Gloves", price: 1899, compare: 2399, tags: ["keeping", "gloves"] }
    ]
  },
  {
    categorySlug: "electronics",
    brand: "AuraTech",
    eventTags: ["tech-fest", "cyber-week", "gadget-deals"],
    items: [
      { name: "Aura ANC Wireless Noise Cancelling Headphones", price: 4999, compare: 6999, tags: ["audio", "bluetooth", "anc"] },
      { name: "BassPro Waterproof Portable Bluetooth Speaker", price: 2499, compare: 3499, tags: ["speaker", "audio", "wireless"] },
      { name: "True Wireless Earbuds with ENC Dual Mic", price: 1799, compare: 2499, tags: ["earbuds", "tws", "music"] },
      { name: "MagSafe 3-in-1 Fast Wireless Charging Station", price: 2299, compare: 2999, tags: ["charger", "wireless", "iphone"] },
      { name: "65W GaN Multi-Port USB-C Wall Charger", price: 1499, compare: 1999, tags: ["charger", "gan", "fast-charging"] },
      { name: "20,000mAh Ultra-Slim Power Bank PD 30W", price: 1899, compare: 2599, tags: ["powerbank", "battery", "travel"] },
      { name: "Studio USB Condenser Microphone with Arm", price: 3299, compare: 4299, tags: ["microphone", "streaming", "podcast"] },
      { name: "RGB Soundbar with Bluetooth 5.3", price: 2199, compare: 2899, tags: ["soundbar", "speaker", "desktop"] },
      { name: "4K 60FPS Ultra HD Webcam with Privacy Cover", price: 2899, compare: 3699, tags: ["webcam", "camera", "streaming"] },
      { name: "Dual-Driver In-Ear Gaming Earphones", price: 899, compare: 1299, tags: ["earphones", "wired", "gaming"] },
      { name: "Aluminum Laptop Stand with Cooling Vents", price: 1199, compare: 1699, tags: ["stand", "laptop", "ergonomic"] },
      { name: "Bluetooth Car FM Transmitter & Fast Charger", price: 799, compare: 999, tags: ["car", "bluetooth", "charger"] },
      { name: "Braided 100W Type-C to Type-C Cable 2m", price: 499, compare: 699, tags: ["cable", "fast-charging"] }
    ]
  },
  {
    categorySlug: "mens-fashion",
    brand: "UrbanStitch",
    eventTags: ["summer-drop", "flash-sale", "mens-week"],
    items: [
      { name: "Heavyweight 240 GSM Oversized Cotton T-Shirt", price: 899, compare: 1299, tags: ["t-shirt", "oversized", "cotton"] },
      { name: "Slim Fit Stretch Chino Trousers", price: 1499, compare: 1999, tags: ["chinos", "trousers", "formal"] },
      { name: "Classic French Terry Pullover Hoodie", price: 1899, compare: 2499, tags: ["hoodie", "winter", "casual"] },
      { name: "Vintage Washed Relaxed Denim Jacket", price: 2499, compare: 3299, tags: ["jacket", "denim", "outerwear"] },
      { name: "Breathable Linen Casual Summer Shirt", price: 1399, compare: 1799, tags: ["linen", "shirt", "summer"] },
      { name: "Cargo Utility Joggers with Deep Pockets", price: 1599, compare: 2199, tags: ["cargo", "joggers", "streetwear"] },
      { name: "Mandarin Collar Oxford Formal Shirt", price: 1299, compare: 1699, tags: ["shirt", "formal", "office"] },
      { name: "Athletic Dri-Fit Workout Tank Top", price: 699, compare: 899, tags: ["gym", "activewear", "tank"] },
      { name: "Thermal Waffle Knit Long-Sleeve Shirt", price: 999, compare: 1399, tags: ["knit", "casual", "shirt"] },
      { name: "Tailored Peak Lapel Blazer", price: 4499, compare: 5999, tags: ["blazer", "formal", "suit"] },
      { name: "Organic Cotton Boxer Briefs (Pack of 3)", price: 799, compare: 1099, tags: ["innerwear", "cotton"] },
      { name: "Casual Bomber Jacket with Ribbed Collar", price: 2299, compare: 2999, tags: ["jacket", "bomber", "streetwear"] }
    ]
  },
  {
    categorySlug: "womens-fashion",
    brand: "LuxeFemme",
    eventTags: ["spring-collection", "festive-sale", "trending"],
    items: [
      { name: "Floral Wrap Tiered Midi Dress", price: 1899, compare: 2499, tags: ["dress", "floral", "summer"] },
      { name: "Seamless High-Waisted Ribbed Yoga Leggings", price: 1199, compare: 1599, tags: ["leggings", "yoga", "gym"] },
      { name: "Oversized Knitted Wool Blend Cardigan", price: 2199, compare: 2899, tags: ["cardigan", "knitwear", "winter"] },
      { name: "Cropped Linen Casual Shirt with Pocket", price: 1099, compare: 1499, tags: ["crop-top", "linen", "casual"] },
      { name: "Silk Satin Slip Evening Dress", price: 2499, compare: 3299, tags: ["dress", "satin", "party"] },
      { name: "High-Rise Wide Leg Palazzo Pants", price: 1399, compare: 1899, tags: ["pants", "wide-leg", "formal"] },
      { name: "Structured Double-Breasted Trench Coat", price: 4299, compare: 5499, tags: ["coat", "trench", "outerwear"] },
      { name: "Embroidered Cotton Anarkali Kurti", price: 1699, compare: 2299, tags: ["ethnic", "kurti", "traditional"] },
      { name: "Puff Sleeve Floral Blouse", price: 999, compare: 1299, tags: ["top", "blouse", "casual"] },
      { name: "Denim Belted Button-Down Jumpsuit", price: 2299, compare: 2999, tags: ["jumpsuit", "denim", "chic"] },
      { name: "Plisse Pleated Maxi Skirt", price: 1299, compare: 1699, tags: ["skirt", "maxi", "party"] },
      { name: "Fleece-Lined Warm Winter Trackpants", price: 1199, compare: 1599, tags: ["sweatpants", "fleece", "lounge"] }
    ]
  },
  {
    categorySlug: "footwear",
    brand: "StrideX",
    eventTags: ["sports-gear", "sneakerhead", "marathon"],
    items: [
      { name: "CloudFoam Pro Running Shoes", price: 2899, compare: 3699, tags: ["running", "shoes", "sneakers"] },
      { name: "Retro Low-Top Skateboarding Sneakers", price: 2199, compare: 2799, tags: ["skate", "sneakers", "streetwear"] },
      { name: "Full-Grain Leather Chelsea Boots", price: 3999, compare: 4999, tags: ["boots", "leather", "chelsea"] },
      { name: "Breathable Mesh Slip-On Walking Shoes", price: 1499, compare: 1999, tags: ["slip-on", "walking", "comfort"] },
      { name: "All-Terrain Waterproof Trail Hiking Shoes", price: 3499, compare: 4499, tags: ["hiking", "outdoor", "trail"] },
      { name: "Formal Oxford Brogues Handcrafted", price: 3199, compare: 3999, tags: ["formal", "brogues", "leather"] },
      { name: "Ergonomic Memory Foam Slide Sandals", price: 899, compare: 1299, tags: ["slides", "sandals", "comfort"] },
      { name: "Chunky Platform Casual Sneakers", price: 2599, compare: 3299, tags: ["platform", "sneakers", "fashion"] },
      { name: "High-Top Canvas Street Sneakers", price: 1799, compare: 2299, tags: ["canvas", "high-top", "retro"] },
      { name: "Lightweight Badminton Court Shoes", price: 2299, compare: 2899, tags: ["court", "badminton", "indoor"] },
      { name: "Waterproof Winter Duck Snow Boots", price: 3799, compare: 4699, tags: ["boots", "winter", "waterproof"] },
      { name: "Comfort Arch Support Leather Loafers", price: 2499, compare: 3199, tags: ["loafers", "casual", "leather"] }
    ]
  },
  {
    categorySlug: "accessories",
    brand: "ChronoCraft",
    eventTags: ["lifestyle", "gifting", "prime-drop"],
    items: [
      { name: "Titanium AMOLED Bluetooth Calling Smartwatch", price: 3499, compare: 4999, tags: ["smartwatch", "amoled", "fitness"] },
      { name: "Classic Minimalist Sapphire Dial Chronograph Watch", price: 2999, compare: 3999, tags: ["watch", "analog", "luxury"] },
      { name: "Polarized UV400 Wayfarer Sunglasses", price: 1199, compare: 1699, tags: ["sunglasses", "eyewear", "summer"] },
      { name: "Full-Grain RFID-Protected Bifold Leather Wallet", price: 999, compare: 1499, tags: ["wallet", "leather", "accessories"] },
      { name: "Anti-Theft Waterproof Laptop Backpack 25L", price: 2199, compare: 2899, tags: ["backpack", "travel", "laptop"] },
      { name: "Stainless Steel Milanese Loop Magnetic Watch Strap", price: 699, compare: 999, tags: ["strap", "watch", "accessories"] },
      { name: "Vintage Genuine Leather Duffle Travel Bag", price: 3799, compare: 4999, tags: ["duffle", "leather", "travel"] },
      { name: "Gunmetal Reversible Top Grain Leather Belt", price: 899, compare: 1299, tags: ["belt", "leather", "formal"] },
      { name: "Hard-Shell Protective Eyewear Sunglasses Case", price: 399, compare: 599, tags: ["case", "eyewear"] },
      { name: "Aviation Style Blue Light Filter Glasses", price: 999, compare: 1399, tags: ["glasses", "computer", "protection"] },
      { name: "Minimalist Titanium Key Organizer Clip", price: 599, compare: 899, tags: ["keychain", "edc", "accessories"] },
      { name: "Padded Waterproof Tech Cable Organizer Pouch", price: 699, compare: 999, tags: ["travel", "organizer", "cables"] }
    ]
  },
  {
    categorySlug: "gaming",
    brand: "ApexGrid",
    eventTags: ["gaming-expo", "esports-2026", "gamers-choice"],
    items: [
      { name: "Wireless Mechanical Gaming Keyboard RGB Brown Switch", price: 3799, compare: 4999, tags: ["keyboard", "mechanical", "rgb"] },
      { name: "Ultra-Lightweight 58g Honeycomb Gaming Mouse", price: 1899, compare: 2499, tags: ["mouse", "gaming", "sensor"] },
      { name: "7.1 Surround Sound Pro Gaming Headset with Mic", price: 2599, compare: 3499, tags: ["headset", "audio", "mic"] },
      { name: "Extended RGB Desk Pad Extra-Large 900x400mm", price: 999, compare: 1499, tags: ["mousepad", "rgb", "desk"] },
      { name: "Ergonomic Hall Effect Wireless Game Controller", price: 2999, compare: 3899, tags: ["controller", "gamepad", "wireless"] },
      { name: "Aluminum RGB Headphone Stand with USB Hub", price: 1299, compare: 1699, tags: ["stand", "headset", "rgb"] },
      { name: "Padded Memory Foam Wrist Rest for Keyboard", price: 699, compare: 899, tags: ["ergonomic", "wrist-rest"] },
      { name: "Adjustable Boom Arm Heavy Duty Mic Mount", price: 1199, compare: 1599, tags: ["boom-arm", "streaming"] },
      { name: "USB Streamer Soundcard Audio Mixer Interface", price: 2799, compare: 3699, tags: ["audio", "mixer", "streamer"] },
      { name: "Custom PBT Pudding Keycaps Set 108 Keys", price: 899, compare: 1299, tags: ["keycaps", "custom", "keyboard"] },
      { name: "Silent Mouse Glides PTFE Feet Replacement Kit", price: 399, compare: 599, tags: ["mouse", "accessories"] },
      { name: "Dual Controller Desktop Charging Dock Station", price: 1499, compare: 1999, tags: ["dock", "charger", "controller"] }
    ]
  },
  {
    categorySlug: "home-lifestyle",
    brand: "Loom & Stone",
    eventTags: ["home-makeover", "new-arrivals", "minimalist"],
    items: [
      { name: "Smart Touch Dimmable Minimalist Desk Lamp", price: 1499, compare: 1999, tags: ["lamp", "lighting", "desk"] },
      { name: "Vacuum Insulated Stainless Steel Thermal Flask 1L", price: 999, compare: 1399, tags: ["bottle", "thermal", "fitness"] },
      { name: "Ultrasonic Essential Oil Aromatherapy Diffuser", price: 1699, compare: 2299, tags: ["diffuser", "wellness", "home"] },
      { name: "Natural Bamboo Bedside Organizer Station", price: 1199, compare: 1599, tags: ["organizer", "bamboo", "desk"] },
      { name: "Ceramic Matte Stoneware Coffee Mug (Set of 2)", price: 799, compare: 1099, tags: ["mug", "coffee", "ceramic"] },
      { name: "Cozy Waffle Weave Breathable Throw Blanket", price: 1799, compare: 2399, tags: ["blanket", "bedding", "cotton"] },
      { name: "Wall-Mounted Minimalist Floating Key Shelf", price: 899, compare: 1199, tags: ["shelf", "decor", "home"] },
      { name: "Scented Soy Wax Amber Jar Candles (Pack of 3)", price: 899, compare: 1299, tags: ["candles", "scented", "aromatherapy"] },
      { name: "Ergonomic Memory Foam Lumbar Support Pillow", price: 1299, compare: 1699, tags: ["cushion", "ergonomic", "office"] },
      { name: "Heavyweight Linen Table Runner 180cm", price: 799, compare: 999, tags: ["dining", "table", "decor"] },
      { name: "Double-Walled Glass Espresso Tumblers (Set of 4)", price: 999, compare: 1399, tags: ["glassware", "coffee", "kitchen"] },
      { name: "Magnetic Automatic Bottle Opener Stainless Steel", price: 499, compare: 699, tags: ["kitchen", "gadget", "barware"] }
    ]
  }
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI not found in environment variables");
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("Database connection not established");
  }

  console.log("Creating/updating categories...");
  const categoryMap = new Map<string, mongoose.Types.ObjectId>();

  for (const cat of categoriesData) {
    const existing = await db.collection("categories").findOne({ slug: cat.slug });
    if (existing) {
      categoryMap.set(cat.slug, existing._id as mongoose.Types.ObjectId);
    } else {
      const inserted = await db.collection("categories").insertOne({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        parentId: null,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      });
      categoryMap.set(cat.slug, inserted.insertedId as unknown as mongoose.Types.ObjectId);
    }
  }

  console.log(`Verified ${categoryMap.size} categories.`);

  // Generate 100 products
  const productsToInsert: any[] = [];
  let counter = 1;

  for (const group of catalogTemplates) {
    const catId = categoryMap.get(group.categorySlug);
    const images = imagePool[group.categorySlug] || imagePool["cricket"];

    for (const item of group.items) {
      if (counter > 100) break;

      const paddedIndex = String(counter).padStart(4, "0");
      const sku = `PULSE-${group.categorySlug.toUpperCase().slice(0, 3)}-${paddedIndex}`;
      const slug = `${slugify(item.name)}-${paddedIndex}`;
      const primaryImage = images[(counter - 1) % images.length];
      const secondaryImage = images[counter % images.length];

      // Random ratings between 4.1 and 4.9, reviews count between 12 and 450
      const rating = Number((4.0 + (counter % 9) * 0.1).toFixed(1));
      const reviewsCount = 15 + ((counter * 17) % 380);

      productsToInsert.push({
        name: item.name,
        slug,
        sku,
        description: `${item.name} by ${group.brand}. Premium build quality designed for performance, comfort, and lasting durability. Backed by ShopPulse official warranty and hassle-free returns.`,
        price: item.price,
        compareAtPrice: item.compare,
        images: [primaryImage, secondaryImage],
        category: catId,
        brand: group.brand,
        tags: [...item.tags, "shoppulse-choice", "trending"],
        eventTags: group.eventTags,
        stock: 15 + ((counter * 7) % 65),
        rating,
        reviewsCount,
        status: "active",
        createdAt: new Date(Date.now() - (100 - counter) * 3600000), // staggered creation dates
        updatedAt: new Date()
      });

      counter++;
    }
  }

  // If there are still slots to reach 100, add remaining variants
  while (counter <= 100) {
    const group = catalogTemplates[counter % catalogTemplates.length];
    const catId = categoryMap.get(group.categorySlug);
    const images = imagePool[group.categorySlug];
    const paddedIndex = String(counter).padStart(4, "0");
    const name = `${group.brand} Signature Edition Item #${counter}`;
    const sku = `PULSE-SIG-${paddedIndex}`;
    const slug = `${slugify(name)}-${paddedIndex}`;

    productsToInsert.push({
      name,
      slug,
      sku,
      description: `Exclusive signature edition item with premium materials and precision engineering by ${group.brand}.`,
      price: 1299 + (counter * 50) % 3000,
      compareAtPrice: 1999 + (counter * 50) % 3000,
      images: [images[counter % images.length], images[(counter + 1) % images.length]],
      category: catId,
      brand: group.brand,
      tags: ["exclusive", "signature", "trending"],
      eventTags: group.eventTags,
      stock: 20 + (counter % 40),
      rating: 4.6,
      reviewsCount: 38 + (counter % 120),
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    counter++;
  }

  console.log(`Prepared ${productsToInsert.length} products. Inserting into MongoDB...`);

  // Clear or upsert to avoid duplicate SKU errors
  let insertedCount = 0;
  for (const prod of productsToInsert) {
    const exists = await db.collection("products").findOne({ sku: prod.sku });
    if (!exists) {
      await db.collection("products").insertOne(prod);
      insertedCount++;
    }
  }

  const totalInDb = await db.collection("products").countDocuments({ status: "active" });
  console.log(`✅ Successfully seeded! Added ${insertedCount} new products. Total active products in DB: ${totalInDb}`);

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
