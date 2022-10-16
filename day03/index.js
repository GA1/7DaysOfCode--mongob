import { initializeToDatabase } from './src/repository/db.js'
import express from 'express'
const app = express()
const port = 3000

initializeToDatabase().then(_ => {})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`)
})
