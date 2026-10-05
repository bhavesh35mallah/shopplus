import React, { useState } from "react";
import { Camera, Heart, CheckCircle, ExternalLink, X } from "lucide-react";
import { useCart } from "../../context/CartContext";

interface SocialPost {
  id: string;
  handle: string;
  authorName: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  productName: string;
  productPrice: number;
  productImage: string;
  productCategory: string;
}

const posts: SocialPost[] = [
  {
    id: "post-1",
    handle: "@rohit_cricketer",
    authorName: "Rohit Verma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    caption: "Scored 84* with the Pro Willow English bat today. Ping on the mid-blade is completely unreal.",
    likes: 1420,
    productName: "Pro Willow English Cricket Bat",
    productPrice: 6499,
    productImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=200&auto=format&fit=crop&q=80",
    productCategory: "Cricket",
  },
  {
    id: "post-2",
    handle: "@sneha_strides",
    authorName: "Sneha Kulkarni",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    caption: "15k morning run across Marine Drive. CloudFoam cushioning saved my knees on hard asphalt.",
    likes: 2890,
    productName: "CloudFoam Pro Running Shoes",
    productPrice: 2899,
    productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=80",
    productCategory: "Footwear",
  },
  {
    id: "post-3",
    handle: "@karan_streetwear",
    authorName: "Karan Johal",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80",
    caption: "Boxy fit, heavyweight 240 GSM drape. Best essential tee in rotation right now.",
    likes: 980,
    productName: "240 GSM Heavyweight Boxy Tee",
    productPrice: 899,
    productImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&auto=format&fit=crop&q=80",
    productCategory: "Men's Apparel",
  },
  {
    id: "post-4",
    handle: "@ananya_audio",
    authorName: "Ananya Ray",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    caption: "48 hours battery life on one charge. Aura ANC easily handles the Mumbai local commute noise.",
    likes: 1840,
    productName: "Aura Studio ANC Wireless Sound",
    productPrice: 4999,
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80",
    productCategory: "Electronics",
  },
];

export const SocialFeed: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);

  return (
    <section className="bg-slate-950 py-16 text-white border-b border-slate-800">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 px-3.5 py-1 text-xs font-bold text-pink-400 border border-pink-500/30 uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5 text-pink-400" />
              <span>#ShopPulseAthletes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              📸 Community &amp; Athlete Feed
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Tagged by real cricketers, marathon runners, and streetwear creators across India.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-pink-400 hover:text-pink-300"
          >
            <span>Follow @shoppulse_official</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Photo with hover button */}
                <div className="relative aspect-square overflow-hidden bg-slate-950">
                  <img
                    src={post.image}
                    alt={post.handle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <button
                      type="button"
                      onClick={() => setSelectedPost(post)}
                      className="w-full rounded-xl bg-white text-slate-900 py-2 text-xs font-black hover:bg-rose-600 hover:text-white transition-colors cursor-pointer shadow-lg"
                    >
                      Shop This Look
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.avatar}
                        alt={post.authorName}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs font-bold text-white flex items-center gap-1">
                        {post.handle}
                        <CheckCircle className="w-3 h-3 text-blue-400 inline" />
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      {post.likes}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    "{post.caption}"
                  </p>
                </div>
              </div>

              {/* Tagged product strip */}
              <div className="p-4 pt-0">
                <div className="flex items-center gap-2.5 rounded-2xl bg-slate-950 p-2.5 border border-slate-800/80">
                  <img
                    src={post.productImage}
                    alt={post.productName}
                    className="w-10 h-10 rounded-lg object-cover bg-slate-900 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{post.productName}</p>
                    <span className="text-xs font-black text-rose-400">
                      ₹{post.productPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick modal if selected */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700 p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-black uppercase text-pink-400 tracking-wider">
              Athlete Gear Tagged
            </span>
            <h3 className="text-base font-black text-white mt-1">{selectedPost.productName}</h3>
            <p className="text-xs text-slate-400 mt-1">Featured by {selectedPost.handle}</p>

            <div className="mt-4 aspect-square rounded-2xl overflow-hidden bg-slate-950">
              <img
                src={selectedPost.image}
                alt={selectedPost.productName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Price</span>
                <p className="text-xl font-black text-white">
                  ₹{selectedPost.productPrice.toLocaleString("en-IN")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  addToCart({
                    _id: selectedPost.id,
                    name: selectedPost.productName,
                    slug: selectedPost.id,
                    sku: `SOC-${selectedPost.id}`,
                    price: selectedPost.productPrice,
                    category: {
                      _id: "c1",
                      name: selectedPost.productCategory,
                      slug: selectedPost.productCategory.toLowerCase(),
                    },
                    images: [selectedPost.productImage],
                    description: selectedPost.caption,
                    stock: 5,
                    rating: 4.9,
                    reviewsCount: 15,
                    tags: ["Social Look"],
                    eventTags: ["community-drop"],
                    status: "active",
                  });
                  setSelectedPost(null);
                }}
                className="rounded-xl bg-rose-600 hover:bg-rose-500 px-5 py-2.5 text-xs font-bold text-white transition-all shadow-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
