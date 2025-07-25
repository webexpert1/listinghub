/**
 * Generates a URL-friendly slug from a given string.
 *
 * @param name - The input string to convert into a slug.
 * @returns A slug string that is lowercase, trimmed, and contains only alphanumeric characters and hyphens.
 */
export function generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')       
      .replace(/\s+/g, '-')               
      .replace(/-+/g, '-');              
  }
  