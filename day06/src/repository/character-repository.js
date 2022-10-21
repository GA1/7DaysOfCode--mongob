import { COLLECTION_NAMES } from './db-constants.js'

export const createCharacter = async (db, dbCharacter) => {
  const result = await db
    .collection(COLLECTION_NAMES.CHARACTERS)
    .insertOne({ ...dbCharacter })
  return {
    id: result.insertedId,
    isSuccess: result.acknowledged,
  }
}

export const retrieveCharacter = async (db, characterNickName) => {
  const result = await db
    .collection(COLLECTION_NAMES.CHARACTERS)
    .findOne({ nickname: characterNickName }, { projection: { _id: 0 } })
  return result
}


