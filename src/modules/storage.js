const LAST_READ_KEY = "lastReadSurah";

export function saveLastRead(surah) {
    localStorage.setItem(LAST_READ_KEY, JSON.stringify(surah));
}

export function getLastRead() {
    const data = localStorage.getItem(LAST_READ_KEY);
    return data ? JSON.parse(data) : null;
}
