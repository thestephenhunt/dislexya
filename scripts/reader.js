export function modText(paragraph) {
    console.log('MOD')
    const text = paragraph.innerHTML;
    const words = []
    const convertedWords = []
    let inTag = false;
    let word = ''
    for (let c of text) {
        switch (c) {
            case '<':
                inTag = !inTag
                word += c
                break
            case '>':
                inTag = !inTag
                word += c
                // words.push(word)
                word = ''
                break
            case ' ':
                if (!inTag) {
                    words.push(word)
                    word = ''
                    break
                }
                word += c
                break
            default:
                word += c
                break
        }
    }
    words.forEach((word) => {
        const front = word.substring(0, 1)
        const end = word.substring(1, word.length)
        word = '<b>' + front + '</b>' + end
        convertedWords.push(word)
    })
    paragraph.innerHTML = convertedWords.join(' ')
    console.log('JOINED')
}

export default modText