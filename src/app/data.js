import { ChromeStorage } from "../core/storage";

/**
 * @returns {Promise<ApplicationData>}
 */
export async function loadUserCustomization() {
  const userCustomization = await ChromeStorage.get("userCustomization");

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
  customCharacters:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
};
