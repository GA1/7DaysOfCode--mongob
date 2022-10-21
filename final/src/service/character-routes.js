import { Router } from 'express'
import { db } from '../repository/db.js'
import {
  createCharacter,
  deleteQuiz,
  retrieveAllCharacters,
  retrieveCharacter, updateCharacter,
} from '../repository/character-repository.js'
import { validatePostCharacterBody, validatePutCharacterBody } from '../valiators/character-validator.js'

const characterRoutes = Router()

characterRoutes.get('/:nickname', async (req, res) => {
    const result = await retrieveCharacter(db, req.params.nickname)
    if (!result) {
      res.status(404).send({ message: 'The character could not be found' })
    } else {
      res.status(200).send(result)
    }
  },
)

characterRoutes.post('/', async (req, res) => {
  const [isValid, validationErrorMessage] = validatePostCharacterBody(req.body)
  if (!isValid) {
    res.status(400).send({ message: validationErrorMessage })
  } else {
    const { realName, nickname, description } = req.body
    const character = {
      realName, nickname, description,
    }
    const result = await createCharacter(db, character)
    if (!result.isSuccess) {
      res.status(500).send({ message: 'There was an error when creating a character' })
    } else {
      res.status(201).send({
        message: 'The character has been created successfully',
        data: { ...character, _id: undefined },
      })
    }
  }
})

characterRoutes.get('/', async (req, res) => {
    const characters = await retrieveAllCharacters(db)
    res.status(200).send(characters)
  },
)

characterRoutes.delete('/:nickname', async (req, res) => {
  let nickname = req.params.nickname
  const result = await deleteQuiz(db, nickname)
    if (!result) {
      res.status(404).send({ message: `There are no characters with the nickname: ${nickname}` })
    } else {
      res.status(200).send({ message: `All characters with nickname: ${nickname} has been deleted` })
    }
  },
)

characterRoutes.put('/:nickname', async (req, res) => {
  const [isValid, validationErrorMessage] = validatePutCharacterBody(req.body)
  if (!isValid) {
    res.status(400).send({ message: validationErrorMessage })
  } else {
    let nickname = req.params.nickname
    const foundCharacter = await retrieveCharacter(db, nickname)
    const toUpdate = req.body
    if (!foundCharacter) {
      res.status(404).send({ message: `There are no characters with the nickname: ${nickname}` })
    } else {
      const wasSuccess = await updateCharacter(db, nickname, toUpdate)
      if (!wasSuccess) {
        res.status(500).send({ message: 'There was an error when updating a character' })
      } else {
        res.status(200).send({
          message: 'The character has been updated successfully',
          data: { ...foundCharacter, ...toUpdate},
        })
      }
    }
  }
})


export default characterRoutes
