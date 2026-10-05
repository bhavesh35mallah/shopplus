import React, { useState } from "react";
import {
  LayoutTemplate,
  Sparkles,
  Radio,
  Truck,
  RotateCcw,
  Zap,
  ShoppingBag,
  TrendingUp,
  MessageSquare,
  HelpCircle,
  Plus,
  Trash2,
  RefreshCw,
  Save,
} from "lucide-react";
import {
  dynamicStore,
  type HomePageConfig,
  type HeroSlide,
} from "../../utils/dynamicStore";

interface HomePageCmsManagerProps {
  onNotify: (message: string) => void;
}

export const HomePageCmsManager: React.FC<HomePageCmsManagerProps> = ({
  onNotify,
}) => {
  const [config, setConfig] = useState<HomePageConfig>(
    dynamicStore.getHomePageConfig()
  );

  const [activeSection, setActiveSection] = useState<
    | "hero"
    | "flash"
    | "brands"
    | "trust"
    | "collections"
    | "trending"
    | "deal"
    | "testimonials"
    | "faq"
    | "interactive"
  >("hero");

  // New Hero Slide Modal/State
  const [isAddSlideOpen, setIsAddSlideOpen] = useState(false);
  const [newSlide, setNewSlide] = useState<HeroSlide>({
    id: `slide-${Date.now()}`,
    title: "",
    subtitle: "",
    tag: "SPECIAL EVENT",
    tagColor: "bg-rose-500",
    ctaText: "Shop Collection",
    ctaLink: "/shop",
    secondaryCtaText: "Learn More",
    secondaryCtaLink: "/shop",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600&auto=format&fit=crop&q=90",
    stats: "Exclusive Edition",
  });

  // New Brand input
  const [newBrandInput, setNewBrandInput] = useState("");

  // New Testimonial State
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "Verified Athlete",
    comment: "",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  });
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);

  // New FAQ State
  const [newFaqQ, setNewFaqQ] = useState("");
  const [newFaqA, setNewFaqA] = useState("");

  // Save all settings to dynamic store
  const handleSave = () => {
    dynamicStore.updateHomePageConfig(config);
    onNotify("Home Page storefront published! All changes are live.");
  };

  // Reset to factory defaults
  const handleReset = () => {
    if (window.confirm("Reset all Home Page sections to standard defaults?")) {
      const def = dynamicStore.resetHomePageConfig();
      setConfig(def);
      onNotify("Home Page restored to factory defaults.");
    }
  };

  // Slide helpers
  const handleAddSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlide.title || !newSlide.image) {
      alert("Please provide at least a title and image URL for the slide.");
      return;
    }
    const updated = {
      ...config,
      heroSection: {
        ...config.heroSection,
        slides: [...config.heroSection.slides, { ...newSlide, id: `slide-${Date.now()}` }],
      },
    };
    setConfig(updated);
    setIsAddSlideOpen(false);
    setNewSlide({
      id: `slide-${Date.now()}`,
      title: "",
      subtitle: "",
      tag: "SPECIAL EVENT",
      tagColor: "bg-rose-500",
      ctaText: "Shop Collection",
      ctaLink: "/shop",
      secondaryCtaText: "Learn More",
      secondaryCtaLink: "/shop",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600&auto=format&fit=crop&q=90",
      stats: "Exclusive Edition",
    });
    onNotify("New Hero Slide added! Click Publish to apply.");
  };

  const handleDeleteSlide = (id: string) => {
    if (config.heroSection.slides.length <= 1) {
      alert("At least one hero slide is required.");
      return;
    }
    const updated = {
      ...config,
      heroSection: {
        ...config.heroSection,
        slides: config.heroSection.slides.filter((s) => s.id !== id),
      },
    };
    setConfig(updated);
  };

  // Brand helpers
  const handleAddBrand = () => {
    if (newBrandInput.trim() && !config.partnerBrands.brands.includes(newBrandInput.trim())) {
      setConfig({
        ...config,
        partnerBrands: {
          ...config.partnerBrands,
          brands: [...config.partnerBrands.brands, newBrandInput.trim()],
        },
      });
      setNewBrandInput("");
    }
  };

  const handleDeleteBrand = (name: string) => {
    setConfig({
      ...config,
      partnerBrands: {
        ...config.partnerBrands,
        brands: config.partnerBrands.brands.filter((b) => b !== name),
      },
    });
  };

  // Testimonial helpers
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.comment) {
      alert("Please enter customer name and review comment.");
      return;
    }
    setConfig({
      ...config,
      testimonials: {
        ...config.testimonials,
        items: [
          ...config.testimonials.items,
          { ...newTestimonial, id: `rev-${Date.now()}` },
        ],
      },
    });
    setIsAddReviewOpen(false);
    setNewTestimonial({
      name: "",
      role: "Verified Athlete",
      comment: "",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    });
  };

  const handleDeleteReview = (id: string) => {
    setConfig({
      ...config,
      testimonials: {
        ...config.testimonials,
        items: config.testimonials.items.filter((item) => item.id !== id),
      },
    });
  };

  // FAQ helpers
  const handleAddFaq = () => {
    if (newFaqQ.trim() && newFaqA.trim()) {
      setConfig({
        ...config,
        faqSection: {
          ...config.faqSection,
          items: [
            ...config.faqSection.items,
            { q: newFaqQ.trim(), a: newFaqA.trim() },
          ],
        },
      });
      setNewFaqQ("");
      setNewFaqA("");
    }
  };

  const handleDeleteFaq = (index: number) => {
    setConfig({
      ...config,
      faqSection: {
        ...config.faqSection,
        items: config.faqSection.items.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-800/80 p-5 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <LayoutTemplate className="h-5 w-5 text-rose-500" />
            <h2 className="text-base font-bold text-white">
              Home Page Sections Manager &amp; Visual CMS
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Toggle, customize, and reorder all hero slides, flash banners, collections, and testimonials in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white hover:bg-rose-500 shadow-lg shadow-rose-900/40 transition-colors cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Publish Home Page</span>
          </button>
        </div>
      </div>

      {/* Two Column Layout: Navigation Sidebar + Section Config Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Nav */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-800/60 p-4 space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 pb-1 block">
            Home Page Sections
          </span>

          {[
            {
              id: "hero",
              label: "Hero Carousel Slider",
              icon: Sparkles,
              enabled: config.heroSection.enabled,
              badge: `${config.heroSection.slides.length} Slides`,
            },
            {
              id: "flash",
              label: "Matchday Flash Banner",
              icon: Radio,
              enabled: config.flashBanner.enabled,
              badge: `${config.flashBanner.discountPercent}% OFF`,
            },
            {
              id: "brands",
              label: "Official Partner Brands",
              icon: Zap,
              enabled: config.partnerBrands.enabled,
              badge: `${config.partnerBrands.brands.length} Brands`,
            },
            {
              id: "trust",
              label: "Guarantees & Trust Strip",
              icon: Truck,
              enabled: config.trustBadges.enabled,
              badge: "4 Badges",
            },
            {
              id: "collections",
              label: "Curated Collections",
              icon: ShoppingBag,
              enabled: config.featuredCollections.enabled,
              badge: `${config.featuredCollections.collections.length} Tiles`,
            },
            {
              id: "trending",
              label: "Trending Products Carousel",
              icon: TrendingUp,
              enabled: config.trendingSection.enabled,
              badge: `Top ${config.trendingSection.limit}`,
            },
            {
              id: "deal",
              label: "Super Over Flash Deal",
              icon: RotateCcw,
              enabled: config.dealOfTheDay.enabled,
              badge: config.dealOfTheDay.discountBadge,
            },
            {
              id: "testimonials",
              label: "Customer Reviews",
              icon: MessageSquare,
              enabled: config.testimonials.enabled,
              badge: `${config.testimonials.items.length} Reviews`,
            },
            {
              id: "faq",
              label: "VIP Club & FAQs",
              icon: HelpCircle,
              enabled: config.faqSection.enabled && config.newsletterSection.enabled,
              badge: `${config.faqSection.items.length} FAQs`,
            },
            {
              id: "interactive",
              label: "17 Live Interactive Sections",
              icon: Sparkles,
              enabled: true,
              badge: "17 Modules",
            },
          ].map((sec) => {
            const Icon = sec.icon;
            const active = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id as typeof activeSection)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? "bg-rose-600 text-white shadow-md shadow-rose-900/30"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  <span>{sec.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                      active
                        ? "bg-black/30 text-rose-100"
                        : "bg-slate-900 text-slate-400"
                    }`}
                  >
                    {sec.badge}
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      sec.enabled ? "bg-emerald-400" : "bg-slate-600"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Section Config Panel */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-800/60 p-6 space-y-6">
          {/* SECTION 1: HERO SLIDER */}
          {activeSection === "hero" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-rose-500" />
                    <span>Hero Showcase Carousel Slider</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Controls full-width hero swiper carousel displayed at top of Home page
                  </p>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                  <span>Section Active</span>
                  <input
                    type="checkbox"
                    checked={config.heroSection.enabled}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        heroSection: {
                          ...config.heroSection,
                          enabled: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-slate-700 text-rose-600 focus:ring-rose-500"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-300">
                    Active Slides ({config.heroSection.slides.length})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddSlideOpen(true)}
                  className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-500 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Slide</span>
                </button>
              </div>

              {/* Slides Grid */}
              <div className="space-y-3">
                {config.heroSection.slides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-700 bg-slate-950 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-16 w-24 rounded-lg object-cover bg-slate-900 border border-slate-800 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[9px] font-bold text-rose-400">
                            {slide.tag}
                          </span>
                          <span className="text-[10px] text-slate-400">Slide #{idx + 1}</span>
                        </div>
                        <h4 className="font-bold text-white text-xs mt-1 line-clamp-1">
                          {slide.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {slide.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteSlide(slide.id)}
                        className="rounded-lg p-2 text-rose-400 hover:bg-rose-500/20 transition-colors"
                        title="Delete slide"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Slide Modal */}
              {isAddSlideOpen && (
                <div className="rounded-xl border border-rose-500/40 bg-slate-950 p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Add New Hero Slide
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsAddSlideOpen(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      &times;
                    </button>
                  </div>

                  <form onSubmit={handleAddSlide} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Slide Headline Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Masterclass Titanium Sprint Cleats"
                        value={newSlide.title}
                        onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Subtitle / Pitch
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Engineered with carbon fiber plates..."
                        value={newSlide.subtitle}
                        onChange={(e) =>
                          setNewSlide({ ...newSlide, subtitle: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Tag Badge
                        </label>
                        <input
                          type="text"
                          value={newSlide.tag}
                          onChange={(e) => setNewSlide({ ...newSlide, tag: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          CTA Button Text
                        </label>
                        <input
                          type="text"
                          value={newSlide.ctaText}
                          onChange={(e) => setNewSlide({ ...newSlide, ctaText: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Slide High-Res Image URL *
                      </label>
                      <input
                        type="url"
                        required
                        value={newSlide.image}
                        onChange={(e) => setNewSlide({ ...newSlide, image: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddSlideOpen(false)}
                        className="rounded-xl border border-slate-700 px-3 py-1.5 text-slate-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-xl bg-rose-600 px-4 py-1.5 font-bold text-white hover:bg-rose-500"
                      >
                        Add Slide
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* SECTION 2: FLASH BANNER */}
          {activeSection === "flash" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Radio className="h-4 w-4 text-rose-500" />
                    <span>Tournament Flash Drop Sync Bar</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live notification marquee bar pinned below hero section
                  </p>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                  <span>Banner Enabled</span>
                  <input
                    type="checkbox"
                    checked={config.flashBanner.enabled}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        flashBanner: {
                          ...config.flashBanner,
                          enabled: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-slate-700 text-rose-600 focus:ring-rose-500"
                  />
                </label>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Event Badge Title
                  </label>
                  <input
                    type="text"
                    value={config.flashBanner.badge}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        flashBanner: { ...config.flashBanner, badge: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Headline Announcement Text
                  </label>
                  <input
                    type="text"
                    value={config.flashBanner.text}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        flashBanner: { ...config.flashBanner, text: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Coupon Code
                    </label>
                    <input
                      type="text"
                      value={config.flashBanner.code}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          flashBanner: { ...config.flashBanner, code: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white font-mono uppercase focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Discount %
                    </label>
                    <input
                      type="number"
                      value={config.flashBanner.discountPercent}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          flashBanner: {
                            ...config.flashBanner,
                            discountPercent: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Target URL
                    </label>
                    <input
                      type="text"
                      value={config.flashBanner.link}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          flashBanner: { ...config.flashBanner, link: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: BRANDS */}
          {activeSection === "brands" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Partner Brand Marquee</h3>
                  <p className="text-xs text-slate-400">
                    Horizontal scrolling brand partner trust strip
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                  <span>Active</span>
                  <input
                    type="checkbox"
                    checked={config.partnerBrands.enabled}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        partnerBrands: {
                          ...config.partnerBrands,
                          enabled: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-slate-700 text-rose-600 focus:ring-rose-500"
                  />
                </label>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New brand name (e.g. SpartanX)"
                  value={newBrandInput}
                  onChange={(e) => setNewBrandInput(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddBrand}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500"
                >
                  Add Brand
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {config.partnerBrands.brands.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-3 py-1.5 text-xs font-bold text-white border border-slate-800"
                  >
                    <span>{b}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteBrand(b)}
                      className="text-slate-400 hover:text-rose-400"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 4: TRUST BADGES */}
          {activeSection === "trust" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Trust &amp; Guarantee Badges</h3>
                  <p className="text-xs text-slate-400">
                    4 customer reassurance highlights displayed across the store
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                  <span>Active</span>
                  <input
                    type="checkbox"
                    checked={config.trustBadges.enabled}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        trustBadges: {
                          ...config.trustBadges,
                          enabled: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-slate-700 text-rose-600 focus:ring-rose-500"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {config.trustBadges.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-700 bg-slate-950 p-4 space-y-2 text-xs"
                  >
                    <label className="block text-slate-400 font-semibold">
                      Badge #{idx + 1} Title
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const items = [...config.trustBadges.items];
                        items[idx] = { ...items[idx], title: e.target.value };
                        setConfig({
                          ...config,
                          trustBadges: { ...config.trustBadges, items },
                        });
                      }}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white"
                    />

                    <label className="block text-slate-400 font-semibold pt-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={item.desc}
                      onChange={(e) => {
                        const items = [...config.trustBadges.items];
                        items[idx] = { ...items[idx], desc: e.target.value };
                        setConfig({
                          ...config,
                          trustBadges: { ...config.trustBadges, items },
                        });
                      }}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 5: FEATURED COLLECTIONS */}
          {activeSection === "collections" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Curated Collections Tiles</h3>
                  <p className="text-xs text-slate-400">
                    Bento department tiles linking to primary product categories
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                  <span>Active</span>
                  <input
                    type="checkbox"
                    checked={config.featuredCollections.enabled}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        featuredCollections: {
                          ...config.featuredCollections,
                          enabled: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-slate-700 text-rose-600 focus:ring-rose-500"
                  />
                </label>
              </div>

              <div className="space-y-3">
                {config.featuredCollections.collections.map((col, idx) => (
                  <div
                    key={col.id}
                    className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 p-3"
                  >
                    <img
                      src={col.image}
                      alt={col.title}
                      className="h-14 w-20 rounded-lg object-cover bg-slate-900 flex-shrink-0"
                    />
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Title</span>
                        <input
                          type="text"
                          value={col.title}
                          onChange={(e) => {
                            const cols = [...config.featuredCollections.collections];
                            cols[idx] = { ...cols[idx], title: e.target.value };
                            setConfig({
                              ...config,
                              featuredCollections: {
                                ...config.featuredCollections,
                                collections: cols,
                              },
                            });
                          }}
                          className="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-white text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Subtitle</span>
                        <input
                          type="text"
                          value={col.subtitle}
                          onChange={(e) => {
                            const cols = [...config.featuredCollections.collections];
                            cols[idx] = { ...cols[idx], subtitle: e.target.value };
                            setConfig({
                              ...config,
                              featuredCollections: {
                                ...config.featuredCollections,
                                collections: cols,
                              },
                            });
                          }}
                          className="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-white text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Badge Tag</span>
                        <input
                          type="text"
                          value={col.tag}
                          onChange={(e) => {
                            const cols = [...config.featuredCollections.collections];
                            cols[idx] = { ...cols[idx], tag: e.target.value };
                            setConfig({
                              ...config,
                              featuredCollections: {
                                ...config.featuredCollections,
                                collections: cols,
                              },
                            });
                          }}
                          className="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 6: TRENDING */}
          {activeSection === "trending" && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Trending Products Carousel</h3>
                  <p className="text-slate-400 mt-0.5">
                    Interactive Swiper carousel powered by real rating and sales data
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-300">
                  <span>Active</span>
                  <input
                    type="checkbox"
                    checked={config.trendingSection.enabled}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        trendingSection: {
                          ...config.trendingSection,
                          enabled: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-slate-700 text-rose-600 focus:ring-rose-500"
                  />
                </label>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Section Headline Title
                </label>
                <input
                  type="text"
                  value={config.trendingSection.title}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      trendingSection: {
                        ...config.trendingSection,
                        title: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Section Subtitle
                </label>
                <input
                  type="text"
                  value={config.trendingSection.subtitle}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      trendingSection: {
                        ...config.trendingSection,
                        subtitle: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    value={config.trendingSection.badge}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        trendingSection: {
                          ...config.trendingSection,
                          badge: e.target.value,
                        },
                      })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Max Items in Slider
                  </label>
                  <input
                    type="number"
                    value={config.trendingSection.limit}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        trendingSection: {
                          ...config.trendingSection,
                          limit: parseInt(e.target.value) || 8,
                        },
                      })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 7: FLASH DEAL */}
          {activeSection === "deal" && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Super Over Flash Deal</h3>
                  <p className="text-slate-400 mt-0.5">
                    Exclusive single spotlight tournament item deal
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-300">
                  <span>Active</span>
                  <input
                    type="checkbox"
                    checked={config.dealOfTheDay.enabled}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        dealOfTheDay: {
                          ...config.dealOfTheDay,
                          enabled: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-slate-700 text-rose-600 focus:ring-rose-500"
                  />
                </label>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Product Deal Title
                </label>
                <input
                  type="text"
                  value={config.dealOfTheDay.productTitle}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      dealOfTheDay: {
                        ...config.dealOfTheDay,
                        productTitle: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Special Deal Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={config.dealOfTheDay.price}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        dealOfTheDay: {
                          ...config.dealOfTheDay,
                          price: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={config.dealOfTheDay.originalPrice}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        dealOfTheDay: {
                          ...config.dealOfTheDay,
                          originalPrice: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Discount Badge
                  </label>
                  <input
                    type="text"
                    value={config.dealOfTheDay.discountBadge}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        dealOfTheDay: {
                          ...config.dealOfTheDay,
                          discountBadge: e.target.value,
                        },
                      })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Product Image URL
                </label>
                <input
                  type="url"
                  value={config.dealOfTheDay.image}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      dealOfTheDay: {
                        ...config.dealOfTheDay,
                        image: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                />
              </div>
            </div>
          )}

          {/* SECTION 8: TESTIMONIALS */}
          {activeSection === "testimonials" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Customer Reviews &amp; Testimonials</h3>
                  <p className="text-xs text-slate-400">
                    Social proof and athlete recommendations
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                  <span>Active</span>
                  <input
                    type="checkbox"
                    checked={config.testimonials.enabled}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        testimonials: {
                          ...config.testimonials,
                          enabled: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-slate-700 text-rose-600 focus:ring-rose-500"
                  />
                </label>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-300">
                  Reviews ({config.testimonials.items.length})
                </span>
                <button
                  type="button"
                  onClick={() => setIsAddReviewOpen(true)}
                  className="rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-500"
                >
                  + Add Review
                </button>
              </div>

              <div className="space-y-3">
                {config.testimonials.items.map((rev) => (
                  <div
                    key={rev.id}
                    className="flex items-start justify-between gap-3 rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-xs"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white">{rev.name}</h4>
                          <span className="text-[10px] text-slate-400">({rev.role})</span>
                        </div>
                        <p className="text-slate-300 text-xs mt-1">"{rev.comment}"</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteReview(rev.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {isAddReviewOpen && (
                <form
                  onSubmit={handleAddReview}
                  className="rounded-xl border border-rose-500/30 bg-slate-950 p-4 space-y-3 text-xs"
                >
                  <h4 className="font-bold text-white uppercase tracking-wider">New Review</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Customer Name"
                      value={newTestimonial.name}
                      onChange={(e) =>
                        setNewTestimonial({ ...newTestimonial, name: e.target.value })
                      }
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Role (e.g. Club Captain)"
                      value={newTestimonial.role}
                      onChange={(e) =>
                        setNewTestimonial({ ...newTestimonial, role: e.target.value })
                      }
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-white"
                    />
                  </div>
                  <textarea
                    rows={2}
                    required
                    placeholder="Review comment..."
                    value={newTestimonial.comment}
                    onChange={(e) =>
                      setNewTestimonial({ ...newTestimonial, comment: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-white"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddReviewOpen(false)}
                      className="rounded px-3 py-1 text-slate-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded bg-rose-600 px-3 py-1 font-bold text-white hover:bg-rose-500"
                    >
                      Save Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* SECTION 9: FAQS */}
          {activeSection === "faq" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Frequently Asked Questions</h3>
                  <p className="text-xs text-slate-400">
                    Interactive accordion Q&amp;A on shipping, returns, and warranties
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                  <span>Active</span>
                  <input
                    type="checkbox"
                    checked={config.faqSection.enabled}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        faqSection: { ...config.faqSection, enabled: e.target.checked },
                      })
                    }
                    className="h-4 w-4 rounded border-slate-700 text-rose-600 focus:ring-rose-500"
                  />
                </label>
              </div>

              {/* Add FAQ form */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-slate-300 uppercase tracking-wider block">
                  Add New FAQ Item
                </span>
                <input
                  type="text"
                  placeholder="Question (e.g. Can I track my order live?)"
                  value={newFaqQ}
                  onChange={(e) => setNewFaqQ(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-white"
                />
                <textarea
                  rows={2}
                  placeholder="Answer..."
                  value={newFaqA}
                  onChange={(e) => setNewFaqA(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-white"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="rounded-xl bg-rose-600 px-4 py-1.5 font-bold text-white hover:bg-rose-500"
                  >
                    + Add FAQ
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {config.faqSection.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white">Q: {item.q}</h4>
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(idx)}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-slate-400">A: {item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 10: 17 LIVE INTERACTIVE SECTIONS MANAGER */}
          {activeSection === "interactive" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-rose-500" />
                    <span>17 Live Interactive Storefront Sections</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Toggle visibility for all high-engagement gamified and intelligent storefront modules.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const allOn = {
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
                      };
                      setConfig({ ...config, advancedSections: allOn });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-600/30 transition-colors"
                  >
                    Enable All 17
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const allOff = {
                        livePulse: false,
                        almostSoldOut: false,
                        compareAndDecide: false,
                        premiumCollection: false,
                        mysteryDeals: false,
                        spinAndWin: false,
                        rewardsPoints: false,
                        socialFeed: false,
                        completeTheLook: false,
                        shopByNeed: false,
                        contextAware: false,
                        seasonalCalendar: false,
                        weeklyAwards: false,
                        productBattle: false,
                        buyMoreSaveMore: false,
                        recentlyViewed: false,
                        upcomingEventCountdown: false,
                      };
                      setConfig({ ...config, advancedSections: allOff });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/30 text-xs font-bold hover:bg-rose-600/30 transition-colors"
                  >
                    Disable All
                  </button>
                </div>
              </div>

              {/* 17 Section Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    key: "livePulse" as const,
                    title: "🔥 Live Shopping Pulse",
                    desc: "Real-time ticker & floating toast for verified purchases across India.",
                  },
                  {
                    key: "almostSoldOut" as const,
                    title: "🚨 Almost Sold Out",
                    desc: "Urgency section with warehouse depletion bars & countdown timer.",
                  },
                  {
                    key: "compareAndDecide" as const,
                    title: "🤖 Compare & Decide (AI Specimen)",
                    desc: "Side-by-side diagnostic table with sweet spot profiles and AI verdict.",
                  },
                  {
                    key: "premiumCollection" as const,
                    title: "✨ Premium Collection Vault",
                    desc: "Exclusive Reserve Vault showcasing luxury tournament specimens.",
                  },
                  {
                    key: "mysteryDeals" as const,
                    title: "🎁 Mystery Deals",
                    desc: "Interactive gamified crates revealing promo codes up to ₹1,500 off.",
                  },
                  {
                    key: "spinAndWin" as const,
                    title: "🎡 Spin & Win Prize Wheel",
                    desc: "Interactive canvas prize wheel with realistic angular physics.",
                  },
                  {
                    key: "rewardsPoints" as const,
                    title: "🏆 Rewards / Points Ladder",
                    desc: "Tier progression ladder and interactive spend-to-points calculator.",
                  },
                  {
                    key: "socialFeed" as const,
                    title: "📸 Instagram / Social Feed",
                    desc: "Shoppable UGC athlete gallery with likes and quick buy modal.",
                  },
                  {
                    key: "completeTheLook" as const,
                    title: "🧩 Complete the Look",
                    desc: "Curated 3-item gear synergy packages with bundled savings.",
                  },
                  {
                    key: "shopByNeed" as const,
                    title: "🎯 Shop by Need",
                    desc: "Goal-based sports gear filter (Tournament, Marathon, Turf, Rehab).",
                  },
                  {
                    key: "contextAware" as const,
                    title: "🌦️ Context-Aware Products",
                    desc: "Environmental atmospheric recommendations based on time and heat.",
                  },
                  {
                    key: "seasonalCalendar" as const,
                    title: "📅 Seasonal Drop Calendar",
                    desc: "Championship release roadmap (IPL 2026, Monsoon, T20 World Cup).",
                  },
                  {
                    key: "weeklyAwards" as const,
                    title: "🏅 Weekly ShopPulse Awards",
                    desc: "Independent laboratory and community judged medals.",
                  },
                  {
                    key: "productBattle" as const,
                    title: "⚔️ Product Battle Arena",
                    desc: "1v1 community voting showdown with live animated percentage bar.",
                  },
                  {
                    key: "buyMoreSaveMore" as const,
                    title: "💰 Buy More, Save More",
                    desc: "Volume discount ladder (Buy 2 10%, Buy 3 15%, Buy 4+ 20%).",
                  },
                  {
                    key: "recentlyViewed" as const,
                    title: "👁️ Recently Viewed",
                    desc: "Local storage backed browsing history with quick 1-click cart adds.",
                  },
                  {
                    key: "upcomingEventCountdown" as const,
                    title: "⏳ Upcoming Event Countdown",
                    desc: "Midnight flash drop countdown clock and VIP fast pass registration.",
                  },
                ].map((item) => {
                  const isChecked = config.advancedSections?.[item.key] !== false;
                  return (
                    <div
                      key={item.key}
                      className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                        isChecked
                          ? "bg-slate-900 border-slate-700 shadow-md"
                          : "bg-slate-900/40 border-slate-800/80 opacity-60"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                          <span>{item.title}</span>
                          {isChecked && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">{item.desc}</p>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            setConfig({
                              ...config,
                              advancedSections: {
                                ...config.advancedSections,
                                [item.key]: e.target.checked,
                              },
                            });
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600"></div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
