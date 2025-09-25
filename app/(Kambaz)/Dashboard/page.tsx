import CourseCard from "../Courses/CourseCard";
import { Row } from "react-bootstrap";

export default function Dashboard() {

  const courses = [
    { code: "MR5010", title: "Distribution of Dolphins", description: "This course explores the various species of dolphins, their habitats, behaviors, and conservation efforts.", image: "/images/dolphin.jpg" },
    { code: "MR5020", title: "Biology of Pufferfishes", description: "This course delves into the unique biological characteristics of pufferfishes, including their defense mechanisms and ecological roles.", image: "/images/pufferfish.jpg" },
    { code: "MR5030", title: "Anatomy of Seals", description: "This course examines the anatomical features of seals, focusing on their adaptations to marine environments.", image: "/images/seal.jpg" },
    { code: "MR5040", title: "Evolution of Sharks", description: "This course traces the evolutionary history of sharks, exploring their diversity and survival strategies over millions of years.", image: "/images/shark.jpg" },
    { code: "MR5050", title: "Ecology of Starfishes", description: "This course investigates the ecological roles of starfishes in marine ecosystems, including their interactions with other species.", image: "/images/starfish.jpg" },
    { code: "MR5060", title: "Diversity of Stingrays", description: "This course explores the diversity of stingrays, their habitats, behaviors, and the challenges they face in the wild.", image: "/images/stingray.jpg" },
    { code: "MR5070", title: "Diet of Sea Turtles", description: "This course examines the dietary habits of sea turtles, their foraging behaviors, and nutritional needs.", image: "/images/turtle.jpg" }
  ]

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <main className="px-4 py-2">
        <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
        <div id="wd-dashboard-courses">
          <Row xs={1} md={5} className="g-4 width-100">
            {courses.map((course) => (
              <CourseCard key={course.code} course={course} />
            ))}
          </Row>
        </div>
      </main>
    </div >
  );
}
