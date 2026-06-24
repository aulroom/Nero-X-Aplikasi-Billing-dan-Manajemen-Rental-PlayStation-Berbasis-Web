import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Ruangan from "./pages/Ruangan";
import Barang from "./pages/Barang";
import Peminjaman from "./pages/Peminjaman";
import Laporan from "./pages/Laporan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ruangan" element={<Ruangan />} />
        <Route path="/barang" element={<Barang />} />
        <Route path="/peminjaman" element={<Peminjaman />} />
        <Route path="/laporan" element={<Laporan />} />

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;