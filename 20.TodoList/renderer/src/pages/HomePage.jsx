import {useEffect, useState} from "react";

export default function HomePage() {
    const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
        const res = await window.electronAPI.getTodos();

        setTodos(res);
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    const toggleComplete = async (todo) => {
        await window.electronAPI.updateTodo(todo.id, todo.title, !todo.completed);

        fetchTodos();
    }

    const handleDelete = async (id) => {
        await window.electronAPI.deleteTodo(id);

        fetchTodos();
    }

    return <div className="max-w-5xl mx-auto pt-20 flex flex-col">
        <h2 className="text-4xl font-bold mb-5 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent self-start">Fetched Todos</h2>

        <div className="flex flex-col gap-4">
            {todos.map((todo) => (
                <div className="flex bg-neutral-50 border border-neutral-200 rounded-md p-2 items-center justify-between" key={todo.id}>
                    {/*Content*/}
                    <div className="flex items-center gap-3">
                        <input type="checkbox" onClick={() => toggleComplete(todo)} checked={todo.completed === 1} className="w-5 h-5 rounded-xl" />
                        <h3 className="text-xl font-semibold">{todo.title}</h3>
                    </div>
                    {/*Actions*/}
                    <div className="flex items-center gap-4">
                        <button
                            className="px-5 py-2 rounded-md bg-red-500 text-neutral-50 text-md hover:bg-red-600 cursor-pointer"
                            onClick={() => handleDelete(todo.id)}
                        >Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
}
