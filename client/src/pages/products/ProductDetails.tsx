import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getProduct,
  type Product,
} from "../../api/productApi";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/product/ProductCard";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { dynamicStore } from "../../utils/dynamicStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  Check,
  Zap,
  Sparkles,
  Maximize2,
  X,
  Share2,
  CheckCircle2,
  Ruler,
  Clock,
  Layers,
  Award,
  Flame,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";

interface AddonService {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
}

const addonServices: AddonService[] = [
  {
    id: "knocking",
    name: "Machine Bat Knocking & Oiling",
    price: 499,
    description: "15,000 automated strikes + linseed oil conditioning for instant match readiness",
    icon: "🔨",
  },
  {
    id: "engraving",
    name: "Custom Laser Engraving",
    price: 299,
    description: "Laser-carve your name, jersey number, or team monogram on the handle/blade",
    icon: "✍️",
  },
  {
    id: "sheet",
    name: "Extratec Scuff & Edge Armor",
    price: 199,
    description: "Transparent protective polymer sheet guarding against moisture and toe cracks",
    icon: "🛡️",
  },
];

interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  level: string;
}

const initialReviews: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Rohit K. (State Div 1)",
    rating: 5,
    date: "2 days ago",
    title: "Incredible balance and sweet spot ping!",
    comment:
      "Picked this up for the tournament season. The balance is featherweight despite a 40mm thick edge profile. Super responsive off the middle.",
    verified: true,
    level: "Pro Division Athlete",
  },
  {
    id: "rev-2",
    author: "Aman V. (Club Captain)",
    rating: 5,
    date: "1 week ago",
    title: "Top-notch craftmanship and fast delivery",
    comment:
      "Arrived within 24 hours in secure sealed packaging. The machine knocking service saved me days of manual mallet work.",
    verified: true,
    level: "Verified Buyer",
  },
  {
    id: "rev-3",
    author: "Siddharth M.",
    rating: 4,
    date: "2 weeks ago",
    title: "Premium finish, true to size",
    comment:
      "High quality materials throughout. Ergo handle absorbs match impacts very cleanly. Definitely recommending to my academy teammates.",
    verified: true,
    level: "Academy Athlete",
  },
];

const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Core Data State
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Gallery State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
    transform: "scale(1)",
    transformOrigin: "center center",
  });

  // Configurator State
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [engravingText, setEngravingText] = useState("");
  const [activeTab, setActiveTab] = useState<"specs" | "care" | "reviews" | "shipping">("specs");

  // Interaction Feedback
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Pincode Estimator State
  const [pincode, setPincode] = useState("400001");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(
    "Delivery by Tomorrow, 11:00 AM (Express Priority)"
  );

  // Bundle Selector State
  const [bundleSelected, setBundleSelected] = useState<boolean>(true);

  // Review Form State
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(initialReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");

  useEffect(() => {
    if (!slug) return;

    const loadProduct = async () => {
      try {
        setLoading(true);
        let data: Product | null = null;
        try {
          data = await getProduct(slug);
        } catch {
          const stored = dynamicStore.getProducts().find(
            (p) => p.slug === slug || p._id === slug || p.id === slug
          );
          if (stored) {
            data = {
              _id: stored._id || stored.id || slug,
              name: stored.name,
              slug: stored.slug || slug,
              sku: stored.sku,
              description: stored.description || "",
              price: stored.price,
              compareAtPrice: stored.compareAtPrice,
              images:
                stored.images && stored.images.length > 0
                  ? stored.images
                  : [
                      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
                    ],
              category: {
                _id: stored.category?._id || "cat-cricket",
                name: stored.category?.name || "Cricket Gear",
                slug: stored.category?.slug || "cricket",
              },
              brand: stored.brand || "PulseSport",
              tags: stored.tags || [],
              eventTags: stored.eventTags || [],
              stock: stored.stock,
              rating: stored.rating || 4.9,
              reviewsCount: stored.reviewsCount || 10,
              status: stored.status || "active",
            };
          }
        }

        if (data) {
          setProduct(data);
          setSelectedImageIndex(0);

          // Fetch related products
          const allStored = dynamicStore.getProducts();
          const related = allStored
            .filter(
              (p) =>
                (p._id !== data?._id && p.id !== data?._id) &&
                p.category?.slug === data?.category?.slug
            )
            .slice(0, 6)
            .map((p) => ({
              _id: p._id || p.id || "",
              name: p.name,
              slug: p.slug,
              sku: p.sku,
              description: p.description,
              price: p.price,
              compareAtPrice: p.compareAtPrice,
              images: p.images,
              category: p.category,
              brand: p.brand,
              tags: p.tags,
              eventTags: p.eventTags,
              stock: p.stock,
              rating: p.rating,
              reviewsCount: p.reviewsCount,
              status: p.status,
            }));
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // Available Sizes dynamically based on category
  const sizes = useMemo(() => {
    if (product?.category?.slug === "cricket") {
      return ["Light (1160g)", "Medium (1190g)", "Heavy (1230g)", "Short Handle", "Long Blade"];
    }
    if (product?.category?.slug === "footwear") {
      return ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"];
    }
    return ["S", "M", "L", "XL", "XXL"];
  }, [product?.category?.slug]);

  // Set default size when sizes change
  useEffect(() => {
    if (sizes.length > 0 && !sizes.includes(selectedSize)) {
      setSelectedSize(sizes[0]);
    }
  }, [sizes]);

  // Image Magnifier / Hover Zoom Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transform: "scale(1.8)",
      transformOrigin: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center center",
    });
  };

  // Addon Toggle
  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Total Addon Cost
  const addonsTotalCost = useMemo(() => {
    return selectedAddons.reduce((sum, id) => {
      const match = addonServices.find((s) => s.id === id);
      return sum + (match?.price || 0);
    }, 0);
  }, [selectedAddons]);

  // Final Item Price with Addons
  const effectivePrice = (product?.price || 0) + addonsTotalCost;

  const handleAddToCart = () => {
    if (!product) return;
    const finalDescription = selectedAddons.length > 0
      ? `${product.name} (Addons: ${selectedAddons.join(", ")}${
          engravingText ? ` | Engraving: "${engravingText}"` : ""
        })`
      : product.name;

    const customizedProduct = {
      ...product,
      name: finalDescription,
      price: effectivePrice,
    };

    addToCart(customizedProduct, quantity, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/shop");
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6) {
      setPincodeStatus("Delivery by Tomorrow, 11:00 AM (Priority Express)");
    } else {
      setPincodeStatus("Please enter a valid 6-digit postal code.");
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewTitle.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: "Just now",
      title: newReviewTitle.trim(),
      comment: newReviewComment.trim() || "Top pro gear, highly satisfied!",
      verified: true,
      level: "Verified Athlete",
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor("");
    setNewReviewTitle("");
    setNewReviewComment("");
    setShowReviewForm(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-16">
          <div className="grid gap-12 lg:grid-cols-12 animate-pulse">
            <div className="lg:col-span-7 aspect-[4/5] bg-slate-200 rounded-3xl" />
            <div className="lg:col-span-5 space-y-4 py-4">
              <div className="h-4 w-1/4 bg-slate-200 rounded" />
              <div className="h-8 w-3/4 bg-slate-200 rounded" />
              <div className="h-6 w-1/3 bg-slate-200 rounded" />
              <div className="h-32 w-full bg-slate-200 rounded-2xl" />
              <div className="h-14 w-full bg-slate-200 rounded-2xl" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="mx-auto max-w-[1400px] px-4 py-28 text-center">
          <div className="h-20 w-20 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-4">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 font-['Urbanist']">
            Product Not Found
          </h2>
          <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto">
            This gear item may be currently out of stock or relocated in our 2026 catalogue.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-block rounded-xl bg-slate-900 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-rose-600 transition-colors shadow-sm"
          >
            Browse Pro Catalog
          </Link>
        </div>
      </Layout>
    );
  }

  const isFavorited = isInWishlist(product._id);
  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
        )
      : null;

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=80",
        ];

  return (
    <Layout>
      {/* ========================================================
          1. Editorial Breadcrumbs & Header Strip
          ======================================================== */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <Link to="/shop" className="hover:text-slate-900 transition-colors">
              Pro Catalog
            </Link>
            {product.category && (
              <>
                <ChevronRight className="h-3 w-3 text-slate-400" />
                <Link
                  to={`/shop?category=${product.category.slug}`}
                  className="hover:text-slate-900 transition-colors capitalize font-medium"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-bold text-slate-900 truncate max-w-xs">
              {product.name}
            </span>
          </div>

          {/* Social Share Trigger */}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{copiedLink ? "Link Copied!" : "Share"}</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-8">
        {/* ========================================================
            2. Main Interactive Product Showcase
            ======================================================== */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* ========================================================
              Left Column: Image Magnifier & Interactive Gallery
              ======================================================== */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image Container with Magnifier */}
            <div
              className="relative overflow-hidden rounded-3xl bg-slate-50 border border-slate-200/80 aspect-[4/5] shadow-xs cursor-crosshair group select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={images[selectedImageIndex] || images[0]}
                alt={product.name}
                style={zoomStyle}
                className="h-full w-full object-cover object-center transition-transform duration-100 ease-out"
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                {product.eventTags?.[0] && (
                  <span className="rounded-full bg-slate-950/85 backdrop-blur-md px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-white border border-white/20">
                    {product.eventTags[0].replace("-", " ")}
                  </span>
                )}
                {discountPercent && (
                  <span className="rounded-full bg-rose-600 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
                    {discountPercent}% OFF
                  </span>
                )}
                <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-slate-800 shadow-xs border border-slate-200/60 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  100% Genuine Certified
                </span>
              </div>

              {/* Lightbox / Fullscreen trigger */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-md text-slate-700 shadow-md hover:bg-slate-900 hover:text-white transition-all duration-200 cursor-pointer"
                title="View Fullscreen"
              >
                <Maximize2 className="h-4 w-4" />
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
                className={`absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-2xl shadow-md backdrop-blur-md transition-all ${
                  isFavorited
                    ? "bg-rose-500 text-white scale-105"
                    : "bg-white/90 text-slate-700 hover:bg-white hover:text-rose-500 hover:scale-105"
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorited ? "fill-white" : ""}`}
                />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? "border-rose-600 shadow-md ring-2 ring-rose-600/20 scale-105"
                        : "border-slate-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="h-full w-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Equipment Certifications Strip */}
            <div className="grid grid-cols-3 gap-3 pt-3 text-center">
              <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <Award className="h-5 w-5 text-amber-500 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-800 block">
                  Grade 1+ Spec
                </span>
                <span className="text-[10px] text-slate-400">Tested Balance</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <ShieldCheck className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-800 block">
                  1-Yr Warranty
                </span>
                <span className="text-[10px] text-slate-400">Official Brand Cover</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <RotateCcw className="h-5 w-5 text-indigo-500 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-800 block">
                  30D Exchange
                </span>
                <span className="text-[10px] text-slate-400">Zero Hassle Pickup</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              Right Column: Product Details, Addons & Checkout
              ======================================================== */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Brand & Stock Pill */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-black uppercase tracking-wider text-rose-600 flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  {product.brand || "ShopPulse Signature"}
                </span>

                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock ({product.stock || 45} Units Left)
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight font-['Urbanist'] leading-snug">
                {product.name}
              </h1>

              {/* Rating & Live Viewers */}
              <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-900 border border-amber-200/60">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating > 0 ? product.rating.toFixed(1) : "4.8"}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    ({product.reviewsCount || 142} verified athlete reviews)
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                  <Flame className="h-3 w-3" />
                  <span>14 athletes viewing right now</span>
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-xl space-y-2 border border-slate-800">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-black font-['Urbanist']">
                  ₹{effectivePrice.toLocaleString("en-IN")}
                </span>

                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-lg text-slate-400 line-through">
                    ₹{product.compareAtPrice.toLocaleString("en-IN")}
                  </span>
                )}

                {discountPercent && (
                  <span className="text-xs font-black text-white bg-rose-600 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800">
                <span>Inclusive of all taxes &amp; duties</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Truck className="h-3.5 w-3.5" /> Free Express Delivery
                </span>
              </div>
            </div>

            {/* Size / Spec Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-['Urbanist']">
                  Select Size / Spec
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Ruler className="h-3.5 w-3.5" />
                  <span>Interactive Size Chart</span>
                </button>
              </div>

              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`h-11 px-4 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      selectedSize === size
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/15 scale-[1.02]"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Pro Matchday Addons */}
            <div className="space-y-2.5 p-4 rounded-3xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-['Urbanist'] flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  Match-Ready Pro Add-Ons
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  Optional Customizations
                </span>
              </div>

              <div className="space-y-2 pt-1">
                {addonServices.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                        isChecked
                          ? "bg-white border-rose-500 shadow-xs"
                          : "bg-white/60 border-slate-200 hover:bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAddon(addon.id)}
                        className="mt-0.5 h-4 w-4 rounded accent-rose-600"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">
                            {addon.icon} {addon.name}
                          </span>
                          <span className="font-black text-rose-600">
                            +₹{addon.price}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {addon.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Laser Engraving Input Field */}
              {selectedAddons.includes("engraving") && (
                <div className="mt-2 pt-2 border-t border-slate-200 animate-fadeIn">
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Enter Name / Jersey # to Engrave:
                  </label>
                  <input
                    type="text"
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    placeholder="e.g. V. KOHLI #18"
                    maxLength={20}
                    className="w-full rounded-xl bg-white border border-rose-300 px-3 py-2 text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>
              )}
            </div>

            {/* Quantity Stepper & Actions */}
            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-['Urbanist']">
                  Order Quantity
                </span>
                <div className="flex items-center border border-slate-200 rounded-2xl bg-white p-1 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Checkout CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex items-center justify-center gap-2 rounded-2xl py-4 px-6 text-xs font-bold uppercase tracking-wider text-white shadow-xl transition-all cursor-pointer ${
                    addedAnimation
                      ? "bg-emerald-600 scale-[1.02] shadow-emerald-600/30"
                      : "bg-slate-950 hover:bg-slate-800 shadow-slate-900/20"
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-rose-600 py-4 px-6 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-rose-600/25 hover:bg-rose-500 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <Zap className="h-4 w-4" />
                  <span>Instant Checkout</span>
                </button>
              </div>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 font-['Urbanist']">
                  <Truck className="h-4 w-4 text-rose-600" />
                  Express Dispatch &amp; Regional Speed
                </span>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  Same-Day Air Hub
                </span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  maxLength={6}
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-3.5 py-2 text-xs font-semibold outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-rose-600 transition-colors cursor-pointer"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-100">
                  <Clock className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{pincodeStatus}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            3. Frequently Bought Together Bundle Builder
            ======================================================== */}
        {relatedProducts.length >= 2 && (
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-400 block mb-1">
                  Pro Kit Saver Bundle
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-['Urbanist']">
                  Frequently Bought Together
                </h3>
              </div>
              <span className="text-xs font-bold text-white bg-rose-600 px-3 py-1.5 rounded-full self-start sm:self-auto">
                Save 15% on All 3 Items
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2">
                {/* Main Product */}
                <div className="w-24 sm:w-28 flex-shrink-0 text-center">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 mb-2">
                    <img
                      src={images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-200 truncate block">
                    {product.name}
                  </span>
                  <span className="text-xs font-black text-rose-400">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <Plus className="h-5 w-5 text-slate-500 flex-shrink-0" />

                {/* Related 1 */}
                <div className="w-24 sm:w-28 flex-shrink-0 text-center">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 mb-2">
                    <img
                      src={relatedProducts[0].images?.[0] || images[0]}
                      alt={relatedProducts[0].name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-200 truncate block">
                    {relatedProducts[0].name}
                  </span>
                  <span className="text-xs font-black text-rose-400">
                    ₹{relatedProducts[0].price.toLocaleString("en-IN")}
                  </span>
                </div>

                <Plus className="h-5 w-5 text-slate-500 flex-shrink-0" />

                {/* Related 2 */}
                <div className="w-24 sm:w-28 flex-shrink-0 text-center">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 mb-2">
                    <img
                      src={relatedProducts[1].images?.[0] || images[0]}
                      alt={relatedProducts[1].name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-200 truncate block">
                    {relatedProducts[1].name}
                  </span>
                  <span className="text-xs font-black text-rose-400">
                    ₹{relatedProducts[1].price.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Bundle Pricing & Action */}
              <div className="lg:ml-auto w-full lg:w-auto p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5">
                <div>
                  <span className="text-[11px] text-slate-400 block">Total Combined Price:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black font-['Urbanist'] text-white">
                      ₹{Math.round(
                        (product.price + relatedProducts[0].price + relatedProducts[1].price) *
                          0.85
                      ).toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{(product.price + relatedProducts[0].price + relatedProducts[1].price).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addToCart(product, 1, selectedSize);
                    addToCart(relatedProducts[0], 1);
                    addToCart(relatedProducts[1], 1);
                    setBundleSelected(true);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-rose-500 transition-colors shadow-lg shadow-rose-600/20"
                >
                  {bundleSelected ? "Add 3-Item Kit to Bag" : "Bundle Added!"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            4. Detailed Tabs: Specs, Care, Reviews, Shipping
            ======================================================== */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
          {/* Tab Navigation Strip */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "specs"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>Technical Specifications</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("care")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "care"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Care &amp; Conditioning</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "reviews"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Athlete Reviews ({reviewsList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("shipping")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "shipping"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Truck className="h-4 w-4" />
              <span>Shipping &amp; Policies</span>
            </button>
          </div>

          {/* Tab 1: Specs */}
          {activeTab === "specs" && (
            <div className="mt-8 space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-base font-black text-slate-900 font-['Urbanist']">
                  Equipment Description &amp; Build Geometry
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed max-w-3xl">
                  {product.description ||
                    "Manufactured to strict professional guidelines using elite selection materials. Every unit undergoes automated balance frequency testing to guarantee maximum kinetic energy transfer upon ball collision."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex justify-between p-3.5 rounded-2xl bg-slate-50 text-xs">
                  <span className="text-slate-500 font-medium">SKU Identifier</span>
                  <span className="font-bold text-slate-900 font-mono">{product.sku}</span>
                </div>
                <div className="flex justify-between p-3.5 rounded-2xl bg-slate-50 text-xs">
                  <span className="text-slate-500 font-medium">Official Brand</span>
                  <span className="font-bold text-slate-900">{product.brand || "ShopPulse"}</span>
                </div>
                <div className="flex justify-between p-3.5 rounded-2xl bg-slate-50 text-xs">
                  <span className="text-slate-500 font-medium">Product Category</span>
                  <span className="font-bold text-slate-900">{product.category?.name}</span>
                </div>
                <div className="flex justify-between p-3.5 rounded-2xl bg-slate-50 text-xs">
                  <span className="text-slate-500 font-medium">Material Composition</span>
                  <span className="font-bold text-slate-900">Elite Grade English Willow / PulseDry™ Fiber</span>
                </div>
                <div className="flex justify-between p-3.5 rounded-2xl bg-slate-50 text-xs">
                  <span className="text-slate-500 font-medium">Edge Profile / Thickness</span>
                  <span className="font-bold text-slate-900">38mm - 41mm Pro Contour</span>
                </div>
                <div className="flex justify-between p-3.5 rounded-2xl bg-slate-50 text-xs">
                  <span className="text-slate-500 font-medium">Warranty Coverage</span>
                  <span className="font-bold text-emerald-600">1 Year Official Manufacturer Warranty</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Care & Conditioning */}
          {activeTab === "care" && (
            <div className="mt-8 space-y-6 animate-fadeIn">
              <h3 className="text-base font-black text-slate-900 font-['Urbanist']">
                Pro Athlete Conditioning &amp; Lifespan Optimization
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-lg font-black text-rose-600 block mb-1">01.</span>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Machine Knocking</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Always knock edges and toe with a rounded wooden mallet or automated machine before match play.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-lg font-black text-rose-600 block mb-1">02.</span>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Linseed Oiling</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Apply 1-2 teaspoons of raw linseed oil twice per season. Avoid oiling the handle or splice.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-lg font-black text-rose-600 block mb-1">03.</span>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Climate Storage</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Store in a moisture-controlled thermal kit bag away from direct heating radiators or damp kit lockers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === "reviews" && (
            <div className="mt-8 space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-black text-slate-900 font-['Urbanist']">
                    Athlete Feedback &amp; Field Ratings
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-800">
                      {product.rating > 0 ? product.rating.toFixed(1) : "4.8"} out of 5
                    </span>
                    <span className="text-xs text-slate-400">
                      ({reviewsList.length} verified reviews)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-rose-600 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  {showReviewForm ? "Close Review Form" : "Write a Review"}
                </button>
              </div>

              {/* Review Input Modal/Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleAddReview}
                  className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 animate-fadeIn"
                >
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 font-['Urbanist']">
                    Share Your Athlete Experience
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        placeholder="e.g. Virat S."
                        className="w-full rounded-xl bg-white border border-slate-200 px-3 py-2 text-xs outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Rating (Stars)
                      </label>
                      <div className="flex items-center gap-2 pt-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReviewRating(star)}
                            className="cursor-pointer"
                          >
                            <Star
                              className={`h-5 w-5 ${
                                star <= newReviewRating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Review Headline
                    </label>
                    <input
                      type="text"
                      required
                      value={newReviewTitle}
                      onChange={(e) => setNewReviewTitle(e.target.value)}
                      placeholder="e.g. Exceptional balance &amp; punch"
                      className="w-full rounded-xl bg-white border border-slate-200 px-3 py-2 text-xs outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Detailed Comments
                    </label>
                    <textarea
                      rows={3}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="How did this gear perform in match conditions?"
                      className="w-full rounded-xl bg-white border border-slate-200 px-3 py-2 text-xs outline-none focus:border-rose-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-rose-500 transition-colors shadow-sm"
                  >
                    Submit Verified Review
                  </button>
                </form>
              )}

              {/* Review Cards */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">
                          {rev.author}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="h-3 w-3" /> {rev.level}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400" />
                      ))}
                    </div>

                    <h5 className="text-xs font-bold text-slate-800">{rev.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>

                    <div className="pt-2 flex items-center gap-4 text-[11px] text-slate-400">
                      <button
                        type="button"
                        className="flex items-center gap-1 hover:text-slate-700 cursor-pointer"
                      >
                        <ThumbsUp className="h-3 w-3" /> Helpful (12)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Shipping & Policies */}
          {activeTab === "shipping" && (
            <div className="mt-8 space-y-4 text-xs text-slate-600 leading-relaxed animate-fadeIn">
              <h3 className="text-base font-black text-slate-900 font-['Urbanist']">
                Fast Regional Air Dispatch &amp; Return Security
              </h3>
              <p>
                All orders are processed from our temperature-controlled regional sports fulfillment centers. Orders placed before 4:00 PM are dispatched the same calendar day with priority GPS tracking.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-1">Domestic Transit</span>
                  <p className="text-[11px]">Metros: 24 - 48 Hours | Tier 2 Cities: 2 - 3 Business Days</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-1">30-Day Hassle Free Returns</span>
                  <p className="text-[11px]">Unused products with original factory seals qualify for 100% full refund or replacement.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            5. Related & Recommended Products Carousel
            ======================================================== */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-slate-200/80 pt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                  Pro athlete pairings
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 font-['Urbanist']">
                  Similar Items in {product.category?.name}
                </h3>
              </div>
              <Link
                to={`/shop?category=${product.category?.slug}`}
                className="text-xs font-bold text-slate-700 hover:text-rose-600 flex items-center gap-1"
              >
                <span>View All In Category</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative group">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1.2}
                autoplay={{ delay: 4500, disableOnInteraction: false }}
                navigation={{
                  prevEl: ".related-prev-btn",
                  nextEl: ".related-next-btn",
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                breakpoints={{
                  640: { slidesPerView: 2.2, spaceBetween: 20 },
                  768: { slidesPerView: 3, spaceBetween: 24 },
                  1024: { slidesPerView: 4, spaceBetween: 24 },
                }}
                className="pb-12"
              >
                {relatedProducts.map((p) => (
                  <SwiperSlide key={p._id} className="h-auto">
                    <ProductCard product={p} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                type="button"
                className="related-prev-btn absolute -left-4 top-1/2 -translate-y-8 z-20 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xl border border-slate-200 text-slate-800 hover:bg-slate-900 hover:text-white transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                aria-label="Previous Items"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="related-next-btn absolute -right-4 top-1/2 -translate-y-8 z-20 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xl border border-slate-200 text-slate-800 hover:bg-slate-900 hover:text-white transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                aria-label="Next Items"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          6. Fullscreen Lightbox Modal
          ======================================================== */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 animate-fadeIn">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl">
            <img
              src={images[selectedImageIndex] || images[0]}
              alt={product.name}
              className="max-h-[85vh] w-auto object-contain mx-auto"
            />
          </div>
        </div>
      )}

      {/* ========================================================
          7. Interactive Size Guide Modal
          ======================================================== */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900 font-['Urbanist']">
                Official Fit &amp; Size Guide
              </h3>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs text-slate-600">
              <p>
                Our gear is precision tailored to competition specifications. For bats, weights represent pre-knocked specifications (±15g tolerance).
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-900 font-bold">
                      <th className="py-2">Size / Spec</th>
                      <th className="py-2">Player Height</th>
                      <th className="py-2">Weight / Chest</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2 font-bold text-slate-800">S / Light</td>
                      <td className="py-2">5'4" - 5'7"</td>
                      <td className="py-2">36-38" / 1150g</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-800">M / Medium</td>
                      <td className="py-2">5'8" - 5'11"</td>
                      <td className="py-2">39-41" / 1180g</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-800">L / Pro</td>
                      <td className="py-2">6'0" - 6'3"</td>
                      <td className="py-2">42-44" / 1220g</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-800">XL / Heavy</td>
                      <td className="py-2">6'3"+</td>
                      <td className="py-2">45-48" / 1260g</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(false)}
              className="mt-4 w-full rounded-2xl bg-slate-900 py-3 text-xs font-bold text-white uppercase hover:bg-slate-800"
            >
              Close Size Guide
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetails;