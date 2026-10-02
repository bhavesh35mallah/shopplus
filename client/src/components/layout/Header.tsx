import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  User as UserIcon,
  Heart,
  ShoppingBag,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

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
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.05)] border-b border-[#eaeaec]">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Left: Mobile Toggle & Myntra Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded p-1 text-[#282c3f] lg:hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5">
            {/* Myntra-style vibrant gradient logo mark */}
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#ff3f6c] via-[#f2557a] to-[#ff905a] shadow-md shadow-[#ff3f6c]/20">
              <span className="text-xl font-black text-white italic tracking-tighter">SP</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xl font-black tracking-wider text-[#282c3f] uppercase">
                Shop<span className="text-[#ff3f6c]">Pulse</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Categories (Myntra uppercase links) */}
          <nav className="hidden lg:flex items-center gap-8 ml-4">
            <Link
              to="/shop?category=mens-fashion"
              className={`text-sm font-bold tracking-wider text-[#282c3f] uppercase transition-all hover:text-[#ff3f6c] py-7 border-b-4 border-transparent hover:border-[#ff3f6c] ${
                location.search.includes("mens-fashion") ? "border-[#ff3f6c] text-[#ff3f6c]" : ""
              }`}
            >
              Men
            </Link>

            <Link
              to="/shop?category=womens-fashion"
              className={`text-sm font-bold tracking-wider text-[#282c3f] uppercase transition-all hover:text-[#ff3f6c] py-7 border-b-4 border-transparent hover:border-[#ff3f6c] ${
                location.search.includes("womens-fashion") ? "border-[#ff3f6c] text-[#ff3f6c]" : ""
              }`}
            >
              Women
            </Link>

            <Link
              to="/shop?category=cricket"
              className={`text-sm font-bold tracking-wider text-[#282c3f] uppercase transition-all hover:text-[#ff3f6c] py-7 border-b-4 border-transparent hover:border-[#ff3f6c] ${
                location.search.includes("cricket") ? "border-[#ff3f6c] text-[#ff3f6c]" : ""
              }`}
            >
              Sports &amp; Cricket
            </Link>

            <Link
              to="/shop?category=footwear"
              className={`text-sm font-bold tracking-wider text-[#282c3f] uppercase transition-all hover:text-[#ff3f6c] py-7 border-b-4 border-transparent hover:border-[#ff3f6c] ${
                location.search.includes("footwear") ? "border-[#ff3f6c] text-[#ff3f6c]" : ""
              }`}
            >
              Footwear
            </Link>

            <Link
              to="/shop?category=electronics"
              className={`text-sm font-bold tracking-wider text-[#282c3f] uppercase transition-all hover:text-[#ff3f6c] py-7 border-b-4 border-transparent hover:border-[#ff3f6c] ${
                location.search.includes("electronics") ? "border-[#ff3f6c] text-[#ff3f6c]" : ""
              }`}
            >
              Gadgets
            </Link>

            <Link
              to="/shop"
              className="relative text-sm font-bold tracking-wider text-[#282c3f] uppercase transition-all hover:text-[#ff3f6c] py-7 border-b-4 border-transparent hover:border-[#ff3f6c]"
            >
              Studio
              <span className="absolute top-4 -right-7 rounded-full bg-[#ff3f6c] px-1.5 py-0.2 text-[9px] font-extrabold text-white uppercase tracking-tighter">
                NEW
              </span>
            </Link>
          </nav>
        </div>

        {/* Center-Right: Myntra-style Search Bar */}
        <div className="flex-1 max-w-[480px] mx-6 hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands and more"
              className="w-full rounded bg-[#f5f5f6] border border-transparent py-2.5 pr-4 pl-11 text-xs text-[#282c3f] outline-none transition-all placeholder:text-[#696e79] focus:bg-white focus:border-[#d4d5d9]"
            />
            <Search className="absolute top-2.5 left-3.5 h-4 w-4 text-[#696e79]" />
          </form>
        </div>

        {/* Right: User, Wishlist, Bag with Myntra Vertical Icon Stack */}
        <div className="flex items-center gap-7">
          {/* Profile Action */}
          <div
            className="relative cursor-pointer flex flex-col items-center group py-2"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
          >
            <UserIcon className="h-5 w-5 text-[#282c3f] group-hover:text-[#ff3f6c] transition-colors" />
            <span className="text-[11px] font-bold text-[#282c3f] mt-1 group-hover:text-[#ff3f6c] transition-colors">
              Profile
            </span>

            {/* Profile Dropdown Menu */}
            {userDropdownOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-64 rounded bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-[#eaeaec] z-50"
                onClick={(e) => e.stopPropagation()}
              >
                {isAuthenticated && user ? (
                  <div>
                    <div className="border-b border-[#f5f5f6] pb-3 mb-3">
                      <p className="text-sm font-bold text-[#282c3f]">
                        Hello, {user.firstName}
                      </p>
                      <p className="text-xs text-[#535766] truncate">{user.email}</p>
                      <span className="mt-1.5 inline-block rounded bg-[#ff3f6c]/10 px-2 py-0.5 text-[10px] font-bold text-[#ff3f6c] uppercase">
                        {user.role} Member
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-semibold text-[#282c3f]">
                      <Link to="/shop" className="block hover:text-[#ff3f6c] py-1">
                        Orders &amp; Returns
                      </Link>
                      <Link to="/shop" className="block hover:text-[#ff3f6c] py-1">
                        Saved Cards &amp; UPI
                      </Link>
                      <Link to="/shop" className="block hover:text-[#ff3f6c] py-1">
                        Myntra Insider Club
                      </Link>
                    </div>

                    <div className="border-t border-[#f5f5f6] mt-3 pt-3">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 text-xs font-bold text-[#ff3f6c] hover:underline"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>LOGOUT</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-bold text-[#282c3f]">Welcome to ShopPulse</p>
                    <p className="text-xs text-[#535766] mt-0.5">
                      To access orders and wishlist
                    </p>
                    <Link
                      to="/login"
                      onClick={() => setUserDropdownOpen(false)}
                      className="mt-3 block w-full rounded border border-[#eaeaec] bg-white py-2 text-center text-xs font-bold uppercase tracking-wider text-[#ff3f6c] hover:border-[#ff3f6c] transition-colors"
                    >
                      LOGIN / SIGNUP
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Action */}
          <Link
            to="/shop"
            className="flex flex-col items-center group py-2 relative"
          >
            <Heart className="h-5 w-5 text-[#282c3f] group-hover:text-[#ff3f6c] transition-colors" />
            <span className="text-[11px] font-bold text-[#282c3f] mt-1 group-hover:text-[#ff3f6c] transition-colors">
              Wishlist
            </span>
          </Link>

          {/* Bag Action */}
          <Link
            to="/shop"
            className="flex flex-col items-center group py-2 relative"
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5 text-[#282c3f] group-hover:text-[#ff3f6c] transition-colors" />
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff3f6c] text-[10px] font-bold text-white">
                0
              </span>
            </div>
            <span className="text-[11px] font-bold text-[#282c3f] mt-1 group-hover:text-[#ff3f6c] transition-colors">
              Bag
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[#eaeaec] bg-white p-4 lg:hidden">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded bg-[#f5f5f6] py-2 pr-4 pl-10 text-xs"
              />
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-[#696e79]" />
            </div>
          </form>

          <div className="flex flex-col gap-3 font-bold text-sm text-[#282c3f] uppercase">
            <Link to="/shop?category=mens-fashion" className="py-2 border-b border-[#f5f5f6]">
              Men
            </Link>
            <Link to="/shop?category=womens-fashion" className="py-2 border-b border-[#f5f5f6]">
              Women
            </Link>
            <Link to="/shop?category=cricket" className="py-2 border-b border-[#f5f5f6]">
              Sports &amp; Cricket
            </Link>
            <Link to="/shop?category=footwear" className="py-2 border-b border-[#f5f5f6]">
              Footwear
            </Link>
            <Link to="/shop?category=electronics" className="py-2 border-b border-[#f5f5f6]">
              Gadgets
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
