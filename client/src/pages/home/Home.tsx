import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/product/ProductCard";
import { useProducts } from "../../hooks/useProducts";

const featuredCategories = [
  {
    name: "Cricket & Sports",
    slug: "cricket",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    desc: "Bats, balls, protective gear & jerseys"
  },
  {
    name: "Electronics & Audio",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    desc: "ANC headphones, earbuds & wireless chargers"
  },
  {
    name: "Men's Apparel",
    slug: "mens-fashion",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80",
    desc: "Oversized tees, denim & tailored jackets"
  },
  {
    name: "Sneakers & Footwear",
    slug: "footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    desc: "Running shoes, retro skate & Chelsea boots"
  }
];

const Home: React.FC = () => {
  const { products: trendingProducts, loading } = useProducts({ limit: 8, sort: "rating" });

  return (
    <Layout>
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-950 -z-10" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Event-Synced Shopping 2026</span>
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl sm:leading-none">
              Shop in rhythm with every <span className="text-indigo-400">big moment.</span>
            </h1>

            <p className="mt-6 text-base text-slate-300 sm:text-lg">
              Explore 100+ curated products synced to live sporting events, seasonal festivals, and trending drops with express delivery across India.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:scale-105 active:scale-95"
              >
                <span>Explore Shop Catalog</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/shop?category=cricket"
                className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/80 px-6 py-4 text-sm font-semibold text-slate-200 transition-all hover:bg-slate-800"
              >
                <span>Cricket Fan Gear</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Categories
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Shop by Department
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 aspect-[4/5] shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="bg-slate-100/60 py-16 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600">
                <TrendingUp className="h-4 w-4" />
                <span>Trending Right Now</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Highest Rated &amp; Bestsellers
              </h2>
            </div>
            <Link
              to="/shop?sort=rating"
              className="text-xs font-semibold text-slate-900 hover:underline flex items-center gap-1"
            >
              <span>See All (100+)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {!loading && trendingProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500">Loading trending collection...</div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Home;