import { Router } from 'express'
import { db } from '../repository/db.js'
import {
  createCharacter,
  deleteQuiz,
  retrieveAllCharacters,
  retrieveCharacter,
} from '../repository/character-repository.js'
import { validateCharacterBody } from '../validators/character-validator.js'

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
  const [isValid, validationErrorMessage] = validateCharacterBody(req.body)
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
      res.status(404).send({ message: `Não tem personagens com o apelido: ` })
    } else {
      res.status(200).send({ message: `Todos os personagens com apelido: ${nickname} foram deletados` })
    }
  },
)


export default characterRoutes
