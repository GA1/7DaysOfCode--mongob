import { Router } from 'express'
import { db } from '../repository/db.js'
import { createCharacter, retrieveCharacter } from '../repository/character-repository.js'

const characterRoutes = Router()


characterRoutes.get('/:id', async (req, res) => {
    const result = await retrieveCharacter(db, req.params.id)
    result.id = result._id
    result._id = undefined
    if (!result) {
      res.status(404).send({ message: 'The character could not be found' })
    } else {
      res.status(200).send(result)
    }
  },
)


characterRoutes.post('/', async (req, res) => {
  const { realName, nickname, description } = req.body
  const character = {
    realName, nickname, description
  }
  const result = await createCharacter(db, character)
  console.log(result)
  if (!result.isSuccess) {
    res.status(500).send({ message: 'There was an error when creating a character'})
  } else {
    res.status(201).send({ message: 'The character has been created successfully', data:  {...character, _id: undefined, id: result.id}})
  }
})

export default characterRoutes
