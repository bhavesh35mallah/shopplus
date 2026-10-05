import React, { useState } from "react";
import {
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  Palette,
  FileText,
  DollarSign,
  Layers,
  Sparkles,
  Check,
  RefreshCw,
} from "lucide-react";
import { dynamicStore, type StoredProduct, type ProductColorSwatch } from "../../utils/dynamicStore";

interface ProductCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (productName: string) => void;
  categories: string[];
}

const PRESET_SAMPLE_IMAGES = [
  {
    label: "English Willow Bat",
    url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
  },
  {
    label: "Bowling Spikes",
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
  },
  {
    label: "Supporter Jersey",
    url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80",
  },
  {
    label: "ANC Headphones",
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
  },
  {
    label: "Chronograph Watch",
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
  },
];

export const ProductCreateModal: React.FC<ProductCreateModalProps> = ({
  isOpen,
  onClose,
  onCreated,
  categories,
}) => {
  const [activeTab, setActiveTab] = useState<
    "general" | "media" | "swatches" | "pricing" | "specs"
  >("general");

  // Form Fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState("PulseSport");
  const [categoryName, setCategoryName] = useState(categories[0] || "Cricket");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [badge, setBadge] = useState("HOT DROP");
  const [isHotDrop, setIsHotDrop] = useState(true);

  // Pricing & Stock
  const [price, setPrice] = useState("");
  const [compareAtPrice, setCompareAtPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [stock, setStock] = useState("30");
  const [lowStockThreshold, setLowStockThreshold] = useState("5");
  const [barcode, setBarcode] = useState("");

  // Descriptions
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  // Images Section
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
  ]);
  const [newImageUrl, setNewImageUrl] = useState("");

  // Color Swatches Section
  const [swatches, setSwatches] = useState<ProductColorSwatch[]>([
    { name: "Raw English Willow", colorHex: "#d4a373" },
    { name: "Tournament Onyx", colorHex: "#0f172a" },
  ]);
  const [newSwatchName, setNewSwatchName] = useState("");
  const [newSwatchHex, setNewSwatchHex] = useState("#f43f5e");
  const [newSwatchImg, setNewSwatchImg] = useState("");

  // Sizes Section
  const [availableSizes, setAvailableSizes] = useState<string[]>([
    "Standard",
    "Short Handle",
    "Long Blade",
  ]);
  const [newSizeInput, setNewSizeInput] = useState("");

  // Bullet Highlights
  const [highlights, setHighlights] = useState<string[]>([
    "Hand-selected Grade 1 English Willow",
    "Pre-knocked with 10,000 automated machine knocks",
    "Ultra-responsive featherweight pickup profile",
  ]);
  const [newHighlight, setNewHighlight] = useState("");

  // Technical Specifications
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([
    { key: "Material", value: "Grade 1 English Willow" },
    { key: "Weight", value: "2 lbs 8 oz (1150g)" },
    { key: "Edge Profile", value: "38mm - 40mm Oversized" },
    { key: "Warranty", value: "2 Years Manufacturer Coverage" },
  ]);
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecVal, setNewSpecVal] = useState("");

  if (!isOpen) return null;

  // Auto-generate Slug & SKU when Name changes
  const handleNameChange = (val: string) => {
    setName(val);
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(autoSlug);
    if (!sku) {
      const pfx = val.substring(0, 3).toUpperCase() || "PLZ";
      setSku(`${pfx}-${Math.floor(1000 + Math.random() * 9000)}`);
    }
    if (!shortDescription) {
      setShortDescription(`Official tournament edition ${val} crafted for peak league performance.`);
    }
  };

  const handleRegenerateSku = () => {
    const pfx = name.substring(0, 3).toUpperCase() || "PULSE";
    setSku(`${pfx}-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  // Image helpers
  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    if (images.length === 1) {
      alert("At least one product image is required.");
      return;
    }
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSetPrimaryImage = (index: number) => {
    const primary = images[index];
    const rest = images.filter((_, i) => i !== index);
    setImages([primary, ...rest]);
  };

  // Swatch helpers
  const handleAddSwatch = () => {
    if (!newSwatchName.trim()) {
      alert("Please specify a swatch color name");
      return;
    }
    setSwatches([
      ...swatches,
      {
        name: newSwatchName.trim(),
        colorHex: newSwatchHex,
        imageUrl: newSwatchImg.trim() || undefined,
      },
    ]);
    setNewSwatchName("");
    setNewSwatchImg("");
  };

  const handleRemoveSwatch = (index: number) => {
    setSwatches(swatches.filter((_, i) => i !== index));
  };

  // Size helpers
  const handleAddSize = () => {
    if (newSizeInput.trim() && !availableSizes.includes(newSizeInput.trim())) {
      setAvailableSizes([...availableSizes, newSizeInput.trim()]);
      setNewSizeInput("");
    }
  };

  const handleRemoveSize = (size: string) => {
    setAvailableSizes(availableSizes.filter((s) => s !== size));
  };

  // Highlight helpers
  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()]);
      setNewHighlight("");
    }
  };

  const handleRemoveHighlight = (idx: number) => {
    setHighlights(highlights.filter((_, i) => i !== idx));
  };

  // Specs helpers
  const handleAddSpec = () => {
    if (newSpecKey.trim() && newSpecVal.trim()) {
      setSpecs([...specs, { key: newSpecKey.trim(), value: newSpecVal.trim() }]);
      setNewSpecKey("");
      setNewSpecVal("");
    }
  };

  const handleRemoveSpec = (idx: number) => {
    setSpecs(specs.filter((_, i) => i !== idx));
  };

  // Profit Margin calculation
  const numericPrice = parseFloat(price) || 0;
  const numericCost = parseFloat(costPrice) || 0;
  const profitMargin =
    numericPrice > 0
      ? (((numericPrice - numericCost) / numericPrice) * 100).toFixed(1)
      : "0";

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a product title.");
      setActiveTab("general");
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      alert("Please enter a valid price.");
      setActiveTab("pricing");
      return;
    }

    const categorySlug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const newProduct: StoredProduct = {
      _id: `prod-${Date.now()}`,
      id: `prod-${Date.now()}`,
      name: name.trim(),
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      sku: sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      brand: brand.trim(),
      category: {
        _id: `cat-${categorySlug}`,
        name: categoryName,
        slug: categorySlug,
      },
      price: numericPrice,
      compareAtPrice: parseFloat(compareAtPrice) || undefined,
      costPrice: numericCost || undefined,
      stock: parseInt(stock) || 0,
      lowStockThreshold: parseInt(lowStockThreshold) || 5,
      barcode: barcode.trim() || undefined,
      status,
      badge: badge.trim(),
      isHotDrop,
      shortDescription: shortDescription.trim() || `${name} tournament grade gear.`,
      description:
        description.trim() ||
        `${name} is engineered for professional athletes, offering tournament performance, superior durability, and precision design.`,
      images: images.length > 0 ? images : [PRESET_SAMPLE_IMAGES[0].url],
      swatches,
      sizes: availableSizes,
      highlights,
      specifications: specs,
      rating: 5.0,
      reviewsCount: 1,
      sales: 0,
      tags: [categorySlug, brand.toLowerCase(), "New Release"],
      eventTags: isHotDrop ? ["Tournament Drop", "Official Pro Gear"] : [],
    };

    dynamicStore.addProduct(newProduct);
    onCreated(newProduct.name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/70 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600/20 text-rose-500 border border-rose-500/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Create New Catalog Product</h2>
              <p className="text-xs text-slate-400">
                Configure images, swatches, variations, pricing, and technical specs
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 overflow-x-auto scrollbar-none">
          {[
            { id: "general", label: "General Info", icon: FileText },
            { id: "media", label: `Media (${images.length})`, icon: ImageIcon },
            { id: "swatches", label: `Color Swatches (${swatches.length})`, icon: Palette },
            { id: "pricing", label: "Pricing & Stock", icon: DollarSign },
            { id: "specs", label: "Specs & Highlights", icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? "border-rose-500 text-rose-400 bg-rose-500/10 rounded-t-lg"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 max-h-[65vh] overflow-y-auto space-y-5 text-xs text-slate-200">
            {/* TAB 1: GENERAL INFO */}
            {activeTab === "general" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Masterclass Grade 1 Willow Cricket Bat"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      placeholder="masterclass-grade-1-willow"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-300">
                        SKU (Stock Keeping Unit)
                      </label>
                      <button
                        type="button"
                        onClick={handleRegenerateSku}
                        className="text-[11px] font-bold text-rose-400 hover:underline flex items-center gap-1"
                      >
                        <RefreshCw className="h-3 w-3" />
                        <span>Regenerate</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="BAT-AUR-G1"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white font-mono placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Brand / Manufacturer
                    </label>
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Category *
                    </label>
                    <select
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-white focus:border-rose-500 focus:outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                      <option value="Cricket">Cricket</option>
                      <option value="Footwear &amp; Sneakers">Footwear &amp; Sneakers</option>
                      <option value="Men's Apparel">Men's Apparel</option>
                      <option value="Women's Apparel">Women's Apparel</option>
                      <option value="Electronics &amp; Audio">Electronics &amp; Audio</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Catalog Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-white focus:border-rose-500 focus:outline-none"
                    >
                      <option value="active">Active &amp; Published</option>
                      <option value="inactive">Draft / Hidden</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Visual Badge Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. HOT DROP, SALE, 2026 PRO"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300 font-semibold">
                      <input
                        type="checkbox"
                        checked={isHotDrop}
                        onChange={(e) => setIsHotDrop(e.target.checked)}
                        className="rounded border-slate-700 text-rose-600 focus:ring-rose-500 h-4 w-4"
                      />
                      <span>Highlight as Official Tournament Event Drop</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MEDIA & IMAGES */}
            {activeTab === "media" && (
              <div className="space-y-4">
                <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Add Image via URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>

                  {/* Sample Presets */}
                  <div className="mt-3 flex items-center gap-2 flex-wrap text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">Quick presets:</span>
                    {PRESET_SAMPLE_IMAGES.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setImages([...images, preset.url])}
                        className="rounded-lg bg-slate-800 px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                      >
                        + {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gallery Grid */}
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Gallery Images ({images.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {images.map((img, idx) => (
                      <div
                        key={idx}
                        className="group relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 aspect-square"
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx}`}
                          className="h-full w-full object-cover"
                        />
                        {idx === 0 && (
                          <span className="absolute top-2 left-2 rounded bg-rose-600 px-1.5 py-0.5 text-[9px] font-black uppercase text-white shadow">
                            Primary Cover
                          </span>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryImage(idx)}
                              className="rounded bg-white/90 px-2 py-1 text-[10px] font-bold text-slate-950 hover:bg-white"
                            >
                              Set Primary
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="rounded bg-rose-600/90 px-2 py-1 text-[10px] font-bold text-white hover:bg-rose-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: COLOR SWATCHES */}
            {activeTab === "swatches" && (
              <div className="space-y-4">
                <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Add Color Swatch Option
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Color Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Midnight Onyx"
                        value={newSwatchName}
                        onChange={(e) => setNewSwatchName(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Hex Color Picker
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={newSwatchHex}
                          onChange={(e) => setNewSwatchHex(e.target.value)}
                          className="h-8 w-10 rounded border border-slate-700 bg-slate-900 cursor-pointer p-0.5"
                        />
                        <input
                          type="text"
                          value={newSwatchHex}
                          onChange={(e) => setNewSwatchHex(e.target.value)}
                          className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-mono text-white focus:border-rose-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Optional Swatch Pattern URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={newSwatchImg}
                        onChange={(e) => setNewSwatchImg(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleAddSwatch}
                      className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Color Swatch</span>
                    </button>
                  </div>
                </div>

                {/* Configured Swatches */}
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Configured Color Swatches ({swatches.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {swatches.map((sw, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl bg-slate-950 p-3 border border-slate-800"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="h-7 w-7 rounded-full border-2 border-white/20 shadow-md flex-shrink-0"
                            style={{ backgroundColor: sw.colorHex }}
                          />
                          <div>
                            <p className="font-bold text-white">{sw.name}</p>
                            <p className="font-mono text-[10px] text-slate-400">{sw.colorHex}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveSwatch(idx)}
                          className="rounded-lg p-1.5 text-rose-400 hover:bg-rose-500/20"
                          title="Remove swatch"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PRICING & INVENTORY */}
            {activeTab === "pricing" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Selling Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="349.99"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Compare At Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="429.99"
                      value={compareAtPrice}
                      onChange={(e) => setCompareAtPrice(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Cost Per Item ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="180.00"
                      value={costPrice}
                      onChange={(e) => setCostPrice(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Profit Margin readout */}
                <div className="rounded-xl bg-slate-950/80 p-4 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-400">Estimated Gross Margin:</span>
                    <p className="text-lg font-black text-emerald-400">{profitMargin}%</p>
                  </div>
                  <div className="text-right text-[11px] text-slate-400">
                    Gross Profit: ${(numericPrice - numericCost).toFixed(2)} per unit
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Total Stock Units
                    </label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Low Stock Alert Threshold
                    </label>
                    <input
                      type="number"
                      value={lowStockThreshold}
                      onChange={(e) => setLowStockThreshold(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Barcode (ISBN / UPC)
                    </label>
                    <input
                      type="text"
                      placeholder="890123456789"
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs font-mono text-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: DESCRIPTIONS & SPECS */}
            {activeTab === "specs" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Short Description (Quick View &amp; Search Snippet)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief 1-2 sentence overview shown in cards and quickview..."
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Product Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Full detailed paragraph explaining craft, construction, materials, and athlete benefits..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                {/* Available Sizes */}
                <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Available Sizing Options
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-slate-200"
                      >
                        <span>{s}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSize(s)}
                          className="text-slate-400 hover:text-rose-400"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="e.g. Harrow, US 9, Large"
                      value={newSizeInput}
                      onChange={(e) => setNewSizeInput(e.target.value)}
                      className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddSize}
                      className="rounded-xl bg-slate-800 px-3 py-1.5 font-bold text-white hover:bg-slate-700"
                    >
                      + Add Size
                    </button>
                  </div>
                </div>

                {/* Bullet Highlights */}
                <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Key Highlights &amp; Features
                  </h4>
                  <ul className="space-y-1.5">
                    {highlights.map((h, i) => (
                      <li key={i} className="flex items-center justify-between text-xs text-slate-300">
                        <span className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{h}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveHighlight(i)}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Add highlight point..."
                      value={newHighlight}
                      onChange={(e) => setNewHighlight(e.target.value)}
                      className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddHighlight}
                      className="rounded-xl bg-slate-800 px-3 py-1.5 font-bold text-white hover:bg-slate-700"
                    >
                      + Add
                    </button>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Technical Specifications
                  </h4>
                  <div className="space-y-1.5">
                    {specs.map((sp, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg bg-slate-900 px-3 py-1.5 text-xs"
                      >
                        <span className="font-semibold text-slate-400">{sp.key}:</span>
                        <div className="flex items-center gap-3">
                          <span className="text-white font-medium">{sp.value}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSpec(i)}
                            className="text-slate-500 hover:text-rose-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Property (e.g. Weight)"
                      value={newSpecKey}
                      onChange={(e) => setNewSpecKey(e.target.value)}
                      className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Value (e.g. 1150g)"
                        value={newSpecVal}
                        onChange={(e) => setNewSpecVal(e.target.value)}
                        className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddSpec}
                        className="rounded-xl bg-slate-800 px-3 py-1.5 font-bold text-white hover:bg-slate-700"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/70 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">
                Step: <strong className="text-white capitalize">{activeTab}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-rose-600 px-6 py-2 text-xs font-bold text-white hover:bg-rose-500 shadow-lg shadow-rose-900/40 transition-colors"
              >
                Publish Product to Store
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
