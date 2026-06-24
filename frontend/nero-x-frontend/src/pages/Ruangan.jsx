import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

export default function Ruangan() {
  const [ruangan, setRuangan] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    nama_ruangan: "",
    jenis_ps: "",
    tarif_per_jam: "",
    status: "kosong",
  });

  const getRuangan = async () => {
    try {
      const res = await api.get("/ruangan");
      setRuangan(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRuangan();
  }, []);

  const handleEdit = (item) => {
    setEditId(item.id_ruangan);

    setForm({
      nama_ruangan: item.nama_ruangan || "",
      jenis_ps: item.jenis_ps || "",
      tarif_per_jam: item.tarif_per_jam || "",
      status: item.status || "kosong",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 VALIDASI WAJIB BIAR GAK ADA DATA KOSONG MASUK
    if (!form.nama_ruangan || !form.jenis_ps || !form.tarif_per_jam) {
      alert("Semua field wajib diisi!");
      return;
    }

    try {
      const payload = {
        nama_ruangan: form.nama_ruangan.trim(),
        jenis_ps: form.jenis_ps,
        tarif_per_jam: Number(form.tarif_per_jam),
        status: form.status?.trim() ? form.status : "kosong",
      };

      if (editId) {
        await api.put(`/ruangan/${editId}`, payload);
      } else {
        await api.post("/ruangan", payload);
      }

      setForm({
        nama_ruangan: "",
        jenis_ps: "",
        tarif_per_jam: "",
        status: "kosong",
      });

      setEditId(null);
      getRuangan();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Gagal menyimpan data");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus ruangan ini?")) return;

    try {
      await api.delete(`/ruangan/${id}`);
      getRuangan();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-red-500 mb-6">
        Manajemen Ruangan
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-xl mb-6">
        <div className="grid md:grid-cols-4 gap-4">

          <input
            placeholder="Nama Ruangan"
            value={form.nama_ruangan}
            onChange={(e) =>
              setForm({ ...form, nama_ruangan: e.target.value })
            }
            className="bg-zinc-800 text-white p-3 rounded"
          />

          <select
            value={form.jenis_ps}
            onChange={(e) =>
              setForm({ ...form, jenis_ps: e.target.value })
            }
            className="bg-zinc-800 text-white p-3 rounded"
          >
            <option value="">Pilih PS</option>
            <option value="PS4">PS4</option>
            <option value="PS5">PS5</option>
          </select>

          <input
            type="number"
            placeholder="Tarif per Jam"
            value={form.tarif_per_jam}
            onChange={(e) =>
              setForm({ ...form, tarif_per_jam: e.target.value })
            }
            className="bg-zinc-800 text-white p-3 rounded"
          />

          <button type="submit" className="bg-red-600 text-white rounded">
            {editId ? "Update" : "Tambah"}
          </button>

        </div>
      </form>

      {/* TABLE */}
      <div className="bg-zinc-900 rounded-xl overflow-hidden">
        <table className="w-full text-white">
          <thead className="bg-zinc-800">
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>PS</th>
              <th>Tarif</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {ruangan.map((item) => (
              <tr key={item.id_ruangan} className="border-t border-zinc-800">

                <td className="p-3">{item.id_ruangan}</td>
                <td className="p-3">{item.nama_ruangan}</td>
                <td className="p-3">{item.jenis_ps}</td>

                <td className="p-3">
                  Rp {Number(item.tarif_per_jam || 0).toLocaleString()}
                </td>

                <td className="p-3">{item.status}</td>

                <td className="p-3 flex gap-2">

                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id_ruangan)}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Hapus
                  </button>

                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}