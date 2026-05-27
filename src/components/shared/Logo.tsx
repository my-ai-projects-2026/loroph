import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link
      id="nav-brand"
      className="flex items-center gap-3 cursor-pointer"
      href="/"
    >
      <div className="flex items-center gap-2">
        <Image
          src="/logo_8.png"
          alt="L.O.R.O. Logo"
          className="w-12 h-12 object-contain"
          height={100}
          width={100}
        />
        <span className="text-xl font-bold tracking-tight text-white font-headline">
          LORO
        </span>
      </div>
    </Link>
  );
};
export default Logo;
