export enum StorageKey {
	Option = "extension_options",
}

export const storageSet = async (
	data: Record<StorageKey, unknown>,
	cb?: VoidFunction,
) => {
	return chrome.storage.local.set(data, cb);
};

export const storageGet = async (key: StorageKey) => {
	return chrome.storage.local.get(key);
};
