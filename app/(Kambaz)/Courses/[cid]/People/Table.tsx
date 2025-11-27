"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable( { users = [], fetchUsers }: { users?: any[], fetchUsers?: () => void } ) {


    return (
        <div id="wd-people-table" className="p-4">
            <Table striped>
                <thead>
                    <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
                </thead>
                <tbody>
                    {users.map((user, index) => user && <User key={index} {...user} />)}
                </tbody>
            </Table>
        </div>
    );
}

function  User({ firstName, lastName, loginId, section, role, lastActivity, totalActivity }:
    { firstName: string; lastName: string; loginId: string; section: string; role: string; lastActivity: string; totalActivity: string }) {
    return (
        <tr>
            <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-dark" />
                <span className="wd-first-name">{firstName}</span>{" "}
                <span className="wd-last-name">{lastName}</span>
            </td>
            <td className="wd-login-id">{loginId}</td>
            <td className="wd-section">{section}</td>
            <td className="wd-role">{role}</td>
            <td className="wd-last-activity">{lastActivity}</td>
            <td className="wd-total-activity">{totalActivity}</td>
        </tr>
    );
}