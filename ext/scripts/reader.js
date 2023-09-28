function convertText(para, index) {
    const text = para;
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
                words.push(word)
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
        if (front != '<') {
            word = '<b>' + front + '</b>' + end
        }
        convertedWords.push(word)
    })

    return convertedWords.join(' ')
}

function restoreText(para, text) {
    para.forEach((p, index) => {
        p.innerHTML = text[index].original
    })
}

function modText(para, text) {
    para.forEach((p, index) => {
        p.innerHTML = text[index].converted
    })
}

function initializeText(para) {
    const allText = []
    para.forEach((para, index) => {
        allText[index] = {"original": para.innerHTML, "converted": ''}
    })
    return allText
}

if(!localStorage.getItem('dislexyaEnabled') || localStorage.getItem('dislexyaEnabled') == 'false') {
    localStorage.setItem('dislexyaEnabled', 'true')
    const paragraph = document.querySelectorAll("p, dd")
    const text = initializeText(paragraph)
    localStorage.setItem('dislexyaText', JSON.stringify(text))
    const storedText = JSON.parse(localStorage.getItem('dislexyaText'))
    storedText.forEach((para, index) => {
        para.converted = convertText(para.original, index)
    })
    localStorage.setItem('dislexyaText', JSON.stringify(storedText))
    modText(paragraph, storedText)
} else if (localStorage.getItem('dislexyaEnabled') == 'true') {
    const paragraph = document.querySelectorAll("p, dd")
    restoreText(paragraph, JSON.parse(localStorage.getItem('dislexyaText')))
    localStorage.setItem('dislexyaEnabled', 'false')
}