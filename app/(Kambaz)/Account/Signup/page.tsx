import Link from "next/link";
import { Form, FormControl, Button } from "react-bootstrap";

export default function Signup() {
    return (
    <div id="wd-signin-screen" className="w-25 p-4">
      <h3 className="mb-3">Signup</h3>
      <Form className="d-flex flex-column gap-2">
        <FormControl
          type="text"
          placeholder="username"
          className="wd-username mb-2"
        />
        <FormControl
          type="password"
          placeholder="password"
          className="wd-password mb-2"
        />
        <FormControl
          type="password"
          placeholder="verify password"
          className="wd-password-verify mb-2"
        />
        <Link href="Profile">
          <Button variant="info" type="submit" id="wd-signup-btn" className="mb-2 w-100">
            Sign up
          </Button>
        </Link>
        <Link href="Signin" id="wd-signin-link"> Sign in </Link>
      </Form>
    </div>
  );
}
