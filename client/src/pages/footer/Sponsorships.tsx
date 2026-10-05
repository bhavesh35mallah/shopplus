import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Award,
  Users,
  CheckCircle2,
  Send,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

interface SponsorshipSubmitted {
  applicationId: string;
  name: string;
  category: string;
  level: string;
}

const Sponsorships: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    applicantType: "athlete",
    sport: "Cricket",
    level: "District / Ranji Junior",
    portfolioUrl: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState<SponsorshipSubmitted | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setSubmitted({
        applicationId: `PULSE-SPON-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formData.name,
        category: formData.applicantType === "athlete" ? "Grassroots Athlete" : "Tournament / Academy",
        level: formData.level,
      });
      setLoading(false);
    }, 600);
  };

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Tournament Sponsorships</span>
          </nav>

          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Trophy className="h-3.5 w-3.5" />
              Empowering Indian Sporting Talent
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Sponsorships &amp; Grassroots Athlete Grants
            </h1>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              We believe financial barriers should never extinguish athletic brilliance. From grassroots district cricket tournaments to emerging national sprinters, ShopPulse fuels the journey.
            </p>
          </div>

          {/* 3 Program Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-3">
                  <Award className="h-5 w-5 text-rose-500" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600">
                  SCHOLARSHIP PROGRAM
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Emerging Batter &amp; Bowler Kit Grant
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Full annual tournament equipment sponsorship for U-16, U-19, and district cricketers who have demonstrated standout match performances.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                    <span>2x Grade 1 English Willow match bats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Complete match pad &amp; glove suite</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                    <span>StrideX cricket spikes &amp; kitbag</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-3">
                  <Trophy className="h-5 w-5 text-amber-500" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600">
                  EVENT PARTNERSHIP
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Official Tournament &amp; League Partner
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Equipping state-level leagues, corporate tournaments, and inter-university cricket trophies with match equipment and awards.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Official match leather seam balls</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Player of the Match &amp; MVP awards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Subsidized custom sublimation jerseys</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-3">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                  COMMUNITY ACADEMIES
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Cricket Academy Equipment Alliance
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Bulk wholesale subsidies, computerized bat knocking support, and coaching aids for certified coaching academies.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Academy bulk discount tariff (up to 35% off)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Free workshop bat maintenance servicing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Coaching clinic appearances by brand pros</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive Application Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-16">
            {submitted ? (
              <div className="text-center py-8">
                <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                  APPLICATION RECORDED
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  Best of Luck, {submitted.name}!
                </h2>
                <p className="text-xs font-mono text-slate-500 mt-1">
                  APPLICATION ID: <strong className="text-slate-900">{submitted.applicationId}</strong>
                </p>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-4 leading-relaxed">
                  Our Athlete Relations Committee reviews applications on a rolling bi-weekly basis. If shortlisted, our scouts will contact you for match scorecards and video footage.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(null)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                    APPLY NOW
                  </span>
                  <h2 className="text-xl font-black text-slate-900 mt-1">
                    Athlete &amp; Tournament Sponsorship Application
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tell us about your achievements or upcoming tournament event.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Applicant / Tournament Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Yashasvi or Delhi Premier Trophy"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contact@athlete.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Contact Mobile (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Application Category *
                      </label>
                      <select
                        value={formData.applicantType}
                        onChange={(e) => setFormData({ ...formData, applicantType: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      >
                        <option value="athlete">Individual Athlete / Junior Cricketer</option>
                        <option value="tournament">Tournament Organizer / League</option>
                        <option value="academy">Cricket Academy / Coaching Institute</option>
                        <option value="creator">Sports Creator / Analyst</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Current Competitive Level *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        placeholder="e.g. District U-19, Inter-University, Club Division A"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Profile Link / CricHeroes / Instagram
                      </label>
                      <input
                        type="url"
                        value={formData.portfolioUrl}
                        onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                        placeholder="https://cricheroes.com/player-profile/..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Key Highlights &amp; Sponsorship Needs *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your season statistics (runs/wickets), recent achievements, and how ShopPulse gear will support your sporting ambitions..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-7 py-3 rounded-xl transition-all cursor-pointer disabled:opacity-50 shadow-2xs"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{loading ? "Submitting Application..." : "Submit Sponsorship Application"}</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sponsorships;
