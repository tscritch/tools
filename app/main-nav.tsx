"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const MainNav = () => {
  const pathname = usePathname();

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
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
