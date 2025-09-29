export function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}

export function decodeHtml(html) {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
}

export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function getRandomItem(array) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
}
