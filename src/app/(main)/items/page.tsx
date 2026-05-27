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
        px-4 py-1.5 rounded-full font-mono text-xs tracking-wider uppercase font-semibold
        transition-all duration-200 cursor-pointer whitespace-nowrap
        ${
          active
            ? "bg-[#0066FF] text-white shadow-[0_0_18px_rgba(0,102,255,0.45)]"
            : "bg-[rgba(255,255,255,0.06)] text-[#c2c6d8] border border-[rgba(255,255,255,0.10)] hover:border-[rgba(0,102,255,0.35)] hover:text-white"
        }
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
        group flex flex-col rounded-2xl overflow-hidden
        border border-[rgba(255,255,255,0.10)]
        bg-[rgba(16,22,36,0.72)] backdrop-blur-md
        hover:border-[rgba(0,102,255,0.35)]
        hover:-translate-y-1
        transition-all duration-300
        shadow-[0_8px_32px_rgba(0,0,0,0.35)]
      "
    >
      {/* Image */}
      <div className="relative w-full aspect-square bg-[#0b0e16] overflow-hidden">
        {product.isNew && (
          <span
            className="
              absolute top-3 left-3 z-10
              px-2 py-0.5 rounded-md
              bg-[#00dbe9] text-[#00363a]
              font-mono text-[10px] font-bold tracking-widest uppercase
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
        {/* Subtle bottom gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e16]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info + Action */}
      <div className="flex items-end justify-between p-4 gap-3">
        <div className="min-w-0">
          <p className="font-headline font-semibold text-[#e1e2ee] text-sm leading-snug truncate">
            {product.name}
          </p>
          <p className="font-mono text-[11px] text-[#8c90a1] mt-0.5 tracking-wide truncate">
            {product.variant}
          </p>
        </div>

        <button
          onClick={handleAdd}
          aria-label={`Add ${product.name} to cart`}
          className={`
            shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
            transition-all duration-200 cursor-pointer
            ${
              added
                ? "bg-[#00dbe9]/20 text-[#00dbe9] border border-[#00dbe9]/40 scale-95"
                : "bg-[#0066FF]/15 text-[#0066FF] border border-[#0066FF]/30 hover:bg-[#0066FF] hover:text-white hover:shadow-[0_0_16px_rgba(0,102,255,0.5)]"
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
    <section className="mt-16">
      <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-[#e1e2ee] mb-6">
        Merch Perks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Double Stamps Day — wider card */}
        <div
          className="
            md:col-span-3
            relative overflow-hidden rounded-2xl
            border border-[rgba(255,255,255,0.10)]
            min-h-[240px] flex flex-col justify-end p-7
            shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          "
          style={{
            background:
              "linear-gradient(180deg, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.88) 100%), url('/merch/stamps-bg.png') center/cover no-repeat",
          }}
        >
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#0066FF]/10 blur-[60px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <h3 className="font-headline text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
              Double Stamps Day
            </h3>
            <p className="text-[#c2c6d8] text-sm leading-relaxed max-w-sm">
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
            text-center p-7 min-h-[240px]
            shadow-[0_8px_32px_rgba(0,102,255,0.25)]
          "
          style={{
            background:
              "linear-gradient(135deg, #0066FF 0%, #003fa4 100%)",
          }}
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/25">
              <Star className="w-7 h-7 text-white fill-white/80" />
            </div>

            <div>
              <h3 className="font-headline text-xl font-bold text-white leading-snug mb-2">
                Gold Member Exclusive
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed">
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
    <div
      className="min-h-screen text-[#e1e2ee] font-body relative overflow-x-hidden"
      style={{
        background:
          "radial-gradient(circle at top right, #0F172A 0%, #05070A 100%)",
      }}
    >
      {/* Ambient background glows */}
      <div className="fixed top-[-15%] right-[-5%] w-[600px] h-[500px] bg-[#0066FF]/8 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-[#00dbe9]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        {/* Page Header */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 mb-5">
            <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-[#b3c5ff]">
              LOYALTY.OS Merchandise
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00dbe9] animate-pulse" />
          </div>

          <h1 className="font-headline text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-3">
            The Coffee Collection
          </h1>
          <p className="text-[#8c90a1] text-sm sm:text-base leading-relaxed max-w-md">
            Digital-first gear for the modern barista. Artisanal quality meets{" "}
            <span className="text-[#b3c5ff]">LOYALTY.OS</span> innovation.
          </p>
        </header>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.10)] flex items-center justify-center mb-4">
              <ShoppingCart className="w-7 h-7 text-[#424656]" />
            </div>
            <p className="font-headline text-lg text-[#c2c6d8] font-semibold">
              No items in this category
            </p>
            <p className="text-[#8c90a1] text-sm mt-1">
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
