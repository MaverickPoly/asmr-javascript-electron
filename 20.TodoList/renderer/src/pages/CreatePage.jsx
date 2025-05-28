import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function CreatePage() {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title) {
            return alert("Please enter a valid title!");
        }

        const res = await window.electronAPI.addTodo(title);
        navigate("/");
    }

    return <div className="w-full min-h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col p-4 rounded-lg border border-neutral-300 shadow-md max-w-lg w-full gap-3">
            <h2 className="text-3xl font-bold mb-4 text-center">Create Todo</h2>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-3 rounded-md outline-none border border-neutral-200 focus:border-neutral-500 text-xl"
                placeholder="Title.."
            />

            <button className="p-2 mt-4 rounded-md bg-orange-500 hover:bg-orange-600 text-white cursor-pointer text-xl" type="submit">Create</button>
        </form>
    </div>
}