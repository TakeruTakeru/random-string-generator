import { dispatchEvents } from "../core/event";
import { loadUserCustomization } from "./data";

export const createContextMenu = () => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "addRandomString",
      title: "この要素にランダムな文字列を追加する",
      contexts: ["editable"],
    });
  });

  chrome.contextMenus.onClicked.addListener(addContextMenuListener);

  async function addContextMenuListener(info, tab) {
    if (info.menuItemId === "addRandomString") {
      const { stringLength, customCharacters } = await loadUserCustomization();
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: addRandomStringToInput,
        args: [stringLength, customCharacters],
      });
    }
  }
};

function addRandomStringToInput(length, characters) {
  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  const inputElement = document.activeElement;
  inputElement.value = randomString;
  dispatchEvents(inputElement, "input", "change");
}
