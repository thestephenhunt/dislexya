import { modText } from './reader.js'

const toggle = document.querySelector('#toggleButton')
const paragraph = document.querySelectorAll("p, dd");

toggle.addEventListener('click', (e) => {
    let checked = toggle.getAttribute('aria-checked') === 'true'
    console.log(checked)
    if (checked) {
        paragraph.forEach((para) => modText(para))
        console.log(checked)
     }
    toggle.setAttribute('aria-checked', String(!checked))
})