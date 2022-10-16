import { COLLECTION_NAMES } from './db-constants.js'

export const createCharacter = async (db, dbCharacter) => {
  const result = await db
    .collection(COLLECTION_NAMES.CHARACTERS)
    .insertOne(dbCharacter)
  return {
    id: result.id,
    isSuccess: result.acknowledged,
  }
}

export const retrieveWorkspace = async (db, characterId) => {
  const result = await db
    .collection(COLLECTION_NAMES.CHARACTERS)
    .findOne({ id: characterId })
  return result
}


