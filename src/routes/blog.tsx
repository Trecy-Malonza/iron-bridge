import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock, Search } from "lucide-react";

import heroPark from "@/assets/hero-industrial-park.jpg";
import warehouseGradeA from "@/assets/warehouse-grade-a.jpg";
import warehouseInterior from "@/assets/warehouse-interior.jpg";
import warehouseDusk from "@/assets/warehouse-exterior.jpg";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Insights | IronBridge Industrial Group" },
      {
        name: "description",
        content:
          "Expert perspectives, market trends and news shaping Kenya's industrial and logistics real estate sector.",
      },
      { property: "og:title", content: "Insights That Drive Industrial Progress | IronBridge" },
      {
        property: "og:description",
        content: "Market insights, logistics infrastructure analysis and company news from IronBridge Industrial Group.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

const categories = ["All Posts", "Market Insights", "Logistics & Infrastructure", "Industrial Real Estate", "Company News"];

const posts = [
  {
    category: "Market Insights",
    date: "May 20, 2025",
    title: "Kenya's Industrial Real Estate Market: Trends to Watch in 2025",
    excerpt:
      "An in-depth look at key trends shaping demand, supply, and investment in Kenya's industrial real estate sector.",
    read: "6 min read",
    image: warehouseDusk,
  },
  {
    category: "Logistics & Infrastructure",
    date: "May 12, 2025",
    title: "The Future of Logistics Parks in Kenya",
    excerpt: "Why logistics parks are critical to enhancing supply chain efficiency and supporting industrial growth.",
    read: "5 min read",
    image: warehouseInterior,
  },
  {
    category: "Company News",
    date: "April 28, 2025",
    title: "IronBridge Industrial Group Expands Portfolio in Naivasha",
    excerpt:
      "We are excited to announce the expansion of our industrial space portfolio to meet growing tenant demand.",
    read: "3 min read",
    image: heroPark,
  },
  {
    category: "Industrial Real Estate",
    date: "April 15, 2025",
    title: "What to Consider When Choosing Industrial Space",
    excerpt: "Key factors to evaluate to ensure your business chooses the right space for long-term success.",
    read: "7 min read",
    image: warehouseInterior,
  },
  {
    category: "Logistics & Infrastructure",
    date: "April 7, 2025",
    title: "Improving Connectivity: The Road to Efficient Logistics",
    excerpt: "Infrastructure development and connectivity solutions driving efficiency across Kenya's logistics network.",
    read: "4 min read",
    image: heroPark,
  },
  {
    category: "Market Insights",
    date: "March 30, 2025",
    title: "Demand for Grade A Warehouses on the Rise",
    excerpt:
      "Businesses are seeking higher standards. Here's what's fueling the demand for Grade A industrial spaces.",
    read: "5 min read",
    image: warehouseGradeA,
  },
];

function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden">
        <img
          src={heroPark}
          alt="Industrial park at sunset"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/70 to-navy-deep/20" />
        <div className="relative mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-24">
          <p className="eyebrow text-primary-foreground/80">Blog &amp; Insights</p>
          <h1 className="mt-4 max-w-2xl text-3xl font-extrabold text-navy-foreground sm:text-5xl">
            Insights That Drive
            <br />
            Industrial Progress
          </h1>
          <p className="mt-5 max-w-xl text-sm text-navy-foreground/85 sm:text-base">
            Stay informed with expert perspectives, market trends, and news shaping Kenya's industrial and logistics
            sector.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div>
            <ul className="flex flex-wrap gap-6 border-b border-border pb-3 text-sm">
              {categories.map((c, i) => (
                <li
                  key={c}
                  className={
                    i === 0
                      ? "border-b-2 border-primary pb-3 font-semibold text-primary"
                      : "pb-3 text-muted-foreground"
                  }
                >
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {posts.map((p) => (
                <article key={p.title} className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
                  <img
                    src={p.image}
                    alt={p.title}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold uppercase tracking-wide text-primary">{p.category}</span>
                      <span className="text-muted-foreground">{p.date}</span>
                    </div>
                    <h2 className="mt-3 text-base font-bold text-navy">{p.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" /> {p.read}
                      </span>
                      <span className="flex items-center gap-1.5 font-semibold text-primary">
                        Read More <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-2 text-sm">
              {["1", "2", "3", "...", "8"].map((n) => (
                <span
                  key={n}
                  className={`flex h-9 min-w-9 items-center justify-center rounded-md px-2 ${
                    n === "1" ? "bg-primary font-semibold text-primary-foreground" : "border border-border"
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="flex items-center gap-2 rounded-lg border border-border px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search articles..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h2 className="text-base font-bold text-navy">Popular Posts</h2>
              <ul className="mt-4 space-y-4">
                {posts.slice(0, 5).map((p) => (
                  <li key={p.title} className="flex gap-3">
                    <img
                      src={p.image}
                      alt={p.title}
                      width={1200}
                      height={800}
                      loading="lazy"
                      className="h-14 w-20 shrink-0 rounded object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold leading-snug text-navy">{p.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {p.date} • {p.read}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-accent p-5">
              <h2 className="text-base font-bold text-navy">Subscribe to Our Newsletter</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Get the latest insights and updates delivered to your inbox.
              </p>
              <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-md border border-input bg-card px-3 py-3 text-sm outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}