
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
                <div className="flex-grow-1">
                    <Folders />
                    <div className="p-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>

    );
}
