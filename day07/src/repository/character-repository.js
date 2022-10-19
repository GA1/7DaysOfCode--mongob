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

export const retrieveCharacter = async (db, characterNickName) => {
  const result = await db
    .collection(COLLECTION_NAMES.CHARACTERS)
    .findOne({ nickname: characterNickName }, { projection: { _id: 0 } })
  return result
}

export const retrieveAllCharacters = async (db) => {
  const result = await db
    .collection(COLLECTION_NAMES.CHARACTERS)
    .find({})
    .project({ _id: 0 })
    .toArray()

  return result
}

export const deleteQuiz = async (db, nickname) => {
  console.log(nickname)
  const result = await db
    .collection(COLLECTION_NAMES.CHARACTERS)
    .deleteMany({ nickname })
  return result.acknowledged && 1 < result.deletedCount
}
