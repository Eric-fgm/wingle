export function generateId() {
  // Modeled after base64 web-safe chars, but ordered by ASCII.
  const PUSH_CHARS =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  // We generate 72-bits of randomness which get turned into 12 characters and
  // appended to the timestamp to prevent collisions with other clients. We
  // store the last characters we generated because in the event of a collision,
  // we'll use those same characters except "incremented" by one.
  const lastRandChars: number[] = []
  const timeStampChars = new Array(8)
  let now = Date.now()
  let i
  for (i = 7; i >= 0; i -= 1) {
    timeStampChars[i] = PUSH_CHARS.charAt(now % 64)
    // NOTE: Can't use << here because javascript will convert to int and lose
    // the upper bits.
    now = Math.floor(now / 64)
  }
  let id = timeStampChars.join("")
  for (i = 0; i < 12; i += 1) {
    lastRandChars[i] = Math.floor(Math.random() * 64)
  }
  for (i = 0; i < 12; i += 1) {
    id += PUSH_CHARS.charAt(lastRandChars[i]!)
  }
  return id
}
