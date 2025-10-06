import { ReactNode } from "react";
import TOC from "./TOC";


export default function LabsLayout({
 children,
}: Readonly<{ children: ReactNode }>) {
 return (
    <div className="d-flex p-4">
      <TOC />
      <div className="flex-grow-1">{children}</div>
    </div>
);}
