//@ts-ignore

import { feedbackCustom, loadUserCustomization } from "./app/user/custom";
import { onDomContentLoaded } from "./core/event";
import { ChromeStorage } from "./core/storage";

onDomContentLoaded(async () => {
  const lengthInput = document.getElementById("stringLength");
  const charactersInput = document.getElementById("customCharacters");
  const saveButton = document.getElementById("save");

  const userCustomization = await loadUserCustomization();

  if (userCustomization.stringLength) {
    lengthInput.value = userCustomization.stringLength;
  }
  if (userCustomization.customCharacters) {
    charactersInput.value = userCustomization.customCharacters;
  }

  // 保存ボタンのクリックイベント
  saveButton.addEventListener("click", () => {
    const stringLength = parseInt(lengthInput.value, 10);
    const customCharacters = charactersInput.value;
    const userCustomization = { stringLength, customCharacters };

    ChromeStorage.set({ userCustomization }, () => {
      alert("Options saved!\n" + feedbackCustom(userCustomization));
    });
  });
});
