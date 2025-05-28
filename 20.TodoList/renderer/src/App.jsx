import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";

export default function App() {
    return <BrowserRouter>
        <Navbar />

        <main className="max-w-[85%] mx-auto">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
            </Routes>
        </main>
    </BrowserRouter>
}
