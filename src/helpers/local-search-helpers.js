const capitalizeWords = str => {
  if (!str) return null
  const words = str.split(" ")

  return words
    .map(word => {
      return (word = word[0].toUpperCase() + word.substring(1))
    })
    .join(" ")
}

const getNumberRanges = (min, max, unit) => {
  if (min === max && min) return `${min} ${unit}`
  else if (min && max) return `${min} - ${max} ${unit}`
}

// const semiColonsToArray = str => {
//   if (str) return str
//   str.split(";")
// }

const arrayToSemiColonStr = array => {
  if (array) return array.join(";")
}

module.exports = {
  capitalizeWords,
  getNumberRanges,
//   semiColonsToArray,
  arrayToSemiColonStr,
}
