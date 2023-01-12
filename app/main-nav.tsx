"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export const MainNav: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="drawer drawer-mobile">
      <input id="main-nav-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <div className="navbar bg-base-300 lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="main-nav-drawer"
              className="btn btn-primary btn-xs drawer-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          {/* <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
  </div> */}
        </div>

        {children}
      </div>

      <div className="drawer-side">
        <label htmlFor="main-nav-drawer" className="drawer-overlay"></label>
        <aside className="bg-base-300 w-48">
          <ul className="menu menu-compact p-0 px-4 space-y-1">
            {links.map(({ name, href }) => (
              <li>
                <Link
                  key={name}
                  href={href}
                  className={pathname === href ? "active" : ""}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Tadoos",
    href: "/tadoos",
  },
  {
    name: "UUIDs",
    href: "/uuids",
  },
];
