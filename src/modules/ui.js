// Render daftar surat
export function renderSurahList(surahList) {
  const container = document.getElementById("surah-list");
  container.innerHTML = "";

  if (surahList.length === 0) {
    container.innerHTML = "<p>Tidak ada surat yang cocok.</p>";
    return;
  }

  surahList.forEach(surah => {
    const item = document.createElement("a");
    item.className = "surah-item";
    item.href = `detail.html?nomor=${surah.nomor}`;
    item.innerHTML = `
      <div class="surah-left">
        <h3>${surah.nomor}. ${surah.namaLatin}</h3>
        <p>${surah.arti} - ${surah.jumlahAyat} ayat</p>
      </div>
      <div class="surah-right">
        <span class="surah-arab">${surah.nama}</span>
      </div>
    `;
    container.appendChild(item);
  });
}

// Render detail surat
export function renderSurahDetail(surah) {
  const title = document.getElementById("surah-title");
  const info = document.getElementById("surah-info");
  const ayatList = document.getElementById("ayat-list");

  title.textContent = `${surah.nomor}. ${surah.namaLatin}`;
  info.innerHTML = `
    <p>${surah.nama} (${surah.arti})</p>
    <p>Jumlah ayat: ${surah.jumlahAyat}</p>
    <p>Diturunkan di: ${surah.tempatTurun}</p>
  `;

  ayatList.innerHTML = "";
  surah.ayat.forEach(ayat => {
    const item = document.createElement("div");
    item.className = "ayat-item";
    item.innerHTML = `
      <p class="ayat-arab"><strong>${ayat.nomorAyat}</strong> ${ayat.teksArab}</p>
      <p class="ayat-terjemah">${ayat.teksIndonesia}</p>
    `;
    ayatList.appendChild(item);
  });
}
