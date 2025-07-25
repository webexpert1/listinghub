export function generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')       // remove non-alphanumeric except spaces and dashes
      .replace(/\s+/g, '-')               // replace spaces with hyphens
      .replace(/-+/g, '-');               // collapse multiple hyphens
  }
  