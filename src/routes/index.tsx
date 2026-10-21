import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GO OS AI — Smarter Trading, Powered by AI" },
      {
        name: "description",
        content:
          "Upload your chart. Get a structured, AI-powered trading analysis in seconds. Educational platform for crypto, forex, stocks and commodities.",
      },
      { property: "og:title", content: "GO OS AI — Smarter Trading, Powered by AI" },
      {
        property: "og:description",
        content:
          "Upload your chart. Get a structured, AI-powered trading analysis in seconds. Built for traders who want clarity — not noise.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- icons ---------- */

const iconPaths: Record<string, ReactNode> = {
  upload: <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />,
  market: <path d="M3 3v18h18M7 14l4-6 4 3 5-7" />,
  cpu: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <path d="M9 9h6v6H9z" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </>
  ),
  doc: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5" />,
  check: <path d="M20 6 9 17l-5-5" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  arrow: <path d="M5 12h14M12 5l7 7-7 7" />,
};

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

/* ---------- scroll reveal ---------- */

function useRevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- animated counter ---------- */

function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 1800,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || !entry.isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/* ---------- floating pill nav ---------- */

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Access", href: "#access" },
  { label: "Rewards", href: "#rewards" },
  { label: "FAQ", href: "#faq" },
];

function PillNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="goos-nav">
      <nav className="goos-nav-pill">
        <a href="#top" className="goos-logo" onClick={close}>
          GO<span>OS</span> AI
        </a>
        <div className="goos-nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <a href="#final-cta" className="btn btn-primary btn-sm goos-nav-cta">
          Get Started
        </a>
        <button
          type="button"
          className={`goos-burger${open ? " open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      {open && (
        <div className="goos-mobile-menu">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          <a href="#final-cta" className="btn btn-primary btn-sm" onClick={close}>
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------- hero ---------- */

function Hexagon({ className }: { className: string }) {
  return (
    <svg className={`hero-shape ${className}`} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <polygon
        points="50,4 90,26 90,74 50,96 10,74 10,26"
        stroke="white"
        strokeOpacity="0.05"
        strokeWidth="1"
      />
    </svg>
  );
}

const heroMockRows = [
  {
    label: "Overview",
    text: "Bitcoin is consolidating above prior range highs; short-term momentum favors buyers.",
  },
  { label: "Trend Bias", text: "Bullish — sequence of higher lows remains intact on the 4H timeframe." },
  { label: "Key Levels", text: "Support 63,200 · Resistance 67,800" },
  { label: "Entry Ideas", text: "Watch pullbacks into 64,000–64,500 for confirmation before continuation." },
];

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        <div className="hero-grid" />
        <Hexagon className="hero-shape-1" />
        <Hexagon className="hero-shape-2" />
        <Hexagon className="hero-shape-3" />
      </div>
      <div className="container hero-inner">
        <span className="pill-badge reveal" data-reveal>
          <span className="dot">●</span> AI-Powered Trading Analysis
        </span>
        <h1 className="hero-title reveal" data-reveal>
          Smarter Trading.
          <br />
          Powered by <span className="grad-text glow">AI</span>.
        </h1>
        <p className="hero-sub reveal" data-reveal>
          Upload your chart. Get a structured professional analysis in seconds. Built for traders
          who want clarity — not noise.
        </p>
        <div className="hero-ctas reveal" data-reveal>
          <a href="#final-cta" className="btn btn-primary">
            Get Started Free
          </a>
          <a href="#how-it-works" className="btn btn-outline">
            See How It Works
          </a>
        </div>
        <div className="trust-bar reveal" data-reveal>
          <span>Educational Only</span>
          <i />
          <span>AI-Powered</span>
          <i />
          <span>Broker-Connected</span>
        </div>
        <div className="hero-mock-wrap reveal" data-reveal>
          <div className="hero-mock-tilt">
            <div className="hero-mock glass">
              <div className="hero-mock-top">
                <span className="mock-pair">BTC/USD · 4H · Crypto</span>
                <span className="badge-bullish">Bullish</span>
              </div>
              {heroMockRows.map((row) => (
                <div className="mock-row" key={row.label}>
                  <span className="mock-label">{row.label}</span>
                  <span className="mock-text">{row.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- how it works ---------- */

const steps = [
  {
    num: "01",
    icon: "upload",
    title: "Upload Your Chart",
    desc: "Screenshot any chart from any platform",
  },
  {
    num: "02",
    icon: "market",
    title: "Choose Your Market",
    desc: "Crypto, Forex, Stocks, Commodities",
  },
  {
    num: "03",
    icon: "cpu",
    title: "AI Processes It",
    desc: "Claude + OpenAI analyze your chart and context",
  },
  {
    num: "04",
    icon: "doc",
    title: "Get Structured Analysis",
    desc: "Professional, readable, educational breakdown",
  },
];

function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title reveal" data-reveal>
            How It Works
          </h2>
          <p className="section-sub reveal" data-reveal>
            Four steps. One clean result.
          </p>
        </div>
        <div className="grid grid-4">
          {steps.map((step, i) => (
            <div className="reveal" data-reveal key={step.num} style={{ transitionDelay: `${i * 90}ms` }}>
              <article className="glass glass-hover step-card">
                <span className="step-num">{step.num}</span>
                <span className="step-icon">
                  <Icon name={step.icon} />
                </span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- what you get ---------- */

const included = [
  "Market Overview",
  "Technical Analysis",
  "Trend Bias",
  "Market Structure",
  "Key Support & Resistance Levels",
  "Bullish / Bearish / Neutral Scenarios",
  "Entry Ideas",
  "Invalidation Levels",
  "Risk & Confidence Notes",
  "Educational Disclaimer",
];

const analysisPreview = [
  { label: "Market Overview", text: "Higher-timeframe structure remains constructive for buyers." },
  { label: "Technical Analysis", text: "Price respects the ascending channel; RSI holds mid-range." },
  { label: "Trend Bias", text: "Bullish while above the 50-period moving average." },
  { label: "Market Structure", text: "Higher highs and higher lows on both 1H and 4H." },
  { label: "Key Levels", text: "Support 63,200 · Resistance 67,800 · Mid 65,400" },
  { label: "Scenarios", text: "Bullish above 67,800 · Bearish below 63,200 · Neutral in range." },
  { label: "Entry Ideas", text: "Confirmation entries on pullbacks toward 64,000–64,500." },
  { label: "Invalidation", text: "Idea is invalid on a 4H close below 62,700." },
  { label: "Risk & Confidence", text: "Moderate conviction — reduce size around news events." },
  { label: "Educational Disclaimer", text: "For educational purposes only. Not financial advice." },
];

function WhatYouGet() {
  return (
    <section className="section" id="what-you-get">
      <div className="container">
        <div className="split">
          <div>
            <h2 className="section-title reveal" data-reveal>
              Every Analysis Includes:
            </h2>
            <ul className="feature-list">
              {included.map((item, i) => (
                <li className="reveal" data-reveal key={item} style={{ transitionDelay: `${i * 50}ms` }}>
                  <span className={`feature-dot${i % 3 === 1 ? " alt" : i % 3 === 2 ? " gold" : ""}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="analysis-card glass reveal" data-reveal>
            {analysisPreview.map((row, i) => (
              <div
                className="analysis-row reveal"
                data-reveal
                key={row.label}
                style={{ transitionDelay: `${120 + i * 80}ms` }}
              >
                <div className="mock-label">{row.label}</div>
                <div className="mock-text">{row.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- tiers ---------- */

const tiers = [
  {
    cls: "tier--1",
    eyebrow: "Tier 1",
    name: "Beginner",
    features: [
      "Connect to our broker",
      "1 analysis per day",
      "Education access",
      "Trading basics & terminology",
    ],
  },
  {
    cls: "tier--2",
    eyebrow: "Tier 2",
    name: "Intermediate",
    featured: true,
    tag: "Most Popular",
    features: [
      "$1,000+ weekly volume",
      "1+ lot traded/week",
      "3 analyses per day",
      "1 expert analysis/week free",
    ],
  },
  {
    cls: "tier--3",
    eyebrow: "Tier 3",
    name: "Pro",
    features: [
      "$5,000+ weekly volume",
      "5+ lots traded/week",
      "5 analyses per day",
      "All tools + premium features",
    ],
  },
];

function Tiers() {
  return (
    <section className="section" id="access">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title reveal" data-reveal>
            Access Levels
          </h2>
          <p className="section-sub reveal" data-reveal>
            Earn access through trading activity or subscribe directly.
          </p>
        </div>
        <div className="grid grid-3 tier-grid">
          {tiers.map((tier, i) => (
            <div className="reveal" data-reveal key={tier.name} style={{ transitionDelay: `${i * 100}ms` }}>
              <article
                className={`glass glass-hover tier ${tier.cls}${tier.featured ? " tier-featured" : ""}`}
              >
                <span className="tier-eyebrow">{tier.eyebrow}</span>
                <h3 className="tier-name">{tier.name}</h3>
                {tier.tag && <span className="tier-tag">{tier.tag}</span>}
                <ul className="tier-features">
                  {tier.features.map((feature) => (
                    <li key={feature}>
                      <Icon name="check" size={15} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
        <div className="premium-card reveal" data-reveal>
          <div>
            <h3 className="premium-title">Don't trade? No problem.</h3>
            <p className="premium-sub">
              <strong>€999/month</strong> — Full access without broker requirements
            </p>
          </div>
          <a href="#final-cta" className="btn btn-white">
            Get Premium Access
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- leaderboard ---------- */

const leaderboard = [
  { name: "D*n K.", volume: "$86,420", lots: "12.8", reward: "1,000 USDT", medal: "medal-gold" },
  { name: "M*ria S.", volume: "$64,150", lots: "9.6", reward: "500 USDT", medal: "medal-silver" },
  { name: "J*son T.", volume: "$51,300", lots: "7.4", reward: "250 USDT", medal: "medal-bronze" },
  { name: "A*ex R.", volume: "$38,760", lots: "5.2", reward: "100 USDT", medal: "medal-plain" },
  { name: "S*rah L.", volume: "$24,900", lots: "3.1", reward: "10 USDT", medal: "medal-plain" },
];

function Leaderboard() {
  return (
    <section className="section" id="rewards">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title reveal" data-reveal>
            Weekly Trading Leaderboard
          </h2>
          <p className="section-sub reveal" data-reveal>
            Top 10 traders earn real USDT rewards every week.
          </p>
        </div>
        <div className="glass lb-card reveal" data-reveal>
          <table className="lb-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Trader</th>
                <th>Weekly Volume</th>
                <th>Lots</th>
                <th>Reward</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((row, i) => (
                <tr key={row.name}>
                  <td>
                    <span className={`medal ${row.medal}`}>{i < 3 ? i + 1 : i + 1}</span>
                  </td>
                  <td>{row.name}</td>
                  <td>{row.volume}</td>
                  <td>{row.lots}</td>
                  <td className="lb-reward">{row.reward}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="lb-note reveal" data-reveal>
          Minimum reward: <strong>10 USDT</strong> · Maximum: <strong>1,000 USDT</strong> · Paid
          weekly
        </p>
      </div>
    </section>
  );
}

/* ---------- stats ---------- */

const stats = [
  { target: 5000, prefix: "", suffix: "+", label: "Analyses Generated" },
  { target: 23, prefix: "€", suffix: "M+", label: "In Tracked Community Volume" },
  { target: 94, prefix: "", suffix: "%", label: "Analysis Accuracy Rating" },
];

function Stats() {
  return (
    <section className="section" id="stats">
      <div className="container">
        <div className="grid grid-3">
          {stats.map((stat, i) => (
            <div className="reveal" data-reveal key={stat.label} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="glass glass-hover stat-card">
                <div className="stat-value">
                  <CountUp target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- broker connection ---------- */

const brokerPoints = [
  "Real-time volume & lot tracking",
  "Monthly tier validation",
  "Auto-upgrade when you hit milestones",
];

function Broker() {
  return (
    <section className="section" id="broker">
      <div className="container">
        <div className="split">
          <div>
            <h2 className="section-title reveal" data-reveal>
              Connect Your Broker. Unlock Access.
            </h2>
            <p className="section-sub reveal" data-reveal>
              All free-tier users must trade via our partner broker. Verified automatically.
            </p>
            <ul className="broker-list">
              {brokerPoints.map((point, i) => (
                <li className="reveal" data-reveal key={point} style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="check-icon">
                    <Icon name="check" size={13} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="connect-card glass reveal" data-reveal>
            <div className="connect-field">
              <label htmlFor="broker-id">Broker Account ID</label>
              <input
                id="broker-id"
                className="connect-value"
                value="GO-8842-••••"
                disabled
                readOnly
                aria-label="Broker account ID"
              />
            </div>
            <div className="connect-field">
              <label>Status</label>
              <span className="connect-value status-connected">● Connected</span>
            </div>
            <div className="connect-field">
              <label>Weekly Lots</label>
              <span className="connect-value">2.4</span>
            </div>
            <div className="connect-field">
              <label>Weekly Volume</label>
              <span className="connect-value">$4,200</span>
            </div>
            <button type="button" className="btn btn-primary">
              Connect Broker
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- faq ---------- */

const faqs = [
  {
    q: "Is this financial advice?",
    a: "No. All analyses are strictly educational and informational.",
  },
  {
    q: "What markets can I analyze?",
    a: "Crypto, Forex, Stocks, Commodities, Indices.",
  },
  {
    q: "Which AI models power this?",
    a: "We use a combination of OpenAI and Claude (Anthropic) for analysis.",
  },
  {
    q: "What if I don't want to use a broker?",
    a: "You can subscribe to our €999/month premium plan for full access.",
  },
  {
    q: "How is my tier validated?",
    a: "Every month, our system checks your trading activity automatically.",
  },
  {
    q: "Can I ask follow-up questions?",
    a: "Yes — each analysis includes an AI follow-up chat (coming soon).",
  },
];

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title reveal" data-reveal>
            Frequently Asked Questions
          </h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div className={`faq-item reveal${openIndex === i ? " open" : ""}`} data-reveal key={faq.q}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {faq.q}
                <span className="faq-chevron">
                  <Icon name="chevron" size={18} />
                </span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- final cta + footer ---------- */

function FinalCta() {
  return (
    <section className="section final-cta" id="final-cta">
      <div className="container">
        <h2 className="section-title reveal" data-reveal>
          Ready to Trade Smarter?
        </h2>
        <p className="hero-sub reveal" data-reveal>
          Start with one free analysis. No credit card required.
        </p>
        <div className="hero-ctas reveal" data-reveal>
          <a href="#top" className="btn btn-primary">
            Get Started Free <Icon name="arrow" size={17} />
          </a>
        </div>
        <p className="final-disclaimer reveal" data-reveal>
          Educational platform only. Not financial advice.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          <span className="goos-logo">
            GO<span>OS</span> AI
          </span>{" "}
          · © 2026
        </span>
        <div className="footer-links">
          <a href="#top">Privacy Policy</a>
          <a href="#top">Terms</a>
          <a href="#faq">FAQ</a>
        </div>
        <span>Not financial advice. Educational only.</span>
      </div>
    </footer>
  );
}

/* ---------- page ---------- */

function Index() {
  useRevealObserver();

  return (
    <div className="goos">
      <div className="goos-glow goos-glow-crimson" />
      <div className="goos-glow goos-glow-blue" />
      <div className="goos-noise" />
      <PillNav />
      <main>
        <Hero />
        <HowItWorks />
        <WhatYouGet />
        <Tiers />
        <Leaderboard />
        <Stats />
        <Broker />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
