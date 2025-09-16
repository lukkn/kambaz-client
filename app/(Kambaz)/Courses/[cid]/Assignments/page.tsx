import Link from "next/link";

export default function Assignments() {
    return (
        <div id="wd-assignments">
            <input placeholder="Search for Assignments"
                id="wd-search-assignment" />
            <button id="wd-add-assignment-group">+ Group</button>
            <button id="wd-add-assignment">+ Assignment</button>
            <section id="wd-assignments">
                <h3 id="wd-assignments-title">
                    ASSIGNMENTS 40% of Total <button>+</button>
                </h3>
                <ul id="wd-assignment-list">
                    <li className="wd-assignment-list-item">
                        <Link href="/Courses/1234/Assignments/123"
                            className="wd-assignment-link" >
                            A1 - ENV + HTML
                        </Link>
                        <p>
                            <span>Multiple Modules</span> |
                            <span> <b>Not available until</b> May 6 at 12:00am</span> |
                            <span> <b>Due</b> May 13 at 11:59pm</span> |
                            <span> 100 pts</span>
                        </p>
                    </li>
                    <li className="wd-assignment-list-item">
                        <Link href="/Courses/1234/Assignments/123"
                            className="wd-assignment-link" >
                            A2 - CSS + BOOTSTRAP
                        </Link>
                        <p>
                            <span>Multiple Modules</span> |
                            <span> <b>Not available until</b> May 13 at 12:00am</span> |
                            <span> <b>Due</b> May 20 at 11:59pm</span> |
                            <span> 100 pts</span>
                        </p>
                    </li>
                    <li className="wd-assignment-list-item">
                        <Link href="/Courses/1234/Assignments/123"
                            className="wd-assignment-link" >
                            A3 - JAVASCRIPT + REACT
                        </Link>
                        <p>
                            <span>Multiple Modules</span> |
                            <span> <b>Not available until</b> May 20 at 12:00am</span> |
                            <span> <b>Due</b> May 27 at 11:59pm</span> |
                            <span> 100 pts</span>
                        </p>
                    </li>
                </ul>
            </section>
            <section id="wd-quizzes">
                <h3 id="wd-quizzes-title">
                    QUIZZES 20% of Total <button>+</button>
                </h3>
            </section>
            <section id="wd-exams">
                <h3 id="wd-exams-title">
                    EXAMS 30% of Total <button>+</button>
                </h3>
            </section>
            <section id="wd-projects">
                <h3 id="wd-projects-title">
                    PROJECTS 10% of Total <button>+</button>
                </h3>
            </section>
        </div >
    );
}
