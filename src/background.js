chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addRandomString",
    title: "この要素にランダムな文字列を追加する",
    contexts: ["editable"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addRandomString") {
    chrome.storage.sync.get(["stringLength", "customCharacters"], (result) => {
      const length = result.stringLength || 12; // デフォルトの長さは12
      const characters =
        result.customCharacters ||
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: addRandomStringToInput,
        args: [length, characters],
      });
    });
  }
});

function addRandomStringToInput(length, characters) {
  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  const inputElement = document.activeElement;
  inputElement.value = randomString;
  const event = new Event("change", { bubbles: true });
  inputElement.dispatchEvent(event);
}
