export function vibrate(duration = 30): void {
  if (typeof navigator === "undefined" || !("vibrate" in navigator)) {
    return
  }

  navigator.vibrate(duration)
}