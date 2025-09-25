import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus, FaCircleCheck } from "react-icons/fa6";
import { AiOutlineStop } from "react-icons/ai";
export default function ModulesControls() {
    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <Button variant="danger" className="me-1 float-end" id="wd-add-module-btn">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Module
            </Button>
            <Dropdown className="float-end me-2">
                <DropdownToggle variant="secondary"id="wd-publish-all-btn">
                    <FaCircleCheck fill="green" stroke="white" /> Publish All
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem id="wd-publish-all-modules-and-items">
                        <FaCircleCheck fill="green" stroke="white" /> Publish all modules and items
                    </DropdownItem>
                    <DropdownItem id="wd-publish-modules-only">
                        <FaCircleCheck fill="green" stroke="white" /> Publish modules only
                    </DropdownItem>
                    <DropdownItem id="wd-unpublish-all-modules-and-items">
                        <AiOutlineStop /> Unpublish all modules and items
                    </DropdownItem>
                    <DropdownItem id="wd-unpublish-modules-only">
                        <AiOutlineStop /> Unpublish modules only
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Button variant="secondary"  className="me-1 float-end" id="wd-view-progress">
                View Progress
            </Button>
            <Button variant="secondary" className="me-1 float-end" id="wd-collapse-all">
                Collapse All
            </Button>
            {/* Implement the View Progress and Collapse All buttons with IDs wd-view-progress and wd-collapse-all */}
        </div>
    );
}