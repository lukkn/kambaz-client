"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import PeopleTable from "./Table";

import * as client from "../client";

export default function PeoplePage() {

    const { cid } = useParams();
    const [users, setUsers] = useState<any[]>([]);

    const fetchUsers = async () => {
        const fetchedUsers = await client.findUsersForCourse(cid as string);
        setUsers(fetchedUsers);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <PeopleTable users={users} fetchUsers={fetchUsers}/>
    )
}