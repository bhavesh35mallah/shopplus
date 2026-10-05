import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  User as UserIcon,
  Heart,
  ShoppingBag,
  Menu,
  X,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Store,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import SearchModal from "../common/SearchModal";

const navLinks = [
  { name: "Shop All", path: "/shop", slug: "all" },
  { name: "Men", path: "/shop?category=mens-fashion", slug: "mens-fashion" },
  { name: "Women", path: "/shop?category=womens-fashion", slug: "womens-fashion" },
  { name: "Sports", path: "/shop?category=cricket", slug: "cricket" },
  { name: "Footwear", path: "/shop?category=footwear", slug: "footwear" },
  { name: "Gadgets", path: "/shop?category=electronics", slug: "electronics" },
];

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlist } = useWishlist();

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Global shortcut to open Search Modal (Cmd+K / Ctrl+K / /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      } else if (
        e.key === "/" &&
        !isSearchModalOpen &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchModalOpen]);

  // Close mobile menu and dropdown on page route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname, location.search]);

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate("/");
  };

  const isLinkActive = (slug: string) => {
    if (slug === "all") {
      return location.pathname === "/shop" && !location.search;
    }
    return location.search.includes(`category=${slug}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-200">
        <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden transition-colors cursor-pointer"
              aria-label="Open mobile menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white font-black text-xs tracking-tight group-hover:bg-rose-600 transition-colors">
                SP
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900">
                Shop<span className="text-rose-600">Pulse</span>
              </span>
            </Link>
          </div>

          {/* Center: Clean & Spaced Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isLinkActive(link.slug);
              return (
                <Link
                  key={link.slug}
                  to={link.path}
                  className={`text-[13px] font-semibold tracking-wide transition-colors py-1 relative ${
                    active
                      ? "text-rose-600 font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rose-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Clean, Uniform Action Icon Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Button (Opens Spotlight Search Modal) */}
            <button
              type="button"
              onClick={() => setIsSearchModalOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Search"
              title="Search (⌘K)"
            >
              <Search className="h-4.5 w-4.5" />
            </button>

            {/* Wishlist Button */}
            <Link
              to="/shop?wishlist=true"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:text-rose-600 hover:bg-slate-100 transition-colors"
              aria-label="Wishlist"
              title="View Wishlist"
            >
              <Heart className="h-4.5 w-4.5" />
              {totalWishlist > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
                  {totalWishlist > 9 ? "9+" : totalWishlist}
                </span>
              )}
            </Link>

            {/* Cart / Shopping Bag Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Shopping Bag"
              title="Open Shopping Bag"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white shadow-xs">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            {/* User Account Dropdown */}
            <div ref={dropdownRef} className="relative ml-1">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors cursor-pointer ${
                  userDropdownOpen
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
                aria-label="Account"
                title="Account"
              >
                {isAuthenticated && user?.firstName ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">
                    {user.firstName.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <UserIcon className="h-4.5 w-4.5" />
                )}
              </button>

              {/* Account Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 rounded-2xl bg-white p-3 shadow-2xl border border-slate-100 z-50 animate-fadeIn">
                  {isAuthenticated && user ? (
                    <div>
                      <div className="border-b border-slate-100 px-2 pb-2.5 mb-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {user.firstName} {user.lastName || ""}
                          </p>
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-700">
                            {user.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      </div>

                      <div className="space-y-0.5 text-xs font-medium text-slate-700">
                        <Link
                          to="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <span className="font-semibold text-slate-900">User Dashboard &amp; Orders</span>
                          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                        </Link>
                        <Link
                          to="/vendor"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-1.5">
                            <Store className="h-3.5 w-3.5 text-amber-600" />
                            <span>Vendor Portal</span>
                          </div>
                          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                        </Link>
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="h-3.5 w-3.5 text-rose-600" />
                            <span>Admin Command Center</span>
                          </div>
                          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                        </Link>
                        <Link
                          to="/shop?wishlist=true"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <span>Wishlist ({totalWishlist})</span>
                          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                        </Link>
                      </div>

                      <div className="border-t border-slate-100 mt-2 pt-2">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <LogOut className="h-3.5 w-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-1">
                      <p className="text-xs font-bold text-slate-900">Welcome to ShopPulse</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Access your customer dashboard, vendor portal, or admin hub.
                      </p>
                      <Link
                        to="/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="mt-3 block w-full rounded-xl bg-slate-900 py-2 text-center text-xs font-bold text-white hover:bg-slate-800 transition-colors"
                      >
                        Sign In / Register
                      </Link>

                      <div className="mt-3 border-t border-slate-100 pt-2 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                          Quick Dashboards:
                        </p>
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="h-3.5 w-3.5 text-rose-600" />
                            Admin Center
                          </span>
                          <ChevronRight className="h-3 w-3 text-slate-400" />
                        </Link>
                        <Link
                          to="/vendor"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          <span className="flex items-center gap-1.5">
                            <Store className="h-3.5 w-3.5 text-amber-600" />
                            Vendor Portal
                          </span>
                          <ChevronRight className="h-3 w-3 text-slate-400" />
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          <span className="flex items-center gap-1.5">
                            <UserIcon className="h-3.5 w-3.5 text-blue-600" />
                            User Dashboard
                          </span>
                          <ChevronRight className="h-3 w-3 text-slate-400" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spotlight Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl flex flex-col p-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-white font-black text-xs">
                  SP
                </div>
                <span className="font-bold text-slate-900">ShopPulse</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Search Button */}
            <div className="pt-4 pb-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSearchModalOpen(true);
                }}
                className="w-full flex items-center justify-between rounded-xl bg-slate-100 py-2.5 px-3 text-xs text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <span>Search products...</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">⌘K</span>
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 overflow-y-auto py-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.slug}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold ${
                    isLinkActive(link.slug)
                      ? "bg-rose-50 text-rose-600 font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                </Link>
              ))}

              <div className="pt-2 border-t border-slate-100 mt-2 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                  Dashboards &amp; Hubs
                </p>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    Admin Command Hub
                  </span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/vendor"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-amber-700 hover:bg-amber-50"
                >
                  <span className="flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    Vendor Portal
                  </span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                >
                  <span className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    User Profile &amp; Orders
                  </span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Bottom Auth */}
            <div className="pt-4 border-t border-slate-100">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 text-xs font-semibold text-rose-600 p-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full rounded-xl bg-slate-900 py-2 text-center text-xs font-bold text-white"
                >
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
