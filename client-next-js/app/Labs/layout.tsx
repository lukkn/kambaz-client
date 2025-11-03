import { ReactNode } from "react";
import TOC from "./TOC";


export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="d-flex p-4">
      <div id="wd-author">
        <div><b>Name:</b> Karen Lu</div>
        <div  className="mb-4"><b>Section:</b> 05</div>
        <TOC />
      </div>
      <div className="flex-grow-1">{children}</div>
    </div>
  );
}
