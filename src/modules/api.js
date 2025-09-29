export async function getAllSurah() {
    try {
        const response = await fetch("https://equran.id/api/v2/surat");
        if (!response.ok) throw new Error("Gagal mengambil daftar surah");
        const data = await response.json();
        return data.data;
    } catch (err) {
        console.error("Error di getAllSurah:", err);
        throw err;
    }
}

export async function getSurahById(id) {
    try {
        const response = await fetch(`https://equran.id/api/v2/surat/${id}`);
        if (!response.ok) throw new Error("Gagal fetch detail surat");
        const result = await response.json();
        return result.data;
    } catch (err) {
        console.error("Error di getSurahById:", err);
        throw err;
    }
}
