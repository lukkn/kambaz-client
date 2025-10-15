"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  const links = [
    { label: "Signin", path: "/Account/Signin" },
    { label: "Signup", path: "/Account/Signup" },
    { label: "Profile", path: "/Account/Profile" },
  ];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map(({ label, path }) => (
        <Link
          key={path}
          href={path}
          className={`list-group-item border-0 ${
            pathname.includes(path) ? "active" : "text-danger"
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}