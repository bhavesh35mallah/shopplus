import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Home,
  ShoppingBag,
  Truck,
  HelpCircle,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

const NotFound: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Big 404 Visual */}
          <div className="relative inline-block">
            <span className="text-8xl sm:text-9xl font-black tracking-tighter text-slate-900/10 select-none block">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="px-4 py-1.5 rounded-full bg-rose-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-rose-600/30">
                OUT OF BOUNDS
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Lost Ball! This Page Doesn't Exist.
            </h1>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Looks like that shot went clean over the pavilion or the URL you entered has retired from the active tournament roster.
            </p>
          </div>

          {/* Quick Search */}
          <div className="max-w-md mx-auto bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search cricket bats, hoodies, spikes..."
                  className="w-full pl-10 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer flex-shrink-0"
              >
                Search
              </button>
            </form>
          </div>

          {/* Quick Jump Directory */}
          <div className="pt-6 border-t border-slate-200 max-w-lg mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-4">
              Helpful Destinations:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <Link
                to="/"
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 font-bold text-slate-900 transition-all flex flex-col items-center gap-1.5 shadow-2xs"
              >
                <Home className="h-4 w-4 text-rose-600" />
                <span>Home Page</span>
              </Link>
              <Link
                to="/shop"
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 font-bold text-slate-900 transition-all flex flex-col items-center gap-1.5 shadow-2xs"
              >
                <ShoppingBag className="h-4 w-4 text-slate-900" />
                <span>Shop All</span>
              </Link>
              <Link
                to="/track-order"
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 font-bold text-slate-900 transition-all flex flex-col items-center gap-1.5 shadow-2xs"
              >
                <Truck className="h-4 w-4 text-blue-600" />
                <span>Track Order</span>
              </Link>
              <Link
                to="/contact"
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 font-bold text-slate-900 transition-all flex flex-col items-center gap-1.5 shadow-2xs"
              >
                <HelpCircle className="h-4 w-4 text-emerald-600" />
                <span>24/7 Support</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
