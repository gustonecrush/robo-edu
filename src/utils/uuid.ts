export function extractUUID(path: string): string | null {
  // Define the regular expression to match the UUID
  const uuidRegex = /\/courses\/([0-9a-fA-F-]{36})/

  // Apply the regular expression on the input path
  const match = path.match(uuidRegex)

  // If a match is found, return the captured group, otherwise return null
  if (match && match[1]) {
    return match[1]
  } else {
    return null
  }
}
