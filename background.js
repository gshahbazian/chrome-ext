chrome.commands.onCommand.addListener(async (command, tab) => {
  if (!tab) return
  if (!tab.url) return

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: copyToClipboard,
    args: [tab.url],
  })
})

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
}
