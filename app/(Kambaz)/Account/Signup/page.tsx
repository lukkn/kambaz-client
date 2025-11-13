"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
 
import { Form, FormControl, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";

import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();

  const signup = async () => {

    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    redirect("/Dashboard");
  };

  return (
    <div id="wd-signin-screen" className="w-25 p-4">
      <h3 className="mb-3">Signup</h3>
      <Form className="d-flex flex-column gap-2">
        <FormControl
          type="text"
          placeholder="username"
          className="wd-username mb-2"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <FormControl
          type="password"
          placeholder="password"
          className="wd-password mb-2"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button className="wd-signup-btn btn btn-info mb-2 w-100" onClick={signup}>Sign up</Button>
        <Link href="Signin" id="wd-signin-link"> Sign in </Link>
      </Form>
    </div>
  );
}
