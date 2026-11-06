import type { FileStore } from './downloads-core';

/** Downloads are for phones only; the web build has no private folder to keep stories in. */
export const downloadsSupported = false;

const unsupported = () => {
  throw new Error('Downloads are only available in the phone app');
};

export const fileStore: FileStore = {
  root: () => '',
  makeDir: unsupported,
  download: async () => unsupported(),
  writeText: async () => unsupported(),
  readText: async () => unsupported(),
  removeDir: () => undefined,
  listDirs: () => [],
};
