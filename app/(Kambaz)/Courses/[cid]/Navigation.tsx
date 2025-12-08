"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";


export default function CourseNavigation() {

  const { cid } = useParams();
  const pathname = usePathname();
  const links = ["Home", "Modules", "Pazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const href = `/Courses/${cid}/${link}`;
        const isActive = pathname.includes(link);
        return (
          <Link key={link} href={href} id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border-0 ${isActive ? "active" : "text-danger"}`}> {link} </Link>
        );
      })}

    </div>
);}
