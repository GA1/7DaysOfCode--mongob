import { COLLECTION_NAMES } from './db-constants.js'
import { ObjectId } from 'mongodb'

export const createCharacter = async (db, dbCharacter) => {
  const result = await db
    .collection(COLLECTION_NAMES.CHARACTERS)
    .insertOne({ ...dbCharacter })
  return {
    id: result.insertedId,
    isSuccess: result.acknowledged,
  }
}

export const retrieveCharacter = async (db, characterId) => {
  const result = await db
    .collection(COLLECTION_NAMES.CHARACTERS)
    .findOne({ _id: new ObjectId(characterId) })
  return result
}


