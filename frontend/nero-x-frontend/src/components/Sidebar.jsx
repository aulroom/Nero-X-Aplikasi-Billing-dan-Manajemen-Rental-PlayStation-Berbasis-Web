import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  DoorOpen,
  Package,
  ClipboardList,
  FileText,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Ruangan",
      path: "/ruangan",
      icon: <DoorOpen size={20} />,
    },
    {
      name: "Barang",
      path: "/barang",
      icon: <Package size={20} />,
    },
    {
      name: "Peminjaman",
      path: "/peminjaman",
      icon: <ClipboardList size={20} />,
    },
    {
      name: "Laporan",
      path: "/laporan",
      icon: <FileText size={20} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-zinc-950 border-r border-zinc-800 min-h-screen p-5">
      <h1 className="text-3xl font-bold text-red-500 mb-10">
        NERO-X
      </h1>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-red-600 text-white"
                : "text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 mt-10 w-full rounded-lg bg-red-600 hover:bg-red-700 text-white"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
}