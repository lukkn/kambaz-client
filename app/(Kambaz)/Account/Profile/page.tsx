import Link from "next/link";
import { Button, Form, FormControl, FormSelect } from "react-bootstrap";
export default function Profile() {
  return (
    <div id="wd-profile-screen" className="w-25 p-4">
      <h3>Profile</h3>
      <Form className="d-flex flex-column gap-2">
        <FormControl defaultValue="alice" placeholder="username" className="wd-username" />
        <FormControl defaultValue="123" placeholder="password" type="password" className="wd-password" />
        <FormControl defaultValue="Alice" placeholder="First Name" id="wd-firstname" />
        <FormControl defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" />
        <FormControl defaultValue="2000-01-01" type="date" id="wd-dob" />
        <FormControl defaultValue="alice@wonderland" type="email" id="wd-email" />
        <FormSelect defaultValue="USER" id="wd-role">
          <option value="USER">User</option>       <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option> <option value="STUDENT">Student</option>
        </FormSelect>
        <Link href="Signin">
          <Button variant="danger" className="mb-2 w-100">Sign out</Button>
        </Link>
      </Form>
    </div>
  );
}
