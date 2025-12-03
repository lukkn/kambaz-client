"use client";

import { current } from "@reduxjs/toolkit";
import { usePathname } from "next/navigation";
import { Nav, NavLink } from "react-bootstrap";

import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const pathname = usePathname();

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    currentUser ? <AuthedLinks /> : <UnauthedLinks />
  );


  function UnauthedLinks() {
    return (
      <Nav id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
        <NavLink href="/Account/Signin" className={`list-group-item border-0 ${pathname.includes("/Account/Signin") ? "active" : "text-danger"}`}>
          Signin
        </NavLink>
        <NavLink href="/Account/Signup" className={`list-group-item border-0 ${pathname.includes("/Account/Signup") ? "active" : "text-danger"}`}>
          Signup
        </NavLink>
      </Nav>
    )
  }

  function AuthedLinks() {
    return (
      <Nav id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
        <NavLink href="/Account/Profile" className={`list-group-item border-0 ${pathname.includes("/Account/Profile") ? "active" : "text-danger"}`}>
          Profile
        </NavLink>
        { currentUser?.role === "ADMIN" &&
          <NavLink href="/Account/Users" className={`list-group-item border-0 ${pathname.includes("/Account/Users") ? "active" : "text-danger"}`}>
            Users
          </NavLink>
        }

      </Nav>
    )
  }
}
