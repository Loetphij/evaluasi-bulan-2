import * as api from "./modules/api.js";
import { renderSurahDetail } from "./modules/ui.js";
import { saveLastRead } from "./modules/storage.js";

document.addEventListener("DOMContentLoaded", init);

async function init() {
  const titleEl = document.getElementById("surah-title");
  const infoEl  = document.getElementById("surah-info");
  const ayatEl  = document.getElementById("ayat-list");

  if (!titleEl || !infoEl || !ayatEl) {
    console.error("Elemen DOM hilang: pastikan #surah-title, #surah-info, #ayat-list ada di detail.html");
    document.body.innerHTML = "<p>Halaman tidak lengkap. Periksa struktur HTML.</p>";
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("nomor");
  if (!id) {
    titleEl.textContent = "ID surat tidak ditemukan di URL.";
    return;
  }

  const fetchFn = api.getSurahById || api.getSurahDetail || api.getSurah;
  if (!fetchFn) {
    console.error("Fungsi API tidak ditemukan. Export getSurahById atau getSurahDetail dari src/modules/api.js");
    titleEl.textContent = "Internal error: fungsi API tidak ditemukan.";
    return;
  }

  try {
    titleEl.textContent = "Memuat...";
    const raw = await fetchFn(id);
    if (!raw) throw new Error("Response API kosong");

    const surah = normalizeSurah(raw);
    renderSurahDetail(surah);

    try {
      saveLastRead({ id: surah.nomor || id, name: surah.namaLatin || surah.nama || surah.name });
    } catch (e) {
      console.warn("Gagal menyimpan last read:", e);
    }
  } catch (err) {
    console.error("Gagal memuat detail surat:", err);
    titleEl.textContent = "Gagal memuat detail surat. Cek console (F12).";
    infoEl.innerHTML = `<p class="error">Terjadi kesalahan: ${err.message}</p>`;
  }
}

function normalizeSurah(s) {
  if (!s) return s;

  if (s.nomor) return s;

  if (s.number) {
    return {
      nomor: s.number,
      nama: s.name?.long || s.name,
      namaLatin: s.name?.transliteration?.id || s.name?.transliteration?.en,
      jumlahAyat: s.numberOfVerses || (s.verses && s.verses.length),
      tempatTurun: s.revelation?.id || s.revelation,
      arti: s.translation?.id || s.translation,
      ayat: (s.verses || []).map(v => ({
        nomorAyat: v.number?.inSurah || v.number,
        teksArab: v.text?.arab || v.text,
        teksIndonesia: v.translation?.id || v.translation || v.text
      }))
    };
  }

  return s;
}
