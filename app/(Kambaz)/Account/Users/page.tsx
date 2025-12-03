"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";
import { FormControl } from "react-bootstrap";

export default function Users() {
    const { uid } = useParams();
    const [users, setUsers] = useState<any[]>([]);
    const [role, setRole] = useState<string>("");
    const [name, setName] = useState<string>("");

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    const fetchUsersByRole = async (role: string) => {
        setRole(role);
        if (role) {
            const users = await client.findUsersByRole(role);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };

    const fetchUsersByName = async (partialName: string) => {
        setName(partialName);
        if (partialName) {
            const users = await client.findUsersByPartialName(partialName);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };

    const createUser = async () => {
        const user = await client.createUser({
            firstName: "New",
            lastName: `User${users.length + 1}`,
            username: `newuser${Date.now()}`,
            password: "password123",
            email: `email${users.length + 1}@neu.edu`,
            section: "S101",
            role: "STUDENT",
        });
        setUsers([...users, user]);
    }

    useEffect(() => {
        fetchUsers();
    }, [uid]);

    return (
        <div className="p-4">
            <h3>Users</h3>
            <button onClick={createUser} className="btn btn-danger mb-2 float-end wd-add-user">Add User</button>
            <FormControl onChange={e => fetchUsersByName(e.target.value)} placeholder="Search people" className="float-start w-25 me-2 wd-filter-by-name" />
            <select value={role} onChange={e => fetchUsersByRole(e.target.value)} className="form-select w-auto">
                <option value="">All Roles</option>
                <option value="STUDENT">Students</option>
                <option value="TA">Assistants</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Admins</option>
            </select>
            <PeopleTable users={users} fetchUsers={fetchUsers} />
        </div>
    );
}
