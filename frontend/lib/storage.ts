interface StorageItem {
  key: string;
  value: string;
}

export function saveSingleItemToStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function saveMultipleItemsToStorage(items: StorageItem[]) {
  items.map((item: StorageItem) => {
    localStorage.setItem(item.key, item.value);
  });
}

export function getFromStorage(key: string) {
  const result = localStorage.getItem(key);
  return result;
}

export async function deleteFromStorage(key: string) {
  localStorage.removeItem(key);
}
