chrome.commands.onCommand.addListener(async (command, tab) => {
  if (!tab) return
  if (tab.url.startsWith('chrome://')) return

  switch (command) {
    case 'copy_tab_url':
      copyCommand(tab)
      break
    case 'open_pip':
      pipCommand(tab)
      break
  }
})

function copyCommand(tab) {
  if (!tab.url) return

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: copyToClipboard,
    args: [tab.url],
  })
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
}

function pipCommand(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    world: "MAIN",
    files: ["pip.js"],
  })
}
