import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/dolphin.jpg" alt="react" width={200} height={150} />
            <div>
              <h5> MR501</h5>
              <p className="wd-dashboard-course-title">
                Distribution of Dolphins {" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/pufferfish.jpg" alt="react" width={200} height={150} />
            <div>
              <h5> MR502</h5>
              <p className="wd-dashboard-course-title">
                Biology of Pufferfishes {" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/seal.jpg" alt="react" width={200} height={150} />
            <div>
              <h5> MR503</h5>
              <p className="wd-dashboard-course-title">
                Anatomy of Seals {" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/shark.jpg" alt="react" width={200} height={150} />
            <div>
              <h5> MR504</h5>
              <p className="wd-dashboard-course-title">
                Evolution of Sharks {" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/starfish.jpg" alt="react" width={200} height={150} />
            <div>
              <h5> MR505</h5>
              <p className="wd-dashboard-course-title">
                Ecology of Starfishes {" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/stingray.jpg" alt="react" width={200} height={150} />
            <div>
              <h5> MR506</h5>
              <p className="wd-dashboard-course-title">
                Diversity of Stingrays {" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/turtle.jpg" alt="react" width={200} height={150} />
            <div>
              <h5> MR507</h5>
              <p className="wd-dashboard-course-title">
                Diet of Sea Turtles {" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
