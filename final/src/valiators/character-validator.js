export const validatePostCharacterBody = (characterBody) => {
  if (typeof characterBody !== 'object' || characterBody === null || !characterBody) {
    return [false, 'Body should be a json.']
  }
  if (3 < Object.keys(characterBody).length) {
    return [false, 'The provided body has more than 3 properties, it should have only: realName, nickname, description.']
  }
  if (!characterBody.realName) {
    return [false, 'The provided body is missing realName.']
  }
  if (!characterBody.nickname) {
    return [false, 'The provided body is missing nickname.']
  }
  if (!characterBody.description) {
    return [false, 'The provided body is missing description.']
  }
  if (typeof characterBody.realName !== 'string') {
    return [false, 'realName should be a string.']
  }
  if (typeof characterBody.nickname !== 'string') {
    return [false, 'nickname should be a string.']
  }
  if (typeof characterBody.description !== 'string') {
    return [false, 'description should be a string.']
  }
  return [true, null]
}

export const validatePutCharacterBody = (characterBody) => {
  if (typeof characterBody !== 'object' || characterBody === null || !characterBody) {
    return [false, 'Body should be a json.']
  }
  const keys = Object.keys(characterBody)
  const ALLOWED_PROPERTIES = ['realName', 'nickname', 'description']
  let counter = 0
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (ALLOWED_PROPERTIES.indexOf(key) === -1) {
      return [false, `"${key}" is not a correct character property.`]
    } else {
      if (typeof characterBody[key] !== 'string') {
        return [false, `"${key}" should be a string.`]
      }
      counter++
    }
  }
  if (counter === 0) {
    return [false, 'You have to update at least one property of the character.']
  }
  return [true, null]
}
