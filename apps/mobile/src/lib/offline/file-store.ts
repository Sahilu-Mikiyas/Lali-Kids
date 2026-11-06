import { Directory, File, Paths } from 'expo-file-system';

import type { FileStore } from './downloads-core';

/** The real file system on the phone: the `stories` folder inside the app's private document folder. */
function storiesDir(): Directory {
  const dir = new Directory(Paths.document, 'stories');
  if (!dir.exists) dir.create({ intermediates: true, idempotent: true });
  return dir;
}

export const downloadsSupported = true;

export const fileStore: FileStore = {
  root() {
    const uri = storiesDir().uri;
    return uri.endsWith('/') ? uri : `${uri}/`;
  },
  makeDir(rel) {
    new Directory(storiesDir(), rel).create({ intermediates: true, idempotent: true });
  },
  async download(url, rel) {
    const file = await File.downloadFileAsync(url, new File(storiesDir(), rel), { idempotent: true });
    return file.size ?? 0;
  },
  async writeText(rel, text) {
    const file = new File(storiesDir(), rel);
    await file.write(text);
    return file.size ?? text.length;
  },
  async readText(rel) {
    return new File(storiesDir(), rel).text();
  },
  removeDir(rel) {
    try {
      const dir = new Directory(storiesDir(), rel);
      if (dir.exists) dir.delete();
    } catch {
      // Already gone.
    }
  },
  listDirs() {
    try {
      return storiesDir()
        .list()
        .filter((x): x is Directory => x instanceof Directory)
        .map((d) => d.name);
    } catch {
      return [];
    }
  },
};
