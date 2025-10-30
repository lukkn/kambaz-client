"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const pathname = usePathname();

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const links = currentUser ? 
  [
    { label: "Profile", path: "/Account/Profile" },
  ] :
  [
    { label: "Signin", path: "/Account/Signin" },
    { label: "Signup", path: "/Account/Signup" },
  ];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map(({ label, path }) => (
        <Link
          key={path}
          href={path}
          className={`list-group-item border-0 ${pathname.includes(path) ? "active" : "text-danger"
            }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}