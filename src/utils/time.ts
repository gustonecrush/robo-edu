export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  // Pad single digit seconds with a leading zero
  const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`

  return `${mins}:${formattedSecs}`
}
