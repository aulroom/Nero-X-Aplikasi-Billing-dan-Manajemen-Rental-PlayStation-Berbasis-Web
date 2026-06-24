import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

export default function Dashboard() {
  const [ruangan, setRuangan] = useState([]);
  const [peminjaman, setPeminjaman] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ruanganRes, peminjamanRes] = await Promise.all([
        api.get("/ruangan"),
        api.get("/peminjaman"),
      ]);

      setRuangan(ruanganRes.data || []);
      setPeminjaman(peminjamanRes.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const totalRuangan = ruangan.length;

  const ruanganDipakai = ruangan.filter(
    (r) => r.status === "dipakai"
  ).length;

  const transaksiAktif = peminjaman.filter(
    (p) => p.status_transaksi === "aktif"
  ).length;

  return (
    <Layout>
      <div className="space-y-6">

        {/* Welcome */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 p-8 rounded-2xl text-white">
          <h1 className="text-3xl font-bold">
            👋 Welcome back, Admin!
          </h1>

          <p className="mt-2 text-white/80">
            Sistem Rental PlayStation Nero-X siap digunakan.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-zinc-900 p-5 rounded-xl">
            <p className="text-zinc-400">Total Ruangan</p>
            <h2 className="text-2xl font-bold text-white">
              {totalRuangan}
            </h2>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl">
            <p className="text-zinc-400">Sedang Dipakai</p>
            <h2 className="text-2xl font-bold text-white">
              {ruanganDipakai}
            </h2>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl">
            <p className="text-zinc-400">Transaksi Aktif</p>
            <h2 className="text-2xl font-bold text-white">
              {transaksiAktif}
            </h2>
          </div>

        </div>

      </div>
    </Layout>
  );
}