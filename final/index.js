import { initializeDatabase } from './src/repository/db.js'
import express from 'express'
import characterRoutes from './src/service/character-routes.js'
const app = express()

app.use(express.json())

const port = 3000

initializeDatabase().then(_ => {})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`)
})

app.use('/characters', characterRoutes)
