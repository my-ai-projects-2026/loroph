import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      id="nav-brand"
      className="flex items-center gap-3 cursor-pointer"
      href="/"
    >
      <div className="flex items-center gap-2">
        <Image
          src="/logo8.png"
          alt="L.O.R.O. Logo"
          className="w-12 h-12 object-contain"
          height={100}
          width={100}
        />
        <div className="flex flex-col  items-start">
          <h1 className="text-xl font-bold tracking-tight text-(--color-on-surface) font-headline">
            L.O.R.O
          </h1>
          <p className="text-xs text-(--color-on-surface-variant)">
            Loyalty Offers and Rewards Online
          </p>
        </div>
      </div>
    </Link>
  );
};
export default Logo;
