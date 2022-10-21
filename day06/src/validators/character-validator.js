export const validateCharacterBody = (characterBody) => {
  if (typeof characterBody !== 'object' || characterBody === null || !characterBody) {
    return [false, 'O body deve ser um json.']
  }
  if (3 < Object.keys(characterBody).length) {
    return [false, 'O body fornecido possui mais de 3 propriedades, devendo ter apenas: realName, nickname, description.']
  }
  if (!characterBody.realName) {
    return [false, 'Falta o realname no body fornecido.']
  }
  if (!characterBody.nickname) {
    return [false, 'Falta o nickname no body fornecido.']
  }
  if (!characterBody.description) {
    return [false, 'Falta o description no body fornecido.']
  }
  if (typeof characterBody.realName !== 'string') {
    return [false, 'realName deve ser uma string.']
  }
  if (typeof characterBody.nickname !== 'string') {
    return [false, 'nickname deve ser uma string.']
  }
  if (typeof characterBody.description !== 'string') {
    return [false, 'description deve ser uma string.']
  }
  return [true, null]
}
