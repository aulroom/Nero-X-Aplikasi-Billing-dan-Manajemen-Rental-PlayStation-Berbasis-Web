import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

export default function Peminjaman() {
  const [ruangan, setRuangan] = useState([]);
  const [peminjaman, setPeminjaman] = useState([]);

  const [form, setForm] = useState({
    id_ruangan: "",
    nama_penyewa: "",
    waktu_mulai: "",
    waktu_selesai: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const ruanganRes = await api.get("/ruangan");
      const peminjamanRes = await api.get("/peminjaman");

      setRuangan(ruanganRes.data || []);
      setPeminjaman(peminjamanRes.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    try {
      await api.post("/peminjaman", {
        id_ruangan: Number(form.id_ruangan),
        nama_penyewa: form.nama_penyewa,
        waktu_mulai: form.waktu_mulai
          ? `${today} ${form.waktu_mulai}:00`
          : null,
        waktu_selesai: form.waktu_selesai
          ? `${today} ${form.waktu_selesai}:00`
          : null,
      });

      setForm({
        id_ruangan: "",
        nama_penyewa: "",
        waktu_mulai: "",
        waktu_selesai: "",
      });

      loadData();
      alert("Peminjaman berhasil");
    } catch (err) {
      console.log(err);
      alert("Gagal menyimpan");
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = window.confirm(
      "Yakin ingin menghapus data ini?"
    );

    if (!konfirmasi) return;

    try {
      await api.delete(`/peminjaman/${id}`);
      loadData();
    } catch (err) {
      console.log(err);
      alert("Gagal menghapus data");
    }
  };

  // 🔥 TAMBAHAN BARU: SELESAI PEMINJAMAN
  const handleSelesai = async (id) => {
    const konfirmasi = window.confirm(
      "Selesaikan peminjaman ini?"
    );

    if (!konfirmasi) return;

    try {
      await api.put(`/peminjaman/selesai/${id}`);
      loadData();
    } catch (err) {
      console.log(err);
      alert("Gagal menyelesaikan peminjaman");
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-red-500 mb-6">
        Manajemen Peminjaman
      </h1>

      <div className="bg-zinc-900 p-6 rounded-xl mb-6">
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-4 gap-4"
        >
          <select
            value={form.id_ruangan}
            onChange={(e) =>
              setForm({
                ...form,
                id_ruangan: e.target.value,
              })
            }
            className="bg-zinc-800 text-white p-3 rounded"
          >
            <option value="">Pilih Ruangan</option>

            {ruangan.map((r) => (
              <option
                key={r.id_ruangan}
                value={r.id_ruangan}
              >
                {r.nama_ruangan}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Nama Penyewa"
            value={form.nama_penyewa}
            onChange={(e) =>
              setForm({
                ...form,
                nama_penyewa: e.target.value,
              })
            }
            className="bg-zinc-800 text-white p-3 rounded"
          />

          <input
            type="time"
            value={form.waktu_mulai}
            onChange={(e) =>
              setForm({
                ...form,
                waktu_mulai: e.target.value,
              })
            }
            className="bg-zinc-800 text-white p-3 rounded"
          />

          <input
            type="time"
            value={form.waktu_selesai}
            onChange={(e) =>
              setForm({
                ...form,
                waktu_selesai: e.target.value,
              })
            }
            className="bg-zinc-800 text-white p-3 rounded"
          />

          <button
            type="submit"
            className="md:col-span-4 bg-red-600 hover:bg-red-700 text-white p-3 rounded"
          >
            Simpan
          </button>
        </form>
      </div>

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
              <th className="p-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {peminjaman.length > 0 ? (
              peminjaman.map((item) => (
                <tr
                  key={item.id_peminjaman}
                  className="border-t border-zinc-800"
                >
                  <td className="p-3">
                    {item.id_peminjaman}
                  </td>

                  <td className="p-3">
                    {item.nama_penyewa}
                  </td>

                  <td className="p-3">
                    {item.Ruangan?.nama_ruangan || "-"}
                  </td>

                  <td className="p-3">
                    {item.waktu_mulai
                      ? new Date(
                          item.waktu_mulai
                        ).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </td>

                  <td className="p-3">
                    {item.waktu_selesai
                      ? new Date(
                          item.waktu_selesai
                        ).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
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

                  <td className="p-3 flex gap-2">
                    {item.status_transaksi === "aktif" && (
                      <button
                        onClick={() =>
                          handleSelesai(item.id_peminjaman)
                        }
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                      >
                        Selesai
                      </button>
                    )}

                    <button
                      onClick={() =>
                        handleDelete(item.id_peminjaman)
                      }
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-6 text-zinc-400"
                >
                  Belum ada data peminjaman
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}