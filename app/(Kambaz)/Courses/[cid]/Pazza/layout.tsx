
import { ReactNode } from "react";
import PazzaNavigation from "./Navigation";
import Folders from "./Folders";
import Posts from "./Posts";

export default function PazzaLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div id="wd-pazza">
            <PazzaNavigation />
            <div className="d-flex flex-row">
                <Posts />
                <div>
                    <Folders />
                    <div className="wd-main-content-offset p-3 flex-fill">
                        {children}
                    </div>
                </div>
            </div>
        </div>

    );
}
