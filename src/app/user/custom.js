import { ChromeStorage } from "../../core/storage";

/**
 * @returns {Promise<ApplicationData>}
 */
export async function loadUserCustomization() {
  const userCustomization = await ChromeStorage.get("userCustomization");
  chrome.storage.sync.get(["userCustomization"], (result) => {
    console.log(result.stringLength);
  });

  if (userCustomization == undefined) {
    return defaultUserCustomization;
  }

  return userCustomization;
}

/**
 * @type {UserCustomization}
 */
export const defaultUserCustomization = {
  stringLength: 12,
  customCharacters: "ABC",
};

/**
 * @param {UserCustomization} userCustomization
 * @returns {string}
 */
export function feedbackCustom(userCustomization) {
  return `length:${userCustomization.stringLength}, characters:${userCustomization.customCharacters}`;
}
