import { initializeDatabase } from './src/repository/db.js'
import express from 'express'
const app = express()
const port = 3000

initializeDatabase().then(_ => {})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`)
})
