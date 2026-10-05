import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface LoginProps {
  initialMode?: "login" | "register";
}

const Login: React.FC<LoginProps> = ({ initialMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();

  // Mode defaults to initialMode or inspects pathname
  const [mode, setMode] = useState<"login" | "register">(
    initialMode || (location.pathname === "/register" ? "register" : "login")
  );

  // Sync mode if location changes
  useEffect(() => {
    if (location.pathname === "/register") {
      setMode("register");
    } else if (location.pathname === "/login") {
      setMode("login");
    }
  }, [location.pathname]);

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot password modal
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "", color: "bg-slate-200" };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: "Weak", color: "bg-rose-500" };
    if (score <= 3) return { score: 2, label: "Good", color: "bg-amber-500" };
    return { score: 3, label: "Strong", color: "bg-emerald-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === "login") {
        await login({ email, password });
      } else {
        await register({
          firstName,
          lastName,
          email,
          password,
        });
      }
      navigate("/");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          (mode === "login"
            ? "Invalid email or password. Please verify credentials."
            : "Registration failed. This email may already be registered.")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setError("");
    setEmail("demo@shoppulse.com");
    setPassword("password123");
  };

  const handleSocialMock = (provider: "Google" | "Apple") => {
    setEmail(`${provider.toLowerCase()}.athlete@shoppulse.com`);
    setPassword("password123");
    setError("");
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail.trim()) {
      setForgotSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row selection:bg-slate-900 selection:text-white">
      {/* LEFT COLUMN: Editorial Sportswear Visual Showcase */}
      <div className="relative w-full lg:w-1/2 min-h-[340px] lg:min-h-screen bg-slate-950 flex flex-col justify-between p-6 sm:p-12 overflow-hidden">
        {/* Dynamic Stadium & Athlete Action Background */}
        <img
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600&auto=format&fit=crop&q=85"
          alt="Tournament Cricket Stadium"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Gradient Shadow Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40" />

        {/* Top Header on Visual Side */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-950 font-black text-sm shadow-xl group-hover:scale-105 transition-transform">
              SP
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              Shop<span className="text-rose-500">Pulse</span>
            </span>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-white/15">
            <Sparkles className="h-3 w-3 text-rose-400" />
            2026 Match Edition
          </span>
        </div>

        {/* Middle/Bottom Editorial Statement */}
        <div className="relative z-10 max-w-lg mt-auto pt-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600/90 text-white text-[10px] font-extrabold uppercase tracking-widest mb-4 shadow-lg shadow-rose-600/30">
            CERTIFIED TOURNAMENT WILLOW
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
            Built For Athletes Who Demand The Real Thing.
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
            Direct-from-factory English Willow bats, high-performance spikes, and urban capsules. Zero counterfeits, 100% verified authentic.
          </p>

          {/* Social Proof Stats */}
          <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-8 text-white">
            <div>
              <span className="text-xl sm:text-2xl font-black block">250K+</span>
              <span className="text-[11px] text-slate-400">Athletes Powered</span>
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div>
              <span className="text-xl sm:text-2xl font-black block">100%</span>
              <span className="text-[11px] text-slate-400">Hologram Verified</span>
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 block">4.9 ★</span>
              <span className="text-[11px] text-slate-400">Match Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Modern Minimalist Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-[#fafafc]">
        {/* Top Utility Bar */}
        <div className="flex items-center justify-between pb-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Shop</span>
          </Link>

          <div className="text-xs text-slate-500">
            {mode === "login" ? (
              <span>
                New athlete?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setError("");
                  }}
                  className="font-bold text-slate-900 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Create Account
                </button>
              </span>
            ) : (
              <span>
                Already a member?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                  className="font-bold text-slate-900 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Centered Form Area */}
        <div className="max-w-[420px] w-full mx-auto my-auto py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {mode === "login" ? "Sign In to ShopPulse" : "Join the Pulse Roster"}
            </h1>
            <p className="mt-1.5 text-xs text-slate-500">
              {mode === "login"
                ? "Enter your credentials to access your gear orders & saved bag"
                : "Register for member-only drops and an instant 15% discount"}
            </p>
          </div>

          {/* Segmented Pill Switcher */}
          <div className="flex rounded-xl bg-slate-200/60 p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError("");
              }}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                mode === "register"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Register
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{error}</div>
              <button
                type="button"
                onClick={() => setError("")}
                className="text-rose-400 hover:text-rose-700 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Rohit"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none transition-colors shadow-2xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Sharma"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none transition-colors shadow-2xs"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rohit@example.com"
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none transition-colors shadow-2xs"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotModalOpen(true);
                      setForgotEmail(email);
                      setForgotSent(false);
                    }}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white border border-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none transition-colors shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password Strength for Register */}
              {mode === "register" && password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Security strength:</span>
                    <span className="font-bold text-slate-700">{passwordStrength.label}</span>
                  </div>
                  <div className="flex gap-1 h-1 w-full">
                    <div
                      className={`flex-1 rounded-full transition-colors ${
                        passwordStrength.score >= 1 ? passwordStrength.color : "bg-slate-200"
                      }`}
                    />
                    <div
                      className={`flex-1 rounded-full transition-colors ${
                        passwordStrength.score >= 2 ? passwordStrength.color : "bg-slate-200"
                      }`}
                    />
                    <div
                      className={`flex-1 rounded-full transition-colors ${
                        passwordStrength.score >= 3 ? passwordStrength.color : "bg-slate-200"
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>

            {mode === "login" && (
              <div className="flex items-center pt-0.5">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span>Keep me signed in on this device</span>
                </label>
              </div>
            )}

            {/* Submit Action */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-black py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              <span>{loading ? "Authorizing..." : mode === "login" ? "Sign In to Stadium" : "Join Pulse Roster"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Social Separator */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-[#fafafc] px-3 text-[11px] text-slate-400 font-medium">
              or connect with
            </span>
          </div>

          {/* Social Sign-in Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleSocialMock("Google")}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer shadow-2xs"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialMock("Apple")}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer shadow-2xs"
            >
              <svg className="h-4 w-4 fill-current text-slate-900" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.68-.82 1.13-1.96.99-3.1-.97.04-2.15.65-2.85 1.47-.61.71-1.14 1.88-1 3 .02 0 .04 0 .06 0 1.03 0 2.12-.55 2.8-1.37z" />
              </svg>
              <span>Apple ID</span>
            </button>
          </div>

          {/* Quick Demo Credentials Autofill */}
          {mode === "login" && (
            <div className="mt-6 pt-5 border-t border-slate-200/60 text-center">
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Auto-fill demo test credentials
              </button>
            </div>
          )}
        </div>

        {/* Bottom Legal Links */}
        <div className="text-center text-[11px] text-slate-400 pt-6 border-t border-slate-200/60 flex items-center justify-center gap-3">
          <Link to="/privacy-policy" className="hover:text-slate-600 transition-colors">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link to="/terms-of-service" className="hover:text-slate-600 transition-colors">
            Terms of Service
          </Link>
          <span>•</span>
          <Link to="/contact" className="hover:text-slate-600 transition-colors">
            24/7 Support
          </Link>
        </div>
      </div>

      {/* Forgot Password Recovery Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 relative shadow-2xl border border-slate-100">
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {forgotSent ? (
              <div className="text-center py-4">
                <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-base font-black text-slate-900">Check your inbox</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  We've sent recovery instructions to <strong>{forgotEmail}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-base font-black text-slate-900">Reset password</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your email address to receive password reset instructions.
                </p>

                <form onSubmit={handleForgotSubmit} className="mt-4 space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="rohit@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    Send Recovery Link
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;