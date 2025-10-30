"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { Form, FormControl, Button } from "react-bootstrap";

import * as db from "../../Database";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({username: "iron_man", password: "stark123"});
  const dispatch = useDispatch();

  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) {
      alert("Invalid username or password");
      return;
    }
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };

  return (
    <div id="wd-signin-screen" className="w-25 p-4">
      <h3 className="mb-3">Signin</h3>
      <Form className="d-flex flex-column gap-2">
        <FormControl
          type="text"
          className="wd-username mb-2"
          placeholder="username"
          defaultValue={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <FormControl
          type="password"
          className="wd-password mb-2"
          placeholder="password"
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          defaultValue={credentials.password}
        />
        <Button variant="info" id="wd-signin-btn" className="mb-2 w-100" onClick={signin}>
          Sign in
        </Button>
        <Link href="Signup" id="wd-signup-link"> Sign up </Link>
      </Form>
    </div>
  );
}
