"use client";
import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Button, FormControl, FormLabel } from "react-bootstrap";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchProfile = () => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  };
  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="wd-profile-screen w-25">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormLabel htmlFor="wd-username" className="mt-2 small fw-bold">Username</FormLabel>
          <FormControl id="wd-username" className="mb-2"
            defaultValue={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />

          <FormLabel htmlFor="wd-password" className="mt-2 small fw-bold">Password</FormLabel>
          <FormControl id="wd-password" className="mb-2"
            defaultValue={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />

          <FormLabel htmlFor="wd-firstname" className="mt-2 small fw-bold">First Name</FormLabel>
          <FormControl id="wd-firstname" className="mb-2"
            defaultValue={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />

          <FormLabel htmlFor="wd-lastname" className="mt-2 small fw-bold">Last Name</FormLabel>
          <FormControl id="wd-lastname" className="mb-2"
            defaultValue={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />

          <FormLabel htmlFor="wd-dob" className="mt-2 small fw-bold">Date of Birth</FormLabel>
          <FormControl id="wd-dob" className="mb-2" type="date"
            defaultValue={profile.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />

          <FormLabel htmlFor="wd-email" className="mt-2 small fw-bold">Email</FormLabel>
          <FormControl id="wd-email" className="mb-2"
            defaultValue={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })} />

          <FormLabel htmlFor="wd-role" className="mt-2 small fw-bold">Role</FormLabel>
          <select className="form-control mb-2" id="wd-role" value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })} >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>{" "}
            <option value="STUDENT">Student</option>
          </select>
          <Button onClick={signout} variant="danger" className="w-100 my-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
