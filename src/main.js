import { getAllSurah } from "./modules/api.js";
import { renderSurahList } from "./modules/ui.js";
import { getLastRead } from "./modules/storage.js";

let allSurah = []

async function init() {
    try {
        const data = await getAllSurah();
        allSurah = data
        renderSurahList(allSurah);

        const lastRead = getLastRead();
        if (lastRead) {
        const container = document.getElementById("last-read");
        const info = document.createElement("div");
        info.className = "last-read";
        info.innerHTML = `
            <p>Terakhir dibaca: 
            <a href="detail.html?id=${lastRead.id}">
                ${lastRead.name}
            </a>
            </p>
        `;
        container.prepend(info);
        }
        const searchInput = document.getElementById("search-input");
        searchInput.addEventListener("input", e => {
            const keyword = e.target.value.toLowerCase();
            const filtered = allSurah.filter(surah =>
                surah.namaLatin.toLowerCase().includes(keyword) ||
                surah.arti.toLowerCase().includes(keyword) ||
                String(surah.nomor).includes(keyword)
            );
            renderSurahList(filtered);
        });
    } catch (error) {
        document.getElementById("surah-list").innerHTML = "<p>Terjadi kesalahan saat memuat data. Coba lagi nanti.</p>";
    }
}

init();
