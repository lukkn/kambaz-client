import Link from "next/link";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import labs from "./labs";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <Nav className="d-flex flex-column">
        {labs.map((lab, index) => (
          <NavItem key={index}>
            <NavLink href={`/Labs/Lab${index + 1}`}>
              Lab {index + 1}: {lab}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </div>
  );
}
