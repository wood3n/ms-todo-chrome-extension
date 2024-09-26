export enum StorageKey {
  Option = "extension_options",
}

export async function storageSet(data: Record<StorageKey, unknown>, cb?: VoidFunction) {
  return chrome.storage.local.set(data, cb);
}

export async function storageGet(key: StorageKey) {
  return chrome.storage.local.get(key);
}
