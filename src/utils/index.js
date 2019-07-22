/**
 * returns a path for a certain position of ids iteration
 * @param {Array} ids
 * @param {Number} actualIndex
 */
function buildCategoriesPath (ids, actualIndex) {
  let path = '/categories/'
  const final = actualIndex + 1
  for (let i = 0; i < final; i++) {
    path += ids[i] + '/'
  }

  path = path.substr(0, path.length - 1)

  return path
}

function isNumber (evt) {
  // Validate if is a no number character
  evt = evt || window.event
  const charCode = evt.which ? evt.which : evt.keyCode
  if (
    charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
  ) {
    evt.preventDefault()
  } else {
    return true
  }
}

export {
  buildCategoriesPath,
  isNumber
}
