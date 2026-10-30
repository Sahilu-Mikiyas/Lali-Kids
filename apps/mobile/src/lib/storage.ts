import Storage from 'expo-sqlite/kv-store';

export function readItem(key: string): string | null {
  try {
    return Storage.getItemSync(key);
  } catch {
    return null;
  }
}

export function writeItem(key: string, value: string): void {
  try {
    Storage.setItemSync(key, value);
  } catch {
    // Progress is a convenience; the app keeps working without it.
  }
}
