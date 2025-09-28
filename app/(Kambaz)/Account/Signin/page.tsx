import Link from "next/link";
import { Form, FormControl, Button } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="w-25 p-4">
      <h3 className="mb-3">Signin</h3>
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
        <Link href="/Dashboard">
          <Button variant="info" id="wd-signin-btn" className="mb-2 w-100">
            Sign in
          </Button>
        </Link>
        <Link href="Signup" id="wd-signup-link"> Sign up </Link>
      </Form>
    </div>
  );
}
