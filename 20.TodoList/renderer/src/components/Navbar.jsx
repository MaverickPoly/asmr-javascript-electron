import {Link} from "react-router-dom";

export default function Navbar() {
    return <nav className="fixed top-2 left-2 flex flex-col gap-2 items-center">
        <Link to="/" className="bg-white shadow-md rounded-md px-4 py-2 hover:bg-neutral-50">Home</Link>
        <Link to="/create" className="bg-white shadow-md rounded-md px-4 py-2 hover:bg-neutral-50">Create</Link>
    </nav>
}
