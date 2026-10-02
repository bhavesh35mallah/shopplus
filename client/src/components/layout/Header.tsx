import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  User as UserIcon,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getCategories, type Category } from "../../api/categoryApi";

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories in header:", err);
      }
    };
    fetchCats();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setCatDropdownOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/shop");
    }
  };

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Notification Announcement Bar */}
      <div className="bg-slate-900 px-4 py-2 text-center text-xs font-medium text-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-slate-400">
            <span>🇮🇳 INR (₹)</span>
            <span>•</span>
            <span>24/7 Concierge Support</span>
          </div>

          <div className="mx-auto flex items-center gap-1.5 font-medium tracking-wide sm:mx-0">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>
              Special Festive Offer: Use code{" "}
              <strong className="text-white underline">SHOPPULSE10</strong> for 10%
              instant discount!
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-400">
            <Link to="/shop" className="hover:text-white transition-colors">
              New Arrivals
            </Link>
            <span>•</span>
            <Link to="/shop" className="hover:text-white transition-colors">
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full border-b transition-all duration-300 ${
          isScrolled
            ? "border-slate-200/90 bg-white/95 backdrop-blur-md shadow-sm py-3"
            : "border-slate-200 bg-white py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-black text-xl shadow-md transition-transform group-hover:scale-105">
                ⚡
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  Shop<span className="text-indigo-600">Pulse</span>
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase -mt-1">
                  Event-Aware Store
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <Link
              to="/"
              className={`transition-colors hover:text-slate-900 ${
                location.pathname === "/" ? "text-indigo-600" : ""
              }`}
            >
              Home
            </Link>

            <Link
              to="/shop"
              className={`transition-colors hover:text-slate-900 ${
                location.pathname === "/shop" ? "text-indigo-600" : ""
              }`}
            >
              All Products
            </Link>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCatDropdownOpen(!catDropdownOpen)}
                className="flex items-center gap-1.5 transition-colors hover:text-slate-900"
              >
                <span>Categories</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    catDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {catDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setCatDropdownOpen(false)}
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      to={`/shop?category=${cat.slug}`}
                      onClick={() => setCatDropdownOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                    >
                      <span>{cat.name}</span>
                      <span className="text-slate-400 text-[10px]">Explore →</span>
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-slate-100 pt-1">
                    <Link
                      to="/shop"
                      onClick={() => setCatDropdownOpen(false)}
                      className="block rounded-xl px-3 py-2 text-center text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
                    >
                      View All Categories
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/shop?sort=newest"
              className="flex items-center gap-1.5 text-amber-600 hover:text-amber-700"
            >
              <Sparkles className="h-4 w-4" />
              <span>Trending Drops</span>
            </Link>
          </nav>

          {/* Right: Search Bar & User Actions */}
          <div className="flex items-center gap-3">
            {/* Search Input Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden sm:block w-48 md:w-64"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-full border border-slate-300 bg-slate-50 py-2 pr-4 pl-9 text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-900"
              />
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
            </form>

            {/* Wishlist Icon */}
            <Link
              to="/shop"
              className="relative rounded-full p-2 text-slate-700 hover:bg-slate-100 transition-colors"
              title="Wishlist"
            >
              <Heart className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                0
              </span>
            </Link>

            {/* Cart Icon */}
            <Link
              to="/shop"
              className="relative rounded-full p-2 text-slate-700 hover:bg-slate-100 transition-colors"
              title="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                0
              </span>
            </Link>

            {/* User Account / Login */}
            <div className="relative">
              {isAuthenticated && user ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 rounded-full border border-slate-200 p-1 pl-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    <span className="hidden md:inline">{user.firstName}</span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                      {user.firstName[0]?.toUpperCase()}
                    </div>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                      <div className="border-b border-slate-100 px-3 py-2">
                        <p className="text-xs font-bold text-slate-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {user.email}
                        </p>
                        <span className="mt-1 inline-block rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 uppercase">
                          {user.role}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 mt-1"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800"
                >
                  <UserIcon className="h-3.5 w-3.5" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-6 lg:hidden animate-in slide-in-from-top duration-200">
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-xl border border-slate-300 py-2.5 pr-4 pl-10 text-sm"
                />
                <Search className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
              </div>
            </form>

            <div className="flex flex-col gap-3 font-semibold text-slate-800">
              <Link to="/" className="py-2 border-b border-slate-100">
                Home
              </Link>
              <Link to="/shop" className="py-2 border-b border-slate-100">
                All Products
              </Link>
              <div className="py-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Categories
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-600">
                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      to={`/shop?category=${cat.slug}`}
                      className="rounded-lg bg-slate-50 p-2 hover:bg-slate-100"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
