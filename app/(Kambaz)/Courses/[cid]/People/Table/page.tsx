import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
    const users = [
        {
            firstName: "Tony",
            lastName: "Stark",
            loginId: "001234561S",
            section: "S101",
            role: "STUDENT",
            lastActivity: "2020-10-01",
            totalActivity: "10:21:32"
        },
        {
            firstName: "Bruce",
            lastName: "Wayne",
            loginId: "001234562S",
            section: "S102",
            role: "STUDENT",
            lastActivity: "2020-10-02",
            totalActivity: "12:15:45"
        },
        {
            firstName: "Steve",
            lastName: "Rogers",
            loginId: "001234563S",
            section: "S103",
            role: "STUDENT",
            lastActivity: "2020-10-03",
            totalActivity: "15:30:10"
        },
        {
            firstName: "Natasha",
            lastName: "Romanoff",
            loginId: "001234564S",
            section: "S104",
            role: "STUDENT",
            lastActivity: "2020-10-04",
            totalActivity: "20:45:55"
        }
    ];
    return (
        <div id="wd-people-table">
            <Table striped>
                <thead>
                    <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
                </thead>
                <tbody>
                    {users.map((user, index) => <User key={index} {...user} />)}
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