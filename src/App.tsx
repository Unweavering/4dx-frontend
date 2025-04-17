// src/App.tsx
import { Routes, Route, Link } from "react-router-dom";
import WigListPage from "./pages/WigListPage";

function App() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-blue-600">4DX 목표 관리 앱</h1>

            {/* 네비게이션 (임시) */}
            <nav className="mb-6">
                <Link to="/wig" className="text-blue-500 underline">
                    WIG 목록 보기
                </Link>
            </nav>

            {/* 라우팅 */}
            <Routes>
                <Route path="/wig" element={<WigListPage />} />
                {/* 여기에 다른 페이지들도 차차 추가하면 됨 */}
            </Routes>
        </div>
    );
}

export default App;
