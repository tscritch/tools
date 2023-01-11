"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "../components/sidebar";

export const MainNav = () => {
  const pathname = usePathname();

  return (
    <Sidebar.Root>
      <Sidebar.Content className="p-2">
        <h1 className="text-sm">Tad's Tools</h1>
        {links.map(({ name, href }) => (
          <Link key={name} href={href} className="text-djent-900 no-underline">
            <Sidebar.ListItem active={href === pathname}>
              {name}
            </Sidebar.ListItem>
          </Link>
        ))}
      </Sidebar.Content>
    </Sidebar.Root>
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
