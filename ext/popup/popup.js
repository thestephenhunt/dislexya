const toggle = document.getElementById('toggle-button')

const currentTab = async function getCurrentTab() {
    let queryOptions = {active: true, lastFocusedWindow: true}
    let [tab] = await chrome.tabs.query(queryOptions)
    return tab
}
toggle.addEventListener('click', async (currentTab) => {
    chrome.scripting.executeScript({
        target: {tabId: currentTab},
        files: ['./scripts/reader.js']
    })
})
