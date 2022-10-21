import { Router } from 'express'
import { db } from '../repository/db.js'
import { createCharacter, retrieveCharacter } from '../repository/character-repository.js'
import { validateCharacterBody } from '../validators/character-validator.js'

const characterRoutes = Router()

characterRoutes.get('/:id', async (req, res) => {
    const result = await retrieveCharacter(db, req.params.id)
    result.id = result._id
    result._id = undefined
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
        data: { ...character, _id: undefined, id: result.id },
      })
    }
  }
})

export default characterRoutes
