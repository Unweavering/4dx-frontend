import { Routes, Route, Link } from "react-router-dom";
import WigListPage from "./pages/WigListPage";
import LoginPage from "./pages/LoginPage"; // ⬅️ 추가

function App() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-blue-600">4DX 목표 관리 앱</h1>

            <nav className="mb-6">
                <Link to="/login" className="text-blue-500 underline mr-4">로그인</Link>
                <Link to="/wig" className="text-blue-500 underline">WIG 목록 보기</Link>
            </nav>

            <Routes>
                <Route path="/login" element={<LoginPage />} /> {/* ⬅️ 추가 */}
                <Route path="/wig" element={<WigListPage />} />
            </Routes>
        </div>
    );
}

export default App;
