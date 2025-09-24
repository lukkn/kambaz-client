/**
 * Table of Contents component for the Labs section.
 */

import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
export default function TOC() {
 return (
   <Nav variant="pills">
     <NavItem>
       <NavLink id="wd-labs-link" href="/Labs" as={Link}>Labs</NavLink>
     </NavItem>
     <NavItem>
       <NavLink id="wd-lab1-link" href="/Labs/Lab1" as={Link}>Lab 1</NavLink>
     </NavItem>
     <NavItem>
       <NavLink id="wd-lab-link" href="/Labs/Lab2" as={Link}>Lab 2</NavLink>
     </NavItem>
     <NavItem>
       <NavLink id="wd-lab3-link" href="/Labs/Lab3" as={Link}>Lab 3</NavLink>
     </NavItem>
     <NavItem>
       <NavLink id="wd-kambaz-link" href="/" as={Link}>Kambaz</NavLink>
     </NavItem>
     <NavItem>
       <NavLink id="wd-github" href="https://github.com/lukkn/kambaz-cs5610">GitHub</NavLink>
     </NavItem>
   </Nav>
);}
