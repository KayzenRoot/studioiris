function publicUrl(value: string | undefined): string | undefined {
  const candidate = value?.trim();
  return candidate && /^https?:\/\//i.test(candidate) ? candidate.replace(/\/+$/, "") : undefined;
}

/** Public links stay hidden until IrisStudio has its own verified release URLs. */
export const SOURCE_REPOSITORY_URL = publicUrl(import.meta.env.VITE_SOURCE_REPOSITORY_URL);
export const SOURCE_DOWNLOAD_URL = publicUrl(import.meta.env.VITE_SOURCE_DOWNLOAD_URL);
