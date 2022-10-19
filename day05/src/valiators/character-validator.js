export const validateCharacterBody = (characterBody) => {
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
