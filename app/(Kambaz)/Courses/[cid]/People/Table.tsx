"use client";

import { useState } from "react";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

import Link from "next/link";

import PeopleDetails from "./Details";

export default function PeopleTable({ users = [], fetchUsers }: { users?: any[], fetchUsers?: () => void }) {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [showUserId, setShowUserId] = useState<string | null>(null);

    return (
        <div id="wd-people-table">
            {showDetails && (
                <PeopleDetails
                    uid={showUserId}
                    onClose={() => {
                        setShowDetails(false);
                        fetchUsers?.();
                    }}
                />
            )
            }
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

    function User({ _id, firstName, lastName, loginId, section, role, lastActivity, totalActivity }:
        { _id: string; firstName: string; lastName: string; loginId: string; section: string; role: string; lastActivity: string; totalActivity: string }) {
        return (
            <tr>
                <td className="wd-full-name text-nowrap">
                    <span className="text-decoration-none link-danger" role="button"
                        onClick={() => {
                            setShowDetails(true);
                            setShowUserId(_id);
                        }} >
                        <FaUserCircle className="me-2 fs-1 text-dark" />
                        <span className="wd-first-name">{firstName}</span>{" "}
                        <span className="wd-last-name">{lastName}</span>
                    </span>
                </td>
                <td className="wd-login-id">{loginId}</td>
                <td className="wd-section">{section}</td>
                <td className="wd-role">{role}</td>
                <td className="wd-last-activity">{lastActivity}</td>
                <td className="wd-total-activity">{totalActivity}</td>
            </tr>
        );
    }
}