
import { ReactNode } from "react";
import PazzaNavigation from "./Navigation";
import Folders from "./Folders";
import Posts from "./Posts";

export default function PazzaLayout({ children }: Readonly<{ children: ReactNode }>) {


    return (
        <div id="wd-pazza">
            <PazzaNavigation />
            <div>
                {children}
            </div>

        </div>

    );
}
