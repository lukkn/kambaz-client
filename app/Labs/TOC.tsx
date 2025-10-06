/**
 * Table of Contents component for the Labs section.
 */
"use client";

import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {

  const pathname = usePathname();

  return (
    <Nav variant="pills" className="d-flex flex-column me-4" style={{ minWidth: "150px" }}>
      <NavItem>
        <NavLink href="/Labs" as={Link} className={`nav-link ${pathname.endsWith("Labs") ? "active" : ""}`}>Labs</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/Labs/Lab1" as={Link} className={`nav-link ${pathname.endsWith("Lab1") ? "active" : ""}`}>Lab 1</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/Labs/Lab2" as={Link} className={`nav-link ${pathname.endsWith("Lab2") ? "active" : ""}`}>Lab 2</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/Labs/Lab3" as={Link} className={`nav-link ${pathname.endsWith("Lab3") ? "active" : ""}`}>Lab 3</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/" as={Link}>Kambaz</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="https://github.com/lukkn/kambaz-cs5610">My GitHub</NavLink>
      </NavItem>
    </Nav>
  );
}
