import { Button } from "react-bootstrap";
import { FiPlusCircle, FiMenu } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaChevronDown, FaSquare } from "react-icons/fa6";
import { LuPin } from "react-icons/lu";

export default function Posts() {
    const posts = [
        {
            id: 1,
            title: "Welcome to Piazza!",
            content: "This is the first post on Piazza.",
            user: "Admin",
            date: "2024-01-01",
        },
        {
            id: 2,
            title: "How to use Piazza",
            content: "Here are some tips on how to use Piazza effectively.",
            user: "Instructor",
            date: "2024-01-02",
        },
        {
            id: 3,
            title: "Piazza Features",
            content: "Explore the various features available on Piazza.",
            user: "Moderator",
            date: "2024-01-03",
        },
        {
            id: 4,
            title: "Getting Help",
            content: "If you need help, feel free to ask questions here.",
            user: "Support",
            date: "2024-01-04",
        },
        {
            id: 5,
            title: "Community Guidelines",
            content: "Please adhere to our community guidelines while posting.",
            user: "Admin",
            date: "2024-01-05",
        },
        {
            id: 6,
            title: "Upcoming Features",
            content: "Stay tuned for upcoming features on Piazza.",
            user: "Product Team",
            date: "2024-01-06",
        }
        
    ]; // Placeholder for posts data

    const categories = ["PINNED", "TODAY", "YESTERDAY", "LAST WEEK", "EARLIER"];

    return (
        <div className="p-3" style={{ width: '400px' }}>
            <div className="d-flex flex-row gap-2 mb-3">
                <Button className="w-50 bg-pazza-primary text-white d-flex align-items-center justify-content-center border-0">
                    <FiPlusCircle className="me-2" />
                    New Post
                </Button>
                <div className="d-flex align-items-center justify-content-center gap-2 border px-2 rounded-3">
                    <IoSearch />
                    <input type="text" placeholder="Search posts..." className="form-control border-0 shadow-none p-0" />
                </div>
            </div>
            <div className="border rounded-3 h-100">
                <div className="text-pazza-primary">
                    <FiMenu className="m-3" />
                    All Posts
                    <BsThreeDotsVertical className="m-3 float-end" />
                </div>
                <div>
                    <div className="bg-pazza-light border">
                        <FaChevronDown className="m-2" />
                        Pinned
                        <LuPin className="m-2 float-end" />
                    </div>
                    {posts.map((post) => (
                        <div key={post.id} className="p-3 border-bottom">
                            <div className="d-flex align-items-center gap-2 mb-1">
                                <div className="bg-pazza-light p-1 rounded-2"><FaSquare color="#ffc008" className="me-2"/>Instr</div>
                                <div className="fs-6 fw-bold">{post.title}</div> 
                                <div className="fs-6 ms-auto">{post.date}</div>
                            </div>
                            <div className="text-pazza-dark">{post.content}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}