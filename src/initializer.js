import {
  getCustomCharactersInputElement,
  getFeedbackElement,
  getFormElement,
  getStringLengthInputElement,
} from "./app/selector";
import { loadUserCustomization } from "./app/data";
import { onDomContentLoaded } from "./core/event";
import { ChromeStorage } from "./core/storage";
import "./styles.css";

onDomContentLoaded(async () => {
  const lengthInput = getStringLengthInputElement();
  const charactersInput = getCustomCharactersInputElement();

  const userCustomization = await loadUserCustomization();

  if (userCustomization.stringLength) {
    lengthInput.value = userCustomization.stringLength;
  }
  if (userCustomization.customCharacters) {
    charactersInput.value = userCustomization.customCharacters;
  }

  const form = getFormElement();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const stringLength = parseInt(lengthInput.value, 10);
    const customCharacters = charactersInput.value;
    const userCustomization = { stringLength, customCharacters };

    ChromeStorage.set({ userCustomization }, () => {
      const feedback = getFeedbackElement();
      feedback.classList.add("visible");
      setTimeout(() => {
        feedback.classList.remove("visible");
      }, 2000);
    });
  });
});
