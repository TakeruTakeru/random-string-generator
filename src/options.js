document.addEventListener("DOMContentLoaded", () => {
  const lengthInput = document.getElementById("stringLength");
  const charactersInput = document.getElementById("customCharacters");
  const saveButton = document.getElementById("save");

  chrome.storage.sync.get(["stringLength", "customCharacters"], (result) => {
    if (result.stringLength) {
      lengthInput.value = result.stringLength;
    }
    if (result.customCharacters) {
      charactersInput.value = result.customCharacters;
    }
  });

  saveButton.addEventListener("click", () => {
    const stringLength = parseInt(lengthInput.value, 10);
    const customCharacters = charactersInput.value;
    chrome.storage.sync.set({ stringLength, customCharacters }, () => {
      alert("Options saved");
    });
  });
});
