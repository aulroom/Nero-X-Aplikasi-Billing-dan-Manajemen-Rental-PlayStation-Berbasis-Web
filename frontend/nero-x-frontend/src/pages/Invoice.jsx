import { useEffect, useState } from "react";
import api from "../services/api";

export default function Invoice() {
  const [peminjaman, setPeminjaman] = useState([]);

  const getData = async () => {
    try {
      const res = await api.get("/peminjaman");
      setPeminjaman(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // hitung jam
  const hitungJam = (mulai, selesai) => {
    if (!mulai || !selesai) return 0;

    const start = new Date(`2000-01-01 ${mulai}`);
    const end = new Date(`2000-01-01 ${selesai}`);

    const diff = (end - start) / (1000 * 60 * 60);
    return diff > 0 ? diff : 0;
  };

  // total harga (default 10k/jam kalau gak ada data harga)
  const hitungTotal = (jam, tarif = 10000) => {
    return jam * tarif;
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">
        Invoice Rental PlayStation
      </h1>

      <div className="grid gap-4">
        {peminjaman.map((item) => {
          const jam = hitungJam(item.jam_mulai, item.jam_selesai);
          const total = hitungTotal(jam);

          return (
            <div
              key={item.id_peminjaman}
              className="bg-zinc-900 p-4 rounded shadow"
            >
              <div className="flex justify-between mb-2">
                <h2 className="font-bold">
                  Invoice #{item.id_peminjaman}
                </h2>
                <span
                  className={
                    item.status === "selesai"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                >
                  {item.status}
                </span>
              </div>

              <p>Nama Penyewa: {item.nama_penyewa}</p>
              <p>Ruangan ID: {item.id_ruangan}</p>
              <p>Jam: {item.jam_mulai} - {item.jam_selesai}</p>
              <p>Total Jam: {jam} jam</p>

              <hr className="my-2 border-gray-700" />

              <p className="text-lg font-bold">
                Total Bayar: Rp {total.toLocaleString()}
              </p>

              <button
                onClick={() => window.print()}
                className="mt-3 bg-red-600 px-3 py-1 rounded"
              >
                Cetak Invoice
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}