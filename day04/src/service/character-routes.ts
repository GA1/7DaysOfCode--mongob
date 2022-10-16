import { Router } from 'express'
import { db } from '../repository/db.js'
import { createCharacter, retrieveWorkspace } from '../repository/character-repository.js'

const characterRoutes: Router = Router()


characterRoutes.get('/:id', async (req, res) => {
    const result = await retrieveWorkspace(db, req.params.id)
    if (!result) {
      res.status(404).send({ message: 'The character could not be found' })
    } else {
      res.status(200).send(result)
    }
  },
)


characterRoutes.post('/:workspaceId/flows', async (req, res) => {
  const { realName, nickname, description } = req.body
  const { workspaceId } = req.params
  const character = {
    realName, nickname, description
  }
  const result = await createCharacter(db, workspaceId)
  if (!result.isSuccess) {
    res.status(500).send({ message: 'There was an error when creating a character'})
  } else {
    res.status(201).send({ message: 'The character has been created successfully', data: character})
  }
})
export default characterRoutes
