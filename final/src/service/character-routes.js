import { Router } from 'express'
import { db } from '../repository/db.js'
import {
  createCharacter,
  deleteQuiz,
  retrieveAllCharacters,
  retrieveCharacter, updateCharacter,
} from '../repository/character-repository.js'
import { validatePostCharacterBody, validatePutCharacterBody } from '../validators/character-validator.js'

const characterRoutes = Router()

characterRoutes.get('/:nickname', async (req, res) => {
    const result = await retrieveCharacter(db, req.params.nickname)
    if (!result) {
      res.status(404).send({ message: 'O personagem não foi encontrado' })
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
      res.status(500).send({ message: 'Ocorreu um erro ao criar um personagem' })
    } else {
      res.status(201).send({
        message: 'O personagem foi criado com sucesso',
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
      res.status(404).send({ message: `Não tem personagens com o apelido: ${nickname}` })
    } else {
      res.status(200).send({ message: `Todos os personagens com apelido: ${nickname} foram deletados` })
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
      res.status(404).send({ message: `Não tem personagens com o apelido: ${nickname}` })
    } else {
      const wasSuccess = await updateCharacter(db, nickname, toUpdate)
      if (!wasSuccess) {
        res.status(500).send({ message: 'Ocorreu um erro ao atualizar um personagem' })
      } else {
        res.status(200).send({
          message: 'O personagem foi atualizado com sucesso',
          data: { ...foundCharacter, ...toUpdate},
        })
      }
    }
  }
})


export default characterRoutes
