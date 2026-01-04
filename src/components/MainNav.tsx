import Link from "next/link";
import Image from "next/image";

const MainNav = () => {
  return (
    <nav className="px-2 py-2">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex flex-col items-center gap-2">
          <div className="relative h-40 w-40 items-center justify-center rounded-full overflow-hidden">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              fill
              className="object-contain p-1"
            />
          </div>
        </Link>

        <form className="flex-1 max-w-xl mx-auto relative group">
          <label htmlFor="search-input" className="sr-only">
            Search smoothies & pastries
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <input
              id="search-input"
              type="search"
              className="w-full h-11 pl-12 pr-4 rounded-full text-background-dark placeholder:text-gray-400 shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="Search smoothies & pastries..."
            />
          </div>
        </form>

        {/* sub menu */}
        <ul className="hidden lg:flex gap-3 items-center">
          {[
            { name: "Cakes and Pastries", href: "/#" },
            { name: "Smoothies", href: "/smothies" },
            { name: "Login", href: "/login" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex h-10 px-6 items-center justify-center rounded-full bg-surface-light hover:bg-gray-50 border border-gray-100 dark:bg-input-dark dark:border-none dark:hover:bg-opacity-80 text-text-muted font-bold text-sm transition-all active:scale-95 shadow-sm"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <button className="lg:hidden text-2xl text-primary">☰</button>
      </div>
    </nav>
  );
};

export default MainNav;
