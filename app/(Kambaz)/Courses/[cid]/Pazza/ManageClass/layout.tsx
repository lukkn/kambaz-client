import { Nav } from "react-bootstrap";
import ManageClassNavigation from "./Navigation";

export default function ManageClassLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div id="wd-pazza-manage-class">
            <ManageClassNavigation />
            {children}
        </div>
    );
}   
