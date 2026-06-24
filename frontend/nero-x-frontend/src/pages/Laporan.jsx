import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

export default function Laporan() {
  const [data, setData] = useState([]);
  const [totalPendapatan, setTotalPendapatan] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await api.get("/peminjaman");

      const peminjaman = Array.isArray(res.data)
        ? res.data
        : [];

      setData(peminjaman);

      const total = peminjaman.reduce((sum, item) => {
        return (
          sum +
          Number(
            item.total_biaya ||
              item.total_harga ||
              item.total_bayar ||
              0
          )
        );
      }, 0);

      setTotalPendapatan(total);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-red-500 mb-6">
        Laporan Transaksi
      </h1>

      <div className="bg-zinc-900 rounded-xl overflow-hidden">
        <table className="w-full text-white">
          <thead className="bg-zinc-800">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Penyewa</th>
              <th className="p-3">Ruangan</th>
              <th className="p-3">Mulai</th>
              <th className="p-3">Selesai</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.id_peminjaman}
                className="border-t border-zinc-800"
              >
                <td className="p-3">
                  {item.id_peminjaman}
                </td>

                <td className="p-3">
                  {item.nama_penyewa || "-"}
                </td>

                <td className="p-3">
                  {item.Ruangan?.nama_ruangan || "-"}
                </td>

                <td className="p-3">
                  {item.waktu_mulai
                    ? new Date(item.waktu_mulai).toLocaleTimeString(
                        "id-ID",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : "-"}
                </td>

                <td className="p-3">
                  {item.waktu_selesai
                    ? new Date(item.waktu_selesai).toLocaleTimeString(
                        "id-ID",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : "-"}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status_transaksi === "aktif"
                        ? "bg-green-600"
                        : "bg-zinc-700"
                    }`}
                  >
                    {item.status_transaksi}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-zinc-900 p-6 rounded-xl">
        <h2 className="text-xl font-bold text-green-500">
          Total Pendapatan
        </h2>

        <p className="text-3xl font-bold text-white mt-2">
          Rp {totalPendapatan.toLocaleString("id-ID")}
        </p>
      </div>
    </Layout>
  );
}