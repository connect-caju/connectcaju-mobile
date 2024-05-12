export const capitalize = (name: any) => {
  let newName = String(name)

  let capitalized = newName?.split(" ").map((word) => {
    if (word?.length > 1) {
      return word.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase()
    }
    return word?.toUpperCase()
  })
  return capitalized.join(" ").trim()
}
