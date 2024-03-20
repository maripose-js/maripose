const EXTENSION_RE = /(?:\.([^.]+))?$/;

export function getExtension(path: string) {
  return path.match(EXTENSION_RE)?.[1];
}
