"use client";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

/* ─── Data ────────────────────────────────────────────────────────────────── */

type Category = "All Items" | "Apparel" | "Drinkware" | "Tools";

interface Product {
  id: string;
  name: string;
  variant: string;
  category: Exclude<Category, "All Items">;
  isNew?: boolean;
  imageSrc: string;
  imageAlt: string;
}

const PRODUCTS: Product[] = [
  {
    id: "ceramic-mug",
    name: "Ceramic Branded Mug",
    variant: "Matt Black & Indigo",
    category: "Drinkware",
    isNew: true,
    imageSrc: "/merch/mug.png",
    imageAlt: "L.O.R.O. ceramic branded mug in matt black with indigo logo",
  },
  {
    id: "cup-counts-tee",
    name: '"Every Cup Counts" Tee',
    variant: "Charcoal / Indigo Accents",
    category: "Apparel",
    imageSrc: "/merch/tee.png",
    imageAlt: "Every Cup Counts charcoal t-shirt",
  },
  {
    id: "digital-keychain",
    name: "Digital Sync Keychain",
    variant: "Laser-etched Steel",
    category: "Tools",
    imageSrc: "/merch/keychain.png",
    imageAlt: "Digital sync keychain in laser-etched steel",
  },
  {
    id: "barista-apron",
    name: "Barista-grade Apron",
    variant: "Heavy Canvas / Indigo Embroidery",
    category: "Apparel",
    imageSrc: "/merch/apron.png",
    imageAlt: "Barista-grade apron in heavy canvas with indigo embroidery",
  },
];

const CATEGORIES: Category[] = ["All Items", "Apparel", "Drinkware", "Tools"];

/* ─── Sub-components ──────────────────────────────────────────────────────── */

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-5 py-2 rounded-full font-mono text-xs tracking-wider uppercase font-semibold
        transition-all duration-300 cursor-pointer whitespace-nowrap border
        ${
          active
            ? "bg-(--color-electric-blue) text-white border-(--color-electric-blue) shadow-[0_0_18px_rgba(0,102,255,0.45)] hover:scale-[1.02]"
            : "bg-(--color-input-bg) text-(--color-on-surface-variant) border-(--color-glass-stroke) hover:border-(--color-electric-blue)/50 hover:text-(--color-on-surface) hover:scale-[1.01]"
        }
        active:scale-[0.98]
      `}
    >
      {label}
    </button>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      className="
        group flex flex-col rounded-2xl overflow-hidden glass-card
        hover:border-(--color-card-border-hover)
        hover:-translate-y-1
        transition-all duration-300
      "
    >
      {/* Image Area */}
      <div className="relative w-full aspect-square bg-(--color-surface-container-lowest) overflow-hidden border-b border-(--color-glass-stroke)">
        {product.isNew && (
          <span
            className="
              absolute top-3.5 left-3.5 z-10
              px-2 py-0.5 rounded-md
              bg-(--color-cyan-glow) text-slate-950 dark:text-[#00363a]
              font-mono text-[9px] font-bold tracking-widest uppercase
              shadow-[0_0_10px_var(--color-cyan-glow)/20]
            "
          >
            NEW
          </span>
        )}
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {/* Ambient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-surface-container-lowest)/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Info + Add Action */}
      <div className="flex items-end justify-between p-5 gap-3">
        <div className="min-w-0">
          <p className="font-headline font-semibold text-(--color-on-surface) text-sm md:text-base leading-snug truncate group-hover:text-(--color-electric-blue) transition-colors duration-200">
            {product.name}
          </p>
          <p className="font-mono text-[10px] md:text-[11px] text-(--color-on-surface-variant)/70 mt-1 tracking-wide truncate">
            {product.variant}
          </p>
        </div>

        <button
          onClick={handleAdd}
          aria-label={`Add ${product.name} to cart`}
          className={`
            shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
            transition-all duration-300 cursor-pointer border
            ${
              added
                ? "bg-(--color-cyan-glow)/20 text-(--color-cyan-glow) border-(--color-cyan-glow)/40 scale-95"
                : "bg-(--color-electric-blue)/10 text-(--color-electric-blue) border-(--color-electric-blue)/20 hover:bg-(--color-electric-blue) hover:text-white hover:shadow-[0_0_16px_rgba(0,102,255,0.45)] hover:scale-105 active:scale-95"
            }
          `}
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ─── Merch Perks ─────────────────────────────────────────────────────────── */

function MerchPerks() {
  return (
    <section className="mt-20">
      <h2 className="font-headline text-2xl sm:text-3xl font-bold text-(--color-on-surface) mb-8">
        Merch Perks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Double Stamps Day — wider card */}
        <div
          className="
            md:col-span-3
            relative overflow-hidden rounded-2xl glass-card
            min-h-[260px] flex flex-col justify-end p-8
            hover:border-(--color-card-border-hover)
            transition-all duration-300
          "
          style={{
            backgroundImage: "url('/merch/stamps-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Theme-aware Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-(--color-surface-container-lowest) via-(--color-surface-container-lowest)/75 to-transparent z-0 pointer-events-none" />

          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-(--color-electric-blue)/10 blur-[60px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <h3 className="font-headline text-2xl sm:text-3xl font-bold text-(--color-on-surface) leading-tight mb-2">
              Double Stamps Day
            </h3>
            <p className="text-(--color-on-surface-variant)/80 text-sm leading-relaxed max-w-sm">
              Wear your gear to any partner location and earn 2x stamps on every
              order.
            </p>
          </div>
        </div>

        {/* Gold Member Exclusive — narrower card */}
        <div
          className="
            md:col-span-2
            relative overflow-hidden rounded-2xl
            flex flex-col items-center justify-center
            text-center p-8 min-h-[260px]
            shadow-[0_8px_32px_rgba(0,102,255,0.25)] border border-(--color-electric-blue)/30
            hover:shadow-[0_8px_40px_rgba(0,102,255,0.35)] hover:scale-[1.01]
            transition-all duration-300
          "
          style={{
            background: "linear-gradient(135deg, #0066FF 0%, #003fa4 100%)",
          }}
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/25 shadow-inner">
              <Star className="w-7 h-7 text-white fill-white/80 animate-pulse" />
            </div>

            <div>
              <h3 className="font-headline text-xl font-bold text-white leading-snug mb-2">
                Gold Member Exclusive
              </h3>
              <p className="text-blue-100/90 text-sm leading-relaxed max-w-[240px]">
                Claim your free keychain once you hit 1,000 points.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function ItemsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All Items");

  const filtered =
    activeCategory === "All Items"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen text-(--color-on-surface) font-body relative overflow-x-hidden theme-page-bg transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="fixed top-[-15%] right-[-5%] w-[600px] h-[500px] bg-(--color-electric-blue)/8 dark:bg-(--color-electric-blue)/5 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-(--color-cyan-glow)/5 dark:bg-(--color-cyan-glow)/3 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        {/* Page Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--color-electric-blue)/10 border border-(--color-electric-blue)/20 mb-5 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-(--color-primary)">
              L.O.R.O Merchandise
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-(--color-cyan-glow) animate-pulse shadow-[0_0_8px_var(--color-cyan-glow)]" />
          </div>

          <h1 className="font-headline text-3xl sm:text-5xl font-bold text-(--color-on-surface) leading-tight tracking-tight mb-4">
            The Coffee Collection
          </h1>
          <p className="text-(--color-on-surface-variant)/80 text-sm sm:text-base leading-relaxed max-w-md">
            Digital-first gear for the modern barista. Artisanal quality meets{" "}
            <span className="text-(--color-primary) font-semibold">
              L.O.R.O.
            </span>{" "}
            innovation.
          </p>
        </header>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center glass-card rounded-2xl border border-(--color-glass-stroke)">
            <div className="w-16 h-16 rounded-2xl bg-(--color-input-bg) border border-(--color-glass-stroke) flex items-center justify-center mb-4 shadow-sm">
              <ShoppingCart className="w-7 h-7 text-(--color-on-surface-variant)/60" />
            </div>
            <p className="font-headline text-lg text-(--color-on-surface) font-semibold">
              No items in this category
            </p>
            <p className="text-(--color-on-surface-variant)/80 text-sm mt-1">
              Check back soon for new arrivals.
            </p>
          </div>
        )}

        {/* Merch Perks */}
        <MerchPerks />
      </div>
    </div>
  );
}
