import Link from "next/link";
export default function Signin() {
 return (
   <div id="wd-signin-screen">
     <h3>Sign in</h3>
     <input placeholder="username" className="wd-username" /> <br />
     <input placeholder="password" type="password" className="wd-password" /> <br />
     <button><Link href="Profile" id="wd-signin-btn"> Sign in </Link></button> <br />
     <Link href="Signup" id="wd-signup-link"> Sign up </Link>
   </div>
);}
