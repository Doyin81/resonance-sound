"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { href: "/", label: "Explore" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About us" },
  { href: "/meet-awhizy", label: "Meet Awhizy" },
  { href: "/book", label: "Book a session" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    );
  }, []);

  function selectTheme(nextTheme) {
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);

    try {
      window.localStorage.setItem("rs-theme", nextTheme);
    } catch (error) {
      console.error("Unable to save the color theme preference.", error);
    }
  }

  return (
    <header>
      <div className="wrap">
        <Link className="brand" href="/" aria-label="Resonance Sound home">
          <img className="logo-on-light" src="/assets/resonance-logo-animated-light.svg" alt="Resonance Sound by Awhizy" width="150" height="40" />
          <img className="logo-on-dark" src="/assets/resonance-logo-animated-dark.svg" alt="Resonance Sound by Awhizy" width="150" height="40" />
        </Link>
        <nav aria-label="Main">
          {navigation.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="theme-toggle" role="group" aria-label="Color theme">
          <button type="button" aria-pressed={theme === "light"} onClick={() => selectTheme("light")}>
            Light
          </button>
          <button type="button" aria-pressed={theme === "dark"} onClick={() => selectTheme("dark")}>
            Dark
          </button>
        </div>
      </div>
    </header>
  );
}
