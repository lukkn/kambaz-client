
import { ReactNode } from "react";
import PazzaNavigation from "./Navigation";

export default function PazzaLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (

        <div id="wd-pazza">
            <div>
                <PazzaNavigation />
            </div>
            <div className="wd-main-content-offset p-3 flex-fill">
                {children}
            </div>
        </div>

    );
}
