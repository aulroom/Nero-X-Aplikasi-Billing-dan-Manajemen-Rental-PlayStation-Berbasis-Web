import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

export default function Barang() {
  const [barang, setBarang] = useState([]);

  const [form, setForm] = useState({
    nama_barang: "",
    kategori: "",
    stok: "",
    harga: "",
    kondisi: "Baik",
  });

  const getBarang = async () => {
    try {
      const res = await api.get("/barang");
      setBarang(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBarang();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/barang", form);

      setForm({
        nama_barang: "",
        kategori: "",
        stok: "",
        harga: "",
        kondisi: "Baik",
      });

      getBarang();
    } catch (err) {
      console.error(err);
      alert("Gagal menambah barang");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus barang ini?")) return;

    try {
      await api.delete(`/barang/${id}`);
      getBarang();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-red-500 mb-6">
        Manajemen Barang
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-xl mb-6"
      >
        <div className="grid md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Nama Barang"
            value={form.nama_barang}
            onChange={(e) =>
              setForm({ ...form, nama_barang: e.target.value })
            }
            className="bg-zinc-800 text-white p-3 rounded"
          />

          <input
            type="text"
            placeholder="Kategori"
            value={form.kategori}
            onChange={(e) =>
              setForm({ ...form, kategori: e.target.value })
            }
            className="bg-zinc-800 text-white p-3 rounded"
          />

          <input
            type="number"
            placeholder="Stok"
            value={form.stok}
            onChange={(e) =>
              setForm({ ...form, stok: e.target.value })
            }
            className="bg-zinc-800 text-white p-3 rounded"
          />

          <input
            type="number"
            placeholder="Harga"
            value={form.harga}
            onChange={(e) =>
              setForm({ ...form, harga: e.target.value })
            }
            className="bg-zinc-800 text-white p-3 rounded"
          />

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Tambah
          </button>
        </div>
      </form>

      <div className="bg-zinc-900 rounded-xl overflow-hidden">
        <table className="w-full text-white">
          <thead className="bg-zinc-800">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Nama Barang</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Stok</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Kondisi</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {barang.map((item) => (
              <tr
                key={item.id_barang}
                className="border-t border-zinc-800"
              >
                <td className="p-3">{item.id_barang}</td>
                <td className="p-3">{item.nama_barang}</td>
                <td className="p-3">{item.kategori}</td>
                <td className="p-3">{item.stok}</td>
                <td className="p-3">
                  Rp {item.harga.toLocaleString()}
                </td>
                <td className="p-3">{item.kondisi}</td>

                <td className="p-3">
                  <button
                    onClick={() => handleDelete(item.id_barang)}
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