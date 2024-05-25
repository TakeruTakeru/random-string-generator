// /**
//  * Read values from storage.
//  * @param {string[]} keys
//  * @param {function(ApplicationData): void} callback
//  */
// function get(keys, callback) {
//   chrome.storage.sync.get(keys, callback);
// }

/**
 * Read values from storage.
 * @param {string} key
 * @return {Promise<ApplicationData>} callback
 */
async function get(key) {
  const result = await chrome.storage.sync.get([key]);
  return result[key];
}

/**
 * Write value to storage.
 * @param {ApplicationData} value
 * @param {function(): void} onSave
 */
function set(value, onSave) {
  chrome.storage.sync.set(value, onSave);
}

export const ChromeStorage = {
  get,
  set,
};
