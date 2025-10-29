import { useState } from "react";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus, FaCircleCheck } from "react-icons/fa6";
import { AiOutlineStop } from "react-icons/ai";
import ModuleEditor from "./ModuleEditor";


export default function ModulesControls(
    { moduleName, setModuleName, addModule }:
        { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <Button variant="danger" className="me-1 float-end" id="wd-add-module-btn" onClick={handleShow}>
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Module
            </Button>
            <Dropdown className="float-end me-2">
                <DropdownToggle variant="secondary" id="wd-publish-all-btn">
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
            <Button variant="secondary" className="me-1 float-end" id="wd-view-progress">
                View Progress
            </Button>
            <Button variant="secondary" className="me-1 float-end" id="wd-collapse-all">
                Collapse All
            </Button>
            <ModuleEditor show={show} handleClose={handleClose} dialogTitle="Add Module"
                moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} />
        </div>
    );
}